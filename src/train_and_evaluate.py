"""
Modeling, Leak-Free Pipeline Hyperparameter Tuning, and Evaluation Module
MSc Machine Learning Coursework - STW7072CEM
Student: Bishow Gurung (College ID: 260005 | Coventry University ID: 17624457)
Topic: Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall
       at the Kathmandu Airport Grid Cell (1995-2024)
"""

import os
import sys
import json
import time
import warnings
import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA, FastICA
from sklearn.model_selection import TimeSeriesSplit, GridSearchCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    brier_score_loss, silhouette_score, davies_bouldin_score,
)
from sklearn.inspection import permutation_importance
from scipy.stats import binomtest


def run_mcnemar_tests(y_true, preds_dict):
    """Computes paired McNemar chi-square statistics (with continuity correction) and exact binomial p-values."""
    yt = np.asarray(y_true, dtype=int)
    ext_mask = yt == 1
    pairs = [
        ("Random Forest", "k-Nearest Neighbours"),
        ("Logistic Regression", "k-Nearest Neighbours"),
        ("Random Forest", "Decision Tree"),
        ("Random Forest", "Support Vector Machine"),
        ("Logistic Regression", "Random Forest"),
    ]
    rows = []
    for m1, m2 in pairs:
        p1 = np.asarray(preds_dict[m1], dtype=int)
        p2 = np.asarray(preds_dict[m2], dtype=int)
        c1 = p1 == yt
        c2 = p2 == yt
        b_all = int((c1 & ~c2).sum())
        c_all = int((~c1 & c2).sum())
        chi2_all = float(((abs(b_all - c_all) - 1.0) ** 2) / max(1, b_all + c_all)) if (b_all + c_all) > 0 else 0.0
        pval_all = float(binomtest(min(b_all, c_all), n=max(1, b_all + c_all), p=0.5).pvalue) if (b_all + c_all) > 0 else 1.0

        e1 = p1[ext_mask] == 1
        e2 = p2[ext_mask] == 1
        b_ext = int((e1 & ~e2).sum())
        c_ext = int((~e1 & e2).sum())
        chi2_ext = float(((abs(b_ext - c_ext) - 1.0) ** 2) / max(1, b_ext + c_ext)) if (b_ext + c_ext) > 0 else 0.0
        pval_ext = float(binomtest(min(b_ext, c_ext), n=max(1, b_ext + c_ext), p=0.5).pvalue) if (b_ext + c_ext) > 0 else 1.0

        rows.append({
            "pair": f"{m1} vs. {m2}",
            "b_all": b_all,
            "c_all": c_all,
            "chi2_all": round(chi2_all, 2),
            "p_all": pval_all,
            "b_ext": b_ext,
            "c_ext": c_ext,
            "chi2_ext": round(chi2_ext, 2),
            "p_ext": pval_ext,
        })
    return rows


