#!/usr/bin/env python3
"""
Master Experimental Execution Script
MSc Machine Learning Coursework - STW7072CEM
Student: Bishow Gurung (College ID: 260005 | Coventry University ID: 17624457)
Topic: Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall
       at the Kathmandu Airport Grid Cell (1995-2024)
"""

import os
import sys
import json
import time
import platform
import warnings
import numpy as np
import pandas as pd
import scipy
from scipy.stats import binomtest
import sklearn

warnings.filterwarnings("ignore")

from data_processing import (
    audit_raw_dataset,
    load_and_preprocess_data,
    split_and_construct_target,
    FEATURE_COLS_TASK_A,
    FEATURE_COLS_TASK_B,
)
from train_and_evaluate import (
    perform_unsupervised_analysis,
    run_hyperparameter_tuning,
    select_oof_threshold_cv,
    calculate_metrics,
    bootstrap_confidence_intervals,
    run_mcnemar_tests,
)
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance


class _Tee:
    def __init__(self, *files):
        self.files = files
    def write(self, obj):
        for f in self.files:
            f.write(obj)
            f.flush()
    def flush(self):
        for f in self.files:
            f.flush()



def main():
    t_start = time.perf_counter()
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    results_dir = os.path.join(base_dir, "results")
    os.makedirs(results_dir, exist_ok=True)
    log_path = os.path.join(results_dir, "execution_log.txt")
    log_file = open(log_path, "w", encoding="utf-8")
    orig_stdout = sys.stdout
    sys.stdout = _Tee(orig_stdout, log_file)

    print("=" * 88)
    print("PHASE 1: Raw Dataset Provenance Audit, Preprocessing & Chronological Train-Test Split")
    print("=" * 88)
    raw_audit = audit_raw_dataset()
    df_clean = load_and_preprocess_data()
    X_train, y_train, X_test, y_test, dates_train, dates_test, split_info = split_and_construct_target(
        df_clean, train_end_year=2018, percentile=95, wet_day_only=False
    )

    print(f"Raw NASA POWER MERRA-2 (1995-2024): N = {raw_audit['raw_total_days']:,} raw days -> N = {len(df_clean):,} post-lag days")
    print(f"Data Integrity Audit  : NaN = {raw_audit['nan_values_total']}, Fill(-999) = {raw_audit['fill_value_minus999_total']}, "
          f"Duplicate Dates = {raw_audit['duplicate_date_count']}, Missing Dates = {raw_audit['missing_calendar_days']}")
    print(f"Training Set (1995-2018): N = {split_info['train_samples']:,} days | "
          f"P95 = {split_info['threshold_mm_exact']:.2f} mm/day ({split_info['train_positives']} extremes, {split_info['train_prevalence']*100:.2f}%) | "
          f"Wet-Day R95p = {split_info['wet_day_r95p_threshold_mm_exact']:.4f} mm/day ({split_info['train_wet95_positives']} extremes, {split_info['train_wet95_prevalence_all_days']*100:.2f}%)")
    print(f"Testing Set  (2019-2024): N = {split_info['test_samples']:,} days | "
          f"P95 Extremes = {split_info['test_positives']} ({split_info['test_prevalence']*100:.2f}%) | "
          f"Wet-Day R95p Extremes = {split_info['test_wet95_positives']} ({split_info['test_wet95_prevalence_all_days']*100:.2f}%)")

    with open(os.path.join(results_dir, "dataset_split_info.json"), "w", encoding="utf-8") as f:
        json.dump(split_info, f, indent=2)

    print("\n" + "=" * 88)
    print("PHASE 2: Unsupervised Weather Regime Clustering (K-Means k=3), PCA & FastICA")
    print("=" * 88)
    unsup_res, km_model, pca_model, ica_model, scaler = perform_unsupervised_analysis(
        X_train, y_train, split_info["feature_names"]
    )
    X_train_scaled = scaler.transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    P_tr = pca_model.transform(X_train_scaled)
    S_tr = ica_model.transform(X_train_scaled)

    regime_names = {
        0: "Dry Winter / Post-Monsoon",
        1: "Pre-Monsoon Transitional",
        2: "Active Saturated Monsoon",
    }
    for prof in unsup_res["cluster_profiles"]:
        cid = prof["cluster"]
        print(f"Cluster {cid} ({regime_names[cid]:<26}): {prof['total_days']:,} days ({prof['total_days']/len(y_train)*100:.2f}%) | "
              f"Extremes = {prof['extreme_events']:3d} ({prof['extreme_rate']*100:.2f}% rate, {prof['share_of_extremes']*100:.2f}% share)")
    print(f"K-Means k=3 Diagnostics: Silhouette (full N=8,759) = {unsup_res['silhouette_scores'][1]:.4f} "
          f"(subsample=5,000: {unsup_res['silhouette_scores_subsample5000'][1]:.4f}) | "
          f"Davies-Bouldin = {unsup_res['davies_bouldin_scores'][1]:.4f} | Inertia = {unsup_res['inertias'][1]:,.2f}")
    print(f"PCA Variance Explained : PC1 = {unsup_res['pca_var_explained'][0]*100:.2f}%, "
          f"PC2 = {unsup_res['pca_var_explained'][1]*100:.2f}% (2D = {unsup_res['pca_cum_var_explained'][1]*100:.2f}%), "
          f"PC3 = {unsup_res['pca_var_explained'][2]*100:.2f}% | m=7 retains {unsup_res['pca_cum_var_explained'][6]*100:.2f}% (>=90%), "
          f"m=9 retains {unsup_res['pca_cum_var_explained'][8]*100:.2f}%")

    with open(os.path.join(results_dir, "unsupervised_regime_analysis.json"), "w", encoding="utf-8") as f:
        json.dump(unsup_res, f, indent=2)

    print("\n" + "=" * 88)
    print("PHASE 3: Supervised Hyperparameter Tuning (5-Fold Expanding TimeSeriesSplit)")
    print("=" * 88)
    best_models = run_hyperparameter_tuning(X_train_scaled, y_train, X_train)
    cv_summary = {}
    cv_csv_rows = []
    for name, (_, params, cv_f1, cv_std, fit_t) in best_models.items():
        cv_summary[name] = {
            "best_params": params,
            "cv_f1_mean": round(cv_f1, 4),
            "cv_f1_std": round(cv_std, 4),
            "fit_runtime_sec": round(fit_t, 4),
        }
        cv_csv_rows.append({
            "Model": name,
            "Best_Params": str(params),
            "CV_TimeSeries_F1_Mean": round(cv_f1, 6),
            "CV_TimeSeries_F1_Std": round(cv_std, 6),
            "Fit_Runtime_Sec": round(fit_t, 4),
        })
        print(f"{name:<23} | CV F1: {cv_f1:.4f} +/- {cv_std:.4f} | Fit: {fit_t:.3f}s | Selected: {params}")

    pd.DataFrame(cv_csv_rows).to_csv(os.path.join(results_dir, "hyperparameter_tuning_results.csv"), index=False)

    print("\n" + "=" * 88)
    print("PHASE 4: Holdout Test Set Performance (2019-2024, N = 2,192 Days, 164 Extremes)")
    print("=" * 88)
    perf_rows = []
    preds_dict = {}
    probs_dict = {}
    ci_block7_dict = {}
    ci_iid_dict = {}
    inference_times = {}

    for name, (model, params, cv_f1, cv_std, fit_t) in best_models.items():
        X_eval = X_test.values if name in ["Decision Tree", "Random Forest"] else X_test_scaled
        t0 = time.perf_counter()
        y_pred = model.predict(X_eval)
        y_prob = model.predict_proba(X_eval)[:, 1]
        inf_t = float(time.perf_counter() - t0)
        inference_times[name] = round(inf_t, 4)
        preds_dict[name] = y_pred
        probs_dict[name] = y_prob

        m = calculate_metrics(y_test.values, y_pred, y_prob)
        ci_b7 = bootstrap_confidence_intervals(y_test.values, y_pred, y_prob, n_bootstrap=1000, block_length=7, seed=42)
        ci_iid = bootstrap_confidence_intervals(y_test.values, y_pred, y_prob, n_bootstrap=1000, block_length=1, seed=42)
        ci_block7_dict[name] = ci_b7
        ci_iid_dict[name] = ci_iid

        m["Model"] = name
        m["CV_F1"] = round(cv_f1, 4)
        m["CV_Std"] = round(cv_std, 4)
        m["Fit_Runtime_Sec"] = round(fit_t, 4)
        m["Test_Inference_Sec"] = round(inf_t, 4)
        m["F1_CI_95_Block7"] = f"[{ci_b7['F1_Score']['ci_lower']*100:.2f}%, {ci_b7['F1_Score']['ci_upper']*100:.2f}%]"
        m["F1_CI_95_IID"] = f"[{ci_iid['F1_Score']['ci_lower']*100:.2f}%, {ci_iid['F1_Score']['ci_upper']*100:.2f}%]"
        m["F1_CI_95"] = m["F1_CI_95_Block7"]
        perf_rows.append(m)
        print(f"{name:<23} | Acc: {m['Accuracy']*100:.2f}% | Prec: {m['Precision']*100:.2f}% | "
              f"Rec: {m['Recall']*100:.2f}% | F1: {m['F1_Score']:.4f} (Block7 CI {m['F1_CI_95_Block7']}) | "
              f"ROC-AUC: {m['ROC_AUC']:.4f} | PR-AUC: {m['PR_AUC']:.4f} | Brier: {m['Brier_Score']:.4f} | "
              f"TN={m['TN']}, FP={m['FP']}, FN={m['FN']}, TP={m['TP']}")

    pd.DataFrame(perf_rows).to_csv(os.path.join(results_dir, "model_performance_comparison.csv"), index=False)
    with open(os.path.join(results_dir, "bootstrapped_confidence_intervals.json"), "w", encoding="utf-8") as f:
        json.dump({"block_length_7": ci_block7_dict, "iid_block_length_1": ci_iid_dict}, f, indent=2)

    # Feature Attribution Table (All 22 predictors)
    lr_coefs = best_models["Logistic Regression"][0].coef_[0]
    dt_gini = best_models["Decision Tree"][0].feature_importances_
    rf_gini = best_models["Random Forest"][0].feature_importances_
    perm_res = permutation_importance(
        best_models["Random Forest"][0], X_test.values, y_test.values,
        scoring="roc_auc", n_repeats=10, random_state=42
    )
    feat_df = pd.DataFrame({
        "Feature": split_info["feature_names"],
        "RF_Gini_Importance": rf_gini,
        "DT_Gini_Importance": dt_gini,
        "LR_Coefficient": lr_coefs,
        "RF_Permutation_AUC_Drop": perm_res.importances_mean,
        "RF_Permutation_AUC_Std": perm_res.importances_std,
    }).sort_values("RF_Gini_Importance", ascending=False).reset_index(drop=True)
    feat_df.to_csv(os.path.join(results_dir, "feature_importances.csv"), index=False)

    # Paired McNemar Tests & PCA (m=7) vs. 22-Feature Ablation
    mcnemar_rows = run_mcnemar_tests(y_test.values, preds_dict)
    X_tr_pca7 = pca_model.transform(X_train_scaled)[:, :7]
    X_te_pca7 = pca_model.transform(X_test_scaled)[:, :7]
    lr_best_C = best_models["Logistic Regression"][1]["C"]
    lr_pca7 = LogisticRegression(C=lr_best_C, class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42).fit(X_tr_pca7, y_train.values)
    pr_lr_pca7 = lr_pca7.predict_proba(X_te_pca7)[:, 1]
    m_lr_pca7 = calculate_metrics(y_test.values, (pr_lr_pca7 >= 0.5).astype(int), pr_lr_pca7)

    knn_pca7 = KNeighborsClassifier(n_neighbors=5, weights="uniform").fit(X_tr_pca7, y_train.values)
    pr_knn_pca7 = knn_pca7.predict_proba(X_te_pca7)[:, 1]
    m_knn_pca7 = calculate_metrics(y_test.values, (pr_knn_pca7 >= 0.5).astype(int), pr_knn_pca7)

    print("\n" + "=" * 88)
    print("PHASE 5: Cost-Sensitive Threshold Sweep (15:1), OOF tau_CV*, and Tasks B & C")
    print("=" * 88)
    rf_probs = probs_dict["Random Forest"]
    rf_best_params = best_models["Random Forest"][1]
    tau_cv_star, oof_sweep = select_oof_threshold_cv(X_train.values, y_train.values, rf_params=rf_best_params, fn_weight=15, fp_weight=1)

    sweep_taus = [0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.60, 0.70]
    sweep_rows = []
    best_posthoc_tau = None
    best_posthoc_loss = float("inf")
    for tau in sweep_taus:
        yp = (rf_probs >= tau).astype(int)
        m = calculate_metrics(y_test.values, yp, rf_probs)
        loss_15x = int(15 * m["FN"] + 1 * m["FP"])
        loss_5x = int(5 * m["FN"] + 1 * m["FP"])
        row = {
            "Threshold": tau,
            "Accuracy": round(m["Accuracy"], 4),
            "Precision": round(m["Precision"], 4),
            "Recall": round(m["Recall"], 4),
            "F1_Score": round(m["F1_Score"], 4),
            "Specificity": round(m["Specificity"], 4),
            "TP": m["TP"],
            "FN": m["FN"],
            "FP": m["FP"],
            "TN": m["TN"],
            "Total_Cost_15x": loss_15x,
            "Total_Cost_5x": loss_5x,
        }
        sweep_rows.append(row)
        if loss_15x < best_posthoc_loss:
            best_posthoc_loss = loss_15x
            best_posthoc_tau = tau

    # Save full threshold simulation CSV across LR, RF, SVM
    sim_rows = []
    for tau in np.round(np.arange(0.05, 0.96, 0.025), 3):
        for m_name in ["Logistic Regression", "Random Forest", "Support Vector Machine"]:
            pr_m = probs_dict[m_name]
            yp_m = (pr_m >= tau).astype(int)
            mm = calculate_metrics(y_test.values, yp_m, pr_m)
            sim_rows.append({
                "Decision_Threshold": float(tau),
                "Model": m_name,
                "Accuracy": mm["Accuracy"],
                "Precision": mm["Precision"],
                "Recall": mm["Recall"],
                "F1_Score": mm["F1_Score"],
                "Specificity": mm["Specificity"],
                "False_Alarm_Ratio": float(1.0 - mm["Precision"]) if (mm["TP"] + mm["FP"]) > 0 else 0.0,
                "TP": mm["TP"],
                "FP": mm["FP"],
                "FN": mm["FN"],
                "TN": mm["TN"],
                "Total_Cost_15x": int(15 * mm["FN"] + mm["FP"]),
                "Total_Cost_5x": int(5 * mm["FN"] + mm["FP"]),
            })
    pd.DataFrame(sim_rows).to_csv(os.path.join(results_dir, "operational_threshold_simulation.csv"), index=False)

    r_cv = [r for r in sweep_rows if r["Threshold"] == tau_cv_star][0]
    r_opt = [r for r in sweep_rows if r["Threshold"] == best_posthoc_tau][0]
    r_def = [r for r in sweep_rows if r["Threshold"] == 0.50][0]
    print(f"Leakage-Free OOF Threshold (tau_CV* = {tau_cv_star:.2f}): Recall = {r_cv['Recall']*100:.2f}% "
          f"({r_cv['TP']}/164, FN={r_cv['FN']}, FP={r_cv['FP']}) | Precision = {r_cv['Precision']*100:.2f}% | "
          f"F1 = {r_cv['F1_Score']:.4f} | Test 15:1 Loss = {r_cv['Total_Cost_15x']}")
    print(f"Post-Hoc Test Minimum     (tau*    = {best_posthoc_tau:.2f}): Recall = {r_opt['Recall']*100:.2f}% "
          f"({r_opt['TP']}/164, FN={r_opt['FN']}, FP={r_opt['FP']}) | Precision = {r_opt['Precision']*100:.2f}% | "
          f"F1 = {r_opt['F1_Score']:.4f} | Test 15:1 Loss = {r_opt['Total_Cost_15x']} (vs {r_def['Total_Cost_15x']} at tau=0.50)")

    # Sensitivity Task B (Strict 24-h Lead Time: t-1 -> y_t) and Task C (Wet-Day R95p = 22.7520 mm/day)
    tr_m = df_clean["date"].dt.year <= 2018
    te_m = df_clean["date"].dt.year > 2018
    X_tr_b_raw = df_clean.loc[tr_m, FEATURE_COLS_TASK_B].values
    X_te_b_raw = df_clean.loc[te_m, FEATURE_COLS_TASK_B].values
    sc_b = StandardScaler().fit(X_tr_b_raw)
    X_tr_bs = sc_b.transform(X_tr_b_raw)
    X_te_bs = sc_b.transform(X_te_b_raw)

    lr_b = LogisticRegression(C=0.1, class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42).fit(X_tr_bs, y_train.values)
    pr_lr_b = lr_b.predict_proba(X_te_bs)[:, 1]
    m_task_b_lr = calculate_metrics(y_test.values, (pr_lr_b >= 0.5).astype(int), pr_lr_b)

    rf_b = RandomForestClassifier(
        n_estimators=rf_best_params.get("n_estimators", 100),
        max_depth=rf_best_params.get("max_depth", 8),
        min_samples_leaf=rf_best_params.get("min_samples_leaf", 5),
        class_weight="balanced",
        random_state=42,
    ).fit(X_tr_b_raw, y_train.values)
    pr_rf_b = rf_b.predict_proba(X_te_b_raw)[:, 1]
    m_task_b_rf = calculate_metrics(y_test.values, (pr_rf_b >= 0.5).astype(int), pr_rf_b)

    knn_b = KNeighborsClassifier(n_neighbors=5, weights="uniform").fit(X_tr_bs, y_train.values)
    pr_knn_b = knn_b.predict_proba(X_te_bs)[:, 1]
    m_task_b_knn = calculate_metrics(y_test.values, (pr_knn_b >= 0.5).astype(int), pr_knn_b)

    y_tr_c = df_clean.loc[tr_m, "target_extreme_wet95"].values
    y_te_c = df_clean.loc[te_m, "target_extreme_wet95"].values
    lr_c = LogisticRegression(C=0.1, class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42).fit(X_train_scaled, y_tr_c)
    pr_lr_c = lr_c.predict_proba(X_test_scaled)[:, 1]
    m_task_c_lr = calculate_metrics(y_te_c, (pr_lr_c >= 0.5).astype(int), pr_lr_c)

    rf_c = RandomForestClassifier(
        n_estimators=rf_best_params.get("n_estimators", 100),
        max_depth=rf_best_params.get("max_depth", 8),
        min_samples_leaf=rf_best_params.get("min_samples_leaf", 5),
        class_weight="balanced",
        random_state=42,
    ).fit(X_train.values, y_tr_c)
    pr_rf_c = rf_c.predict_proba(X_test.values)[:, 1]
    m_task_c_rf = calculate_metrics(y_te_c, (pr_rf_c >= 0.5).astype(int), pr_rf_c)

    print(f"Task B (24-h Lead Time, t-1 -> y_t) LR  : Acc={m_task_b_lr['Accuracy']*100:.2f}%, Prec={m_task_b_lr['Precision']*100:.2f}%, "
          f"Rec={m_task_b_lr['Recall']*100:.2f}%, F1={m_task_b_lr['F1_Score']:.4f}, ROC-AUC={m_task_b_lr['ROC_AUC']:.4f}, PR-AUC={m_task_b_lr['PR_AUC']:.4f}")
    print(f"Task B (24-h Lead Time, t-1 -> y_t) RF  : Acc={m_task_b_rf['Accuracy']*100:.2f}%, Prec={m_task_b_rf['Precision']*100:.2f}%, "
          f"Rec={m_task_b_rf['Recall']*100:.2f}%, F1={m_task_b_rf['F1_Score']:.4f}, ROC-AUC={m_task_b_rf['ROC_AUC']:.4f}, PR-AUC={m_task_b_rf['PR_AUC']:.4f}")
    print(f"Task B (24-h Lead Time, t-1 -> y_t) kNN : Acc={m_task_b_knn['Accuracy']*100:.2f}%, Prec={m_task_b_knn['Precision']*100:.2f}%, "
          f"Rec={m_task_b_knn['Recall']*100:.2f}%, F1={m_task_b_knn['F1_Score']:.4f}, ROC-AUC={m_task_b_knn['ROC_AUC']:.4f}, PR-AUC={m_task_b_knn['PR_AUC']:.4f}")
    print(f"Task C (Wet-Day R95p = 22.75 mm/day) LR : Acc={m_task_c_lr['Accuracy']*100:.2f}%, Prec={m_task_c_lr['Precision']*100:.2f}%, "
          f"Rec={m_task_c_lr['Recall']*100:.2f}%, F1={m_task_c_lr['F1_Score']:.4f}, ROC-AUC={m_task_c_lr['ROC_AUC']:.4f}, PR-AUC={m_task_c_lr['PR_AUC']:.4f}")
    print(f"Task C (Wet-Day R95p = 22.75 mm/day) RF : Acc={m_task_c_rf['Accuracy']*100:.2f}%, Prec={m_task_c_rf['Precision']*100:.2f}%, "
          f"Rec={m_task_c_rf['Recall']*100:.2f}%, F1={m_task_c_rf['F1_Score']:.4f}, ROC-AUC={m_task_c_rf['ROC_AUC']:.4f}, PR-AUC={m_task_c_rf['PR_AUC']:.4f}")

    # Save reproducible prediction arrays for figure generation & independent verification audit
    np.savez(
        os.path.join(results_dir, "test_predictions.npz"),
        y_train=y_train.values,
        y_test=y_test.values,
        y_test_wet95=y_te_c,
        P_tr=P_tr[:, :2],
        S_tr=S_tr[:, :2],
        yp_lr=preds_dict["Logistic Regression"],
        pr_lr=probs_dict["Logistic Regression"],
        yp_dt=preds_dict["Decision Tree"],
        pr_dt=probs_dict["Decision Tree"],
        yp_svm=preds_dict["Support Vector Machine"],
        pr_svm=probs_dict["Support Vector Machine"],
        yp_rf=preds_dict["Random Forest"],
        pr_rf=probs_dict["Random Forest"],
        yp_knn=preds_dict["k-Nearest Neighbours"],
        pr_knn=probs_dict["k-Nearest Neighbours"],
        pr_lr_task_b=pr_lr_b,
        pr_rf_task_b=pr_rf_b,
        pr_knn_task_b=pr_knn_b,
        pr_lr_task_c=pr_lr_c,
        pr_rf_task_c=pr_rf_c,
    )

    # September 20-30, 2024 Kathmandu Flood Case Study (within holdout test set)
    test_df_full = df_clean.loc[te_m].copy().reset_index(drop=True)
    test_df_full["rf_prob_task_a"] = probs_dict["Random Forest"]
    test_df_full["lr_prob_task_a"] = probs_dict["Logistic Regression"]
    test_df_full["lr_prob_task_b"] = pr_lr_b
    sep_mask = (test_df_full["date"] >= "2024-09-20") & (test_df_full["date"] <= "2024-09-30")
    sep_df = test_df_full.loc[sep_mask, [
        "date", "PRECTOTCORR", "RH2M", "QV2M", "temp_diurnal_range",
        "precip_roll7", "target_extreme", "target_extreme_wet95",
        "rf_prob_task_a", "lr_prob_task_a", "lr_prob_task_b"
    ]].copy()
    sep_df["date"] = sep_df["date"].dt.strftime("%Y-%m-%d")
    sep_records = sep_df.to_dict(orient="records")

    print("\nSeptember 20-30, 2024 Kathmandu Flood Holdout Case Study:")
    for r in sep_records:
        tier = (
            "RED (High-Priority Escalation)" if (r["rf_prob_task_a"] >= 0.60 and r["lr_prob_task_a"] >= 0.85) else
            "ORANGE (Municipal Preparedness)" if (r["rf_prob_task_a"] >= tau_cv_star or r["lr_prob_task_a"] >= 0.70) else
            "YELLOW (Internal Watch)" if (r["rf_prob_task_a"] >= 0.25 or r["lr_prob_task_b"] >= 0.50) else
            "GREEN (Normal)"
        )
        print(f"  {r['date']} | Rain={r['PRECTOTCORR']:6.2f} mm/d | RH2M={r['RH2M']:5.2f}% | "
              f"RF_Prob={r['rf_prob_task_a']:.4f} | LR_Prob={r['lr_prob_task_a']:.4f} | LR_24h={r['lr_prob_task_b']:.4f} | {tier}")

    total_runtime = float(time.perf_counter() - t_start)

    # Export complete authoritative results/verified_metrics.json
    verified_metrics = {
        "execution_metadata": {
            "random_seed": 42,
            "python_version": platform.python_version(),
            "platform": platform.platform(),
            "numpy_version": np.__version__,
            "pandas_version": pd.__version__,
            "scipy_version": scipy.__version__,
            "sklearn_version": getattr(sklearn, "__version__", "1.5.2"),
            "total_pipeline_runtime_sec": round(total_runtime, 3),
        },
        "raw_dataset_audit": raw_audit,
        "dataset_split": split_info,
        "unsupervised": unsup_res,
        "cv_tuning": cv_summary,
        "test_performance": perf_rows,
        "bootstrap_ci_95": ci_block7_dict,
        "bootstrap_ci_95_iid": ci_iid_dict,
        "top10_feature_attribution": feat_df.head(10).to_dict(orient="records"),
        "all22_feature_attribution": feat_df.to_dict(orient="records"),
        "mcnemar_tests": mcnemar_rows,
        "pca7_ablation": {
            "LR_Full22": [r for r in perf_rows if r["Model"] == "Logistic Regression"][0],
            "LR_PCA7": m_lr_pca7,
            "kNN_Full22": [r for r in perf_rows if r["Model"] == "k-Nearest Neighbours"][0],
            "kNN_PCA7": m_knn_pca7,
        },
        "threshold_cost_sweep": {
            "fn_weight": 15,
            "fp_weight": 1,
            "tau_cv_star": tau_cv_star,
            "tau_posthoc_star": best_posthoc_tau,
            "oof_sweep": oof_sweep,
            "test_sweep": sweep_rows,
        },
        "sensitivity_tasks": {
            "Task_A_SameDay_RF": [r for r in perf_rows if r["Model"] == "Random Forest"][0],
            "Task_A_SameDay_LR": [r for r in perf_rows if r["Model"] == "Logistic Regression"][0],
            "Task_B_24hLeadTime_LR": m_task_b_lr,
            "Task_B_24hLeadTime_RF": m_task_b_rf,
            "Task_B_24hLeadTime_kNN": m_task_b_knn,
            "Task_C_WetDayR95p_LR": m_task_c_lr,
            "Task_C_WetDayR95p_RF": m_task_c_rf,
        },
        "september_2024_case_study": sep_records,
    }
    verified_json_path = os.path.join(results_dir, "verified_metrics.json")
    with open(verified_json_path, "w", encoding="utf-8") as f:
        json.dump(verified_metrics, f, indent=2)
    print(f"\nExported authoritative single-source-of-truth metrics to: {verified_json_path} (Total runtime: {total_runtime:.2f}s)")
    sys.stdout = orig_stdout
    log_file.close()


if __name__ == "__main__":
    main()