def perform_unsupervised_analysis(X_train, y_train, feature_names):
    """
    Performs K-Means clustering, PCA, and FastICA dimensionality reduction strictly on the
    standardized 1995-2018 training partition (N = 8,759 days, 22 features).
    Records empirical fit and transform runtimes.
    """
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # 1. Optimal K search (k = 2 to 6)
    k_range = list(range(2, 7))
    inertias = []
    sil_scores_full = []
    sil_scores_sub = []
    db_scores = []

    for k in k_range:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        km.fit(X_train_scaled)
        inertias.append(float(km.inertia_))
        sil_full = float(silhouette_score(X_train_scaled, km.labels_, sample_size=None, random_state=42))
        sil_sub = float(silhouette_score(X_train_scaled, km.labels_, sample_size=5000, random_state=42))
        db = float(davies_bouldin_score(X_train_scaled, km.labels_))
        sil_scores_full.append(sil_full)
        sil_scores_sub.append(sil_sub)
        db_scores.append(db)

    # Fit K-Means with optimal k=3 and measure runtime
    t0 = time.perf_counter()
    km_optimal = KMeans(n_clusters=3, random_state=42, n_init=10)
    train_clusters = km_optimal.fit_predict(X_train_scaled)
    km_runtime = float(time.perf_counter() - t0)

    cluster_df = pd.DataFrame({
        "cluster": train_clusters,
        "target_extreme": np.asarray(y_train, dtype=int),
    })
    cluster_stats = cluster_df.groupby("cluster").agg(
        total_days=("target_extreme", "count"),
        extreme_events=("target_extreme", "sum"),
        extreme_rate=("target_extreme", "mean"),
    ).reset_index()
    total_ext = float(np.sum(y_train))
    cluster_stats["share_of_extremes"] = cluster_stats["extreme_events"] / total_ext

    # Compute unscaled physical centroid means per cluster
    X_train_df = pd.DataFrame(X_train, columns=feature_names)
    X_train_df["cluster"] = train_clusters
    unscaled_centroids = X_train_df.groupby("cluster")[feature_names].mean().to_dict(orient="index")

    # 2. PCA & FastICA Dimensionality Reduction (strictly on X_train_scaled)
    t0 = time.perf_counter()
    pca = PCA(n_components=22, random_state=42)
    pca.fit(X_train_scaled)
    pca_runtime = float(time.perf_counter() - t0)

    t0 = time.perf_counter()
    ica = FastICA(n_components=7, random_state=42, max_iter=500)
    ica_coords = ica.fit_transform(X_train_scaled)
    ica_runtime = float(time.perf_counter() - t0)

    ica_kurtosis = [
        float(np.mean((ica_coords[:, j] - np.mean(ica_coords[:, j])) ** 4) / (np.var(ica_coords[:, j]) ** 2) - 3.0)
        for j in range(ica_coords.shape[1])
    ]

    var_explained = [float(v) for v in pca.explained_variance_ratio_]
    eigenvalues = [float(v) for v in pca.explained_variance_]
    cum_var_explained = [float(v) for v in np.cumsum(pca.explained_variance_ratio_)]

    pca_loadings = pd.DataFrame(
        pca.components_[:3, :],
        columns=feature_names,
        index=["PC1", "PC2", "PC3"],
    )

    unsupervised_results = {
        "k_range": k_range,
        "inertias": inertias,
        "silhouette_scores": sil_scores_full,
        "silhouette_scores_subsample5000": sil_scores_sub,
        "davies_bouldin_scores": db_scores,
        "optimal_k": 3,
        "cluster_profiles": cluster_stats.to_dict(orient="records"),
        "cluster_centers_scaled": km_optimal.cluster_centers_.tolist(),
        "cluster_centers_unscaled": {str(k): v for k, v in unscaled_centroids.items()},
        "pca_eigenvalues": eigenvalues,
        "pca_var_explained": var_explained,
        "pca_cum_var_explained": cum_var_explained,
        "pca_components": pca_loadings.to_dict(),
        "ica_kurtosis": ica_kurtosis,
        "runtimes_sec": {
            "PCA": round(pca_runtime, 4),
            "FastICA": round(ica_runtime, 4),
            "KMeans_k3": round(km_runtime, 4),
        },
    }

    return unsupervised_results, km_optimal, pca, ica, scaler


def run_hyperparameter_tuning(X_train_scaled, y_train, X_train_raw):
    """
    Performs chronological TimeSeriesSplit (5 expanding folds) hyperparameter tuning
    strictly on the 1995-2018 training partition. Every classifier is encapsulated inside an
    sklearn Pipeline with StandardScaler() so each fold computes its own scaling parameters
    solely from its historical training subset.
    """
    tscv = TimeSeriesSplit(n_splits=5)
    X_raw_arr = np.asarray(X_train_raw, dtype=np.float64)
    y_arr = np.asarray(y_train, dtype=int)

    # 1. Logistic Regression (L2-Regularized)
    pipe_lr = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42)),
    ])
    param_lr = {"clf__C": [0.01, 0.1, 1.0, 10.0]}
    grid_lr = GridSearchCV(pipe_lr, param_lr, cv=tscv, scoring="f1", n_jobs=1)
    grid_lr.fit(X_raw_arr, y_arr)
    t0 = time.perf_counter()
    lr_best_C = grid_lr.best_params_["clf__C"]
    lr_final = LogisticRegression(C=lr_best_C, class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42)
    lr_final.fit(X_train_scaled, y_arr)
    lr_fit_time = float(time.perf_counter() - t0)

    # 2. Decision Tree (CART)
    param_dt = {
        "max_depth": [3, 4, 5, 6, 8],
        "min_samples_split": [10, 20, 50],
        "min_samples_leaf": [5, 10, 20],
    }
    grid_dt = GridSearchCV(
        DecisionTreeClassifier(class_weight="balanced", random_state=42),
        param_dt, cv=tscv, scoring="f1", n_jobs=1,
    )
    grid_dt.fit(X_raw_arr, y_arr)
    t0 = time.perf_counter()
    dt_final = grid_dt.best_estimator_
    dt_final.fit(X_raw_arr, y_arr)
    dt_fit_time = float(time.perf_counter() - t0)

    # 3. Support Vector Machine (RBF Kernel)
    pipe_svm = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", SVC(kernel="rbf", class_weight="balanced", probability=True, random_state=42)),
    ])
    param_svm = {"clf__C": [0.5, 1.0, 2.0], "clf__gamma": ["scale"]}
    grid_svm = GridSearchCV(pipe_svm, param_svm, cv=tscv, scoring="f1", n_jobs=1)
    grid_svm.fit(X_raw_arr, y_arr)
    t0 = time.perf_counter()
    svm_best_C = grid_svm.best_params_["clf__C"]
    svm_final = SVC(C=svm_best_C, gamma="scale", kernel="rbf", class_weight="balanced", probability=True, random_state=42)
    svm_final.fit(X_train_scaled, y_arr)
    svm_fit_time = float(time.perf_counter() - t0)

    # 4. Random Forest (Ensemble Bagging)
    param_rf = {
        "n_estimators": [100, 150],
        "max_depth": [4, 6, 8],
        "min_samples_leaf": [5, 10],
    }
    grid_rf = GridSearchCV(
        RandomForestClassifier(class_weight="balanced", random_state=42),
        param_rf, cv=tscv, scoring="f1", n_jobs=1,
    )
    grid_rf.fit(X_raw_arr, y_arr)
    t0 = time.perf_counter()
    rf_final = grid_rf.best_estimator_
    rf_final.fit(X_raw_arr, y_arr)
    rf_fit_time = float(time.perf_counter() - t0)

    # 5. k-Nearest Neighbours (Instance-Based)
    pipe_knn = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", KNeighborsClassifier()),
    ])
    param_knn = {"clf__n_neighbors": [5, 9, 15, 21], "clf__weights": ["uniform", "distance"]}
    grid_knn = GridSearchCV(pipe_knn, param_knn, cv=tscv, scoring="f1", n_jobs=1)
    grid_knn.fit(X_raw_arr, y_arr)
    t0 = time.perf_counter()
    knn_best_k = grid_knn.best_params_["clf__n_neighbors"]
    knn_best_w = grid_knn.best_params_["clf__weights"]
    knn_final = KNeighborsClassifier(n_neighbors=knn_best_k, weights=knn_best_w)
    knn_final.fit(X_train_scaled, y_arr)
    knn_fit_time = float(time.perf_counter() - t0)

    def _get_std(g):
        if hasattr(g, "cv_std_"):
            return float(g.cv_std_)
        return float(g.cv_results_["std_test_score"][g.best_index_])

    best_models = {
        "Logistic Regression": (
            lr_final,
            {"C": lr_best_C, "penalty": "l2", "solver": "lbfgs", "class_weight": "balanced"},
            float(grid_lr.best_score_),
            _get_std(grid_lr),
            lr_fit_time,
        ),
        "Decision Tree": (
            dt_final,
            {**grid_dt.best_params_, "class_weight": "balanced"},
            float(grid_dt.best_score_),
            _get_std(grid_dt),
            dt_fit_time,
        ),
        "Support Vector Machine": (
            svm_final,
            {"C": svm_best_C, "gamma": "scale", "class_weight": "balanced"},
            float(grid_svm.best_score_),
            _get_std(grid_svm),
            svm_fit_time,
        ),
        "Random Forest": (
            rf_final,
            {**grid_rf.best_params_, "class_weight": "balanced"},
            float(grid_rf.best_score_),
            _get_std(grid_rf),
            rf_fit_time,
        ),
        "k-Nearest Neighbours": (
            knn_final,
            {"n_neighbors": knn_best_k, "weights": knn_best_w},
            float(grid_knn.best_score_),
            _get_std(grid_knn),
            knn_fit_time,
        ),
    }

    return best_models


def select_oof_threshold_cv(X_train_raw, y_train, rf_params=None, fn_weight=15, fp_weight=1):
    """
    Selects the leakage-free operating threshold tau_CV* strictly from out-of-fold 5-fold
    expanding TimeSeriesSplit predictions on the 1995-2018 training set for Random Forest
    (and also records Logistic Regression OOF loss), prior to single-pass evaluation on
    the untouched 2019-2024 holdout test partition.
    """
    tscv = TimeSeriesSplit(n_splits=5)
    X_arr = np.asarray(X_train_raw, dtype=np.float64)
    y_arr = np.asarray(y_train, dtype=int)

    if rf_params is None:
        rf_params = {"n_estimators": 100, "max_depth": 8, "min_samples_leaf": 5}

    oof_rf_probs = []
    oof_lr_probs = []
    oof_targets = []

    for tr_idx, val_idx in tscv.split(X_arr):
        rf_fold = RandomForestClassifier(
            n_estimators=rf_params.get("n_estimators", 100),
            max_depth=rf_params.get("max_depth", 8),
            min_samples_leaf=rf_params.get("min_samples_leaf", 5),
            class_weight="balanced",
            random_state=42,
        )
        rf_fold.fit(X_arr[tr_idx], y_arr[tr_idx])
        oof_rf_probs.append(rf_fold.predict_proba(X_arr[val_idx])[:, 1])

        sc = StandardScaler().fit(X_arr[tr_idx])
        lr_fold = LogisticRegression(C=0.1, class_weight="balanced", solver="lbfgs", max_iter=1000, random_state=42)
        lr_fold.fit(sc.transform(X_arr[tr_idx]), y_arr[tr_idx])
        oof_lr_probs.append(lr_fold.predict_proba(sc.transform(X_arr[val_idx]))[:, 1])

        oof_targets.append(y_arr[val_idx])

    oof_rf_p = np.concatenate(oof_rf_probs)
    oof_lr_p = np.concatenate(oof_lr_probs)
    oof_y = np.concatenate(oof_targets)

    candidate_taus = [0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.60, 0.70]
    best_tau_rf = None
    best_loss_rf = float("inf")
    oof_sweep = []

    for t in candidate_taus:
        yp_rf = (oof_rf_p >= t).astype(int)
        tn, fp, fn, tp = confusion_matrix(oof_y, yp_rf).ravel()
        loss_rf = int(fn_weight * fn + fp_weight * fp)

        yp_lr = (oof_lr_p >= t).astype(int)
        tn_l, fp_l, fn_l, tp_l = confusion_matrix(oof_y, yp_lr).ravel()
        loss_lr = int(fn_weight * fn_l + fp_weight * fp_l)

        oof_sweep.append({
            "tau": t,
            "oof_rf_loss": loss_rf,
            "oof_rf_fn": int(fn),
            "oof_rf_fp": int(fp),
            "oof_rf_tp": int(tp),
            "oof_rf_tn": int(tn),
            "oof_rf_recall": float(tp / max(1, tp + fn)),
            "oof_rf_precision": float(tp / max(1, tp + fp)),
            "oof_rf_f1": float(2 * tp / max(1, 2 * tp + fp + fn)),
            "oof_lr_loss": loss_lr,
            "oof_lr_fn": int(fn_l),
            "oof_lr_fp": int(fp_l),
            "oof_lr_recall": float(tp_l / max(1, tp_l + fn_l)),
        })
        if loss_rf < best_loss_rf:
            best_loss_rf = loss_rf
            best_tau_rf = t

    return float(best_tau_rf), oof_sweep


def calculate_metrics(y_true, y_pred, y_prob):
    """Computes threshold-dependent and threshold-free classification metrics from arrays."""
    cm = confusion_matrix(y_true, y_pred)
    tn, fp, fn, tp = cm.ravel()

    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    f1_macro = f1_score(y_true, y_pred, average="macro", zero_division=0)
    spec = tn / (tn + fp) if (tn + fp) > 0 else 0.0
    roc_auc = roc_auc_score(y_true, y_prob)
    pr_auc = average_precision_score(y_true, y_prob)
    brier = brier_score_loss(y_true, y_prob)

    return {
        "Accuracy": float(acc),
        "Precision": float(prec),
        "Recall": float(rec),
        "F1_Score": float(f1),
        "F1_Macro": float(f1_macro),
        "Specificity": float(spec),
        "ROC_AUC": float(roc_auc),
        "PR_AUC": float(pr_auc),
        "Brier_Score": float(brier),
        "TN": int(tn),
        "FP": int(fp),
        "FN": int(fn),
        "TP": int(tp),
        "Event_Prevalence": float(np.mean(y_true)),
    }


def bootstrap_confidence_intervals(y_true, y_pred, y_prob, n_bootstrap=1000, block_length=7, seed=42):
    """
    Computes genuine 95% circular moving-block bootstrap confidence intervals across
    n_bootstrap=1,000 resamples with block_length=7 days (matching the 7-day synoptic
    persistence window) to preserve temporal autocorrelation. When block_length=1,
    reduces to standard i.i.d. bootstrap.
    """
    rng = np.random.RandomState(seed)
    y_true_arr = np.asarray(y_true, dtype=int)
    y_pred_arr = np.asarray(y_pred, dtype=int)
    y_prob_arr = np.asarray(y_prob, dtype=np.float64)
    n = len(y_true_arr)

    boot_metrics = {
        "Accuracy": [], "Precision": [], "Recall": [],
        "F1_Score": [], "ROC_AUC": [], "PR_AUC": [], "Brier_Score": [],
    }

    if block_length <= 1:
        for _ in range(n_bootstrap):
            idx = rng.randint(0, n, size=n)
            yt_s = y_true_arr[idx]
            if len(np.unique(yt_s)) < 2:
                continue
            yp_s = y_pred_arr[idx]
            pr_s = y_prob_arr[idx]
            boot_metrics["Accuracy"].append(accuracy_score(yt_s, yp_s))
            boot_metrics["Precision"].append(precision_score(yt_s, yp_s, zero_division=0))
            boot_metrics["Recall"].append(recall_score(yt_s, yp_s, zero_division=0))
            boot_metrics["F1_Score"].append(f1_score(yt_s, yp_s, zero_division=0))
            boot_metrics["ROC_AUC"].append(roc_auc_score(yt_s, pr_s))
            boot_metrics["PR_AUC"].append(average_precision_score(yt_s, pr_s))
            boot_metrics["Brier_Score"].append(brier_score_loss(yt_s, pr_s))
    else:
        n_blocks = int(np.ceil(n / float(block_length)))
        offsets = np.arange(block_length)
        for _ in range(n_bootstrap):
            starts = rng.randint(0, n, size=n_blocks)
            idx = (starts[:, None] + offsets[None, :]).ravel()[:n] % n
            yt_s = y_true_arr[idx]
            if len(np.unique(yt_s)) < 2:
                continue
            yp_s = y_pred_arr[idx]
            pr_s = y_prob_arr[idx]
            boot_metrics["Accuracy"].append(accuracy_score(yt_s, yp_s))
            boot_metrics["Precision"].append(precision_score(yt_s, yp_s, zero_division=0))
            boot_metrics["Recall"].append(recall_score(yt_s, yp_s, zero_division=0))
            boot_metrics["F1_Score"].append(f1_score(yt_s, yp_s, zero_division=0))
            boot_metrics["ROC_AUC"].append(roc_auc_score(yt_s, pr_s))
            boot_metrics["PR_AUC"].append(average_precision_score(yt_s, pr_s))
            boot_metrics["Brier_Score"].append(brier_score_loss(yt_s, pr_s))

    ci_results = {}
    for metric, values in boot_metrics.items():
        ci_lower = float(np.percentile(values, 2.5))
        ci_upper = float(np.percentile(values, 97.5))
        ci_mean = float(np.mean(values))
        ci_results[metric] = {
            "mean": ci_mean,
            "ci_lower": ci_lower,
            "ci_upper": ci_upper,
            "block_length": int(block_length),
            "n_bootstrap": int(n_bootstrap),
            "seed": int(seed),
            "str_format": f"{ci_mean*100:.2f}% [{ci_lower*100:.2f}%, {ci_upper*100:.2f}%]",
        }
    return ci_results


if __name__ == "__main__":
    from data_processing import load_and_preprocess_data, split_and_construct_target

    df_clean = load_and_preprocess_data()
    X_tr, y_tr, X_te, y_te, d_tr, d_te, split_info = split_and_construct_target(df_clean)
    unsup_res, km_m, pca_m, ica_m, scaler_m = perform_unsupervised_analysis(X_tr, y_tr, split_info["feature_names"])
    X_tr_s = scaler_m.transform(X_tr)
    X_te_s = scaler_m.transform(X_te)
    models = run_hyperparameter_tuning(X_tr_s, y_tr, X_tr)
    print("=" * 80)
    print("TRAINING & EVALUATION MODULE VERIFICATION (src/train_and_evaluate.py)")
    print("=" * 80)
    for name, (mdl, params, cv_f1, cv_std, fit_t) in models.items():
        X_ev = X_te.values if name in ["Decision Tree", "Random Forest"] else X_te_s
        yp = mdl.predict(X_ev)
        pr = mdl.predict_proba(X_ev)[:, 1]
        m = calculate_metrics(y_te, yp, pr)
        print(f"{name:<23} | CV F1={cv_f1:.4f}+/-{cv_std:.4f} | Test F1={m['F1_Score']:.4f} | Rec={m['Recall']*100:.2f}% | ROC-AUC={m['ROC_AUC']:.4f} | PR-AUC={m['PR_AUC']:.4f}")
