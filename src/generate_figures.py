#!/usr/bin/env python3
"""
300-DPI Scientific Figure Generation Script
MSc Machine Learning Coursework - STW7072CEM
Student: Bishow Gurung (College ID: 260005 | Coventry University ID: 17624457)
Topic: Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall
       at the Kathmandu Airport Grid Cell (1995-2024)
"""

import os
import sys
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.gridspec import GridSpec

from data_processing import load_and_preprocess_data, split_and_construct_target
from sklearn.metrics import (
    roc_curve, precision_recall_curve, confusion_matrix,
    brier_score_loss, roc_auc_score, average_precision_score,
)

plt.rcParams["font.family"] = "DejaVu Sans"
plt.rcParams["font.size"] = 9.5
plt.rcParams["axes.titlesize"] = 10.2
plt.rcParams["axes.labelsize"] = 9.5
plt.rcParams["xtick.labelsize"] = 8.5
plt.rcParams["ytick.labelsize"] = 8.5
plt.rcParams["legend.fontsize"] = 8.0
plt.rcParams["figure.dpi"] = 300
plt.rcParams["savefig.dpi"] = 300

NAVY = "#1B365D"
BLUE = "#2B6CB0"
TEAL = "#0D9488"
CORAL = "#C53030"
AMBER = "#D97706"
PURPLE = "#6B46C1"
SLATE = "#4A5568"


def generate_all_figures():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    fig_dir = os.path.join(base_dir, "figures")
    res_dir = os.path.join(base_dir, "results")
    os.makedirs(fig_dir, exist_ok=True)

    verified_path = os.path.join(res_dir, "verified_metrics.json")
    npz_path = os.path.join(res_dir, "test_predictions.npz")
    if not os.path.exists(verified_path) or not os.path.exists(npz_path):
        from run_experiments import main as run_all_exp
        run_all_exp()

    with open(verified_path, "r", encoding="utf-8") as f:
        verified = json.load(f)
    d_npz = np.load(npz_path)

    df = load_and_preprocess_data()
    X_train, y_train, X_test, y_test, d_tr, d_te, split_info = split_and_construct_target(df)
    unsup_res = verified["unsupervised"]

    # -------------------------------------------------------------------------
    # 1. figure_01_location.png: Study location & Kathmandu monthly climatology
    # -------------------------------------------------------------------------
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.6, 4.5), gridspec_kw={"width_ratios": [1.05, 1.35]})
    ax1.set_facecolor("#EEF4F8")
    lon_c, lat_c = 85.359, 27.697
    rect = patches.Rectangle(
        (lon_c - 0.3125, lat_c - 0.25), 0.625, 0.50,
        linewidth=2.0, edgecolor=NAVY, facecolor="#90CDF4", alpha=0.38,
        label="MERRA-2 Grid Cell (0.5° × 0.625°)",
    )
    ax1.add_patch(rect)
    theta = np.linspace(0, 2 * np.pi, 200)
    ax1.plot(
        lon_c + 0.14 * np.cos(theta), lat_c + 0.10 * np.sin(theta),
        color=TEAL, linestyle="--", lw=1.6, label="Kathmandu Valley Rim (~2,000–2,800 m)",
    )
    ax1.scatter(
        [lon_c], [lat_c], color=CORAL, s=90, zorder=5, marker="^",
        label="Tribhuvan Intl. Airport (VNKT, 1,269.39 m)",
    )
    for name, dx, dy in [
        ("Shivapuri (2,732 m)", 0.0, 0.145),
        ("Phulchowki (2,762 m)", 0.145, -0.155),
        ("Chandragiri (2,551 m)", -0.155, -0.120),
    ]:
        ax1.annotate(
            name, (lon_c + dx, lat_c + dy), fontsize=7.5, fontweight="bold",
            color=SLATE, ha="center", va="center",
            bbox=dict(boxstyle="round,pad=0.15", facecolor="white", edgecolor="none", alpha=0.75),
        )
    ax1.set_xlim(lon_c - 0.45, lon_c + 0.45)
    ax1.set_ylim(lat_c - 0.36, lat_c + 0.36)
    ax1.set_xlabel("Longitude (°E)")
    ax1.set_ylabel("Latitude (°N)")
    ax1.set_title("Kathmandu Airport MERRA-2 Grid Domain", fontweight="bold")
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="lower left", frameon=True, facecolor="white", framealpha=0.92, fontsize=7.4)

    df["month"] = df["date"].dt.month
    m_stats = df.groupby("month").agg(
        mean_rain=("PRECTOTCORR", "mean"),
        ext_count=("target_extreme", "sum"),
    ).reindex(range(1, 13))
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    x_m = np.arange(1, 13)
    ax2.bar(x_m - 0.18, m_stats["mean_rain"], width=0.36, color=BLUE, alpha=0.88, label="Mean Daily Rainfall (mm/day)")
    ax2.set_xlabel("Calendar Month (1995–2024)")
    ax2.set_ylabel("Mean Daily Precipitation (mm/day)", color=BLUE, fontweight="bold")
    ax2.set_xticks(x_m)
    ax2.set_xticklabels(months)
    ax2.grid(True, axis="y", linestyle=":", alpha=0.6)
    ax2_t = ax2.twinx()
    ax2_t.bar(x_m + 0.18, m_stats["ext_count"], width=0.36, color=CORAL, alpha=0.85, label="Extreme Days ≥ 13.74 mm (Count)")
    ax2_t.set_ylabel("Total Extreme Rainfall Days (Count)", color=CORAL, fontweight="bold")
    ax2.set_title("Monthly Rainfall Climatology & Monsoon Concentration", fontweight="bold")
    h1, l1 = ax2.get_legend_handles_labels()
    h2, l2 = ax2_t.get_legend_handles_labels()
    ax2.legend(h1 + h2, l1 + l2, loc="upper left", frameon=True, facecolor="white", fontsize=7.8)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_01_location.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 2. figure_02_tail_distribution.png: Daily rainfall tail & P95 vs R95p
    # -------------------------------------------------------------------------
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.5, 4.3))
    tr_rain = df.loc[df["date"].dt.year <= 2018, "PRECTOTCORR"].values
    te_rain = df.loc[df["date"].dt.year > 2018, "PRECTOTCORR"].values
    bins = np.linspace(0, 115, 60)
    ax1.hist(tr_rain, bins=bins, color=BLUE, alpha=0.72, label="Training (1995–2018, N=8,759)", edgecolor="white", lw=0.4)
    ax1.hist(te_rain, bins=bins, color=TEAL, alpha=0.68, label="Testing (2019–2024, N=2,192)", edgecolor="white", lw=0.4)
    ax1.axvline(13.74, color=CORAL, linestyle="--", lw=2.0, label="All-Day P95 = 13.74 mm/day (5.01% Train)")
    ax1.axvline(22.752, color=AMBER, linestyle="-.", lw=2.0, label="Wet-Day R95p = 22.75 mm/day (1.69% Train)")
    ax1.set_yscale("log")
    ax1.set_xlabel("Daily Precipitation (mm/day)")
    ax1.set_ylabel("Frequency (Log Scale, Days)")
    ax1.set_title("Right-Skewed Daily Rainfall Distribution (Log-Frequency)", fontweight="bold")
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="upper right", frameon=True, facecolor="white", fontsize=8)

    r_grid = np.linspace(0.1, 95, 300)
    surv_tr = [np.mean(tr_rain >= r) * 100 for r in r_grid]
    surv_te = [np.mean(te_rain >= r) * 100 for r in r_grid]
    ax2.plot(r_grid, surv_tr, color=BLUE, lw=2.2, label="1995–2018 Training Exceedance (%)")
    ax2.plot(r_grid, surv_te, color=CORAL, lw=2.2, linestyle="-", label="2019–2024 Holdout Exceedance (%)")
    ax2.axvline(13.74, color=CORAL, linestyle="--", lw=1.6)
    ax2.axvline(22.752, color=AMBER, linestyle="-.", lw=1.6)
    ax2.annotate(
        "P95 = 13.74 mm/day\nTrain: 5.01% | Test: 7.48%",
        xy=(13.74, 7.48), xytext=(24, 14),
        arrowprops=dict(arrowstyle="->", color=CORAL, lw=1.2), fontsize=8, fontweight="bold", color=CORAL,
    )
    ax2.annotate(
        "Wet-Day R95p = 22.75 mm/day\nTrain: 1.69% | Test: 2.92%",
        xy=(22.752, 2.92), xytext=(36, 3.8),
        arrowprops=dict(arrowstyle="->", color=AMBER, lw=1.2), fontsize=8, fontweight="bold", color=AMBER,
    )
    ax2.set_yscale("log")
    ax2.set_xlabel("Precipitation Threshold r (mm/day)")
    ax2.set_ylabel("Exceedance Probability P(R ≥ r) [%]")
    ax2.set_title("Empirical Tail Exceedance Curve & Recent Intensification", fontweight="bold")
    ax2.grid(True, linestyle=":", alpha=0.6)
    ax2.legend(loc="upper right", frameon=True, facecolor="white", fontsize=8)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_02_tail_distribution.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 3. figure_03_workflow_cv.png: Chronological split & 5-fold TimeSeriesSplit
    # -------------------------------------------------------------------------
    tau_cv_star = verified["threshold_cost_sweep"]["tau_cv_star"]
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12.2, 4.8), gridspec_kw={"width_ratios": [1.15, 1.2]})
    ax1.axis("off")
    ax1.set_xlim(0, 10)
    ax1.set_ylim(-0.35, 10.15)
    steps = [
        (5.0, 9.10, "1. Raw NASA POWER MERRA-2 Archive\n(1 Jan 1995 – 31 Dec 2024, N = 10,958 Days)", "#E2E8F0", NAVY),
        (5.0, 7.36, "2. 7-Day Lag Initialization & Strict t−1 Rolling Shift\n(22 Engineered Predictors, N = 10,951 Post-Lag Days)", "#DBEAFE", NAVY),
        (5.0, 5.62, "3. Strict Chronological Split at 31 Dec 2018\nTrain: 1995–2018 (8,759 d) | Holdout Test: 2019–2024 (2,192 d)", "#FEF3C7", "#92400E"),
        (5.0, 3.88, "4. Training-Only Quantile Thresholds & In-Fold Scaling\n(P95 = 13.74 mm/d, Wet-Day R95p = 22.75 mm/d, Pipeline Scaler)", "#D1FAE5", "#065F46"),
        (5.0, 2.14, f"5. 5-Fold Expanding-Window TimeSeriesSplit CV\n(Hyperparameter Tuning & Leakage-Free OOF τ*CV = {tau_cv_star:.2f})", "#EDE9FE", "#5B21B6"),
        (5.0, 0.40, "6. Single Locked Evaluation on 2019–2024 Holdout Set\n(164 P95 Extremes, 7-Day Block-Bootstrap CIs, McNemar & Tasks B/C)", "#FEE2E2", "#991B1B"),
    ]
    for x, y, label_txt, fc, ec in steps:
        box = patches.FancyBboxPatch(
            (0.25, y - 0.56), 9.5, 1.12, boxstyle="round,pad=0.08",
            facecolor=fc, edgecolor=ec, linewidth=1.6,
        )
        ax1.add_patch(box)
        ax1.text(x, y, label_txt, ha="center", va="center", fontsize=7.8, fontweight="bold", color=ec, linespacing=1.22)
    for i in range(len(steps) - 1):
        ax1.annotate(
            "", xy=(5.0, steps[i + 1][1] + 0.64), xytext=(5.0, steps[i][1] - 0.64),
            arrowprops=dict(arrowstyle="->", lw=1.7, color=SLATE),
        )
    ax1.set_title("Leakage-Free Preprocessing & Pipeline Workflow", fontweight="bold", pad=8)

    n_tr = 8759
    n_te = 2192
    test_sz = n_tr // 6
    y_labels = ["Fold 1", "Fold 2", "Fold 3", "Fold 4", "Fold 5", "Final Holdout"]
    for i in range(5):
        tr_e = (i + 1) * test_sz
        val_sz = (n_tr - tr_e) if i == 4 else test_sz
        ax2.barh(i, tr_e, left=0, height=0.55, color=BLUE, alpha=0.85, label="In-Fold Train" if i == 0 else "")
        ax2.barh(i, val_sz, left=tr_e, height=0.55, color=AMBER, alpha=0.90, label="In-Fold Validation (~1,459 d)" if i == 0 else "")
    ax2.barh(5, n_tr, left=0, height=0.55, color=NAVY, alpha=0.90, label="Full Train (1995–2018, 8,759 d)")
    ax2.barh(5, n_te, left=n_tr, height=0.55, color=CORAL, alpha=0.90, label="Holdout Test (2019–2024, 2,192 d)")
    ax2.axvline(n_tr, color=CORAL, linestyle="--", lw=1.8)
    ax2.set_yticks(range(6))
    ax2.set_yticklabels(y_labels, fontweight="bold")
    ax2.invert_yaxis()
    ax2.set_xlabel("Chronological Sample Index (Days from 8 Jan 1995 to 31 Dec 2024)")
    ax2.set_title("Expanding-Window 5-Fold TimeSeriesSplit & Holdout Design", fontweight="bold")
    ax2.grid(True, axis="x", linestyle=":", alpha=0.6)
    ax2.legend(loc="lower right", frameon=True, facecolor="white", fontsize=7.8)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_03_workflow_cv.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 4. figure_04_kmeans_diagnostics.png: K-Means Silhouette & Davies-Bouldin
    # -------------------------------------------------------------------------
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.2, 4.2))
    k_vals = unsup_res["k_range"]
    inertias = [v / 1000.0 for v in unsup_res["inertias"]]
    sils = unsup_res["silhouette_scores"]
    dbs = unsup_res["davies_bouldin_scores"]

    ax1.plot(k_vals, inertias, marker="o", lw=2.2, color=NAVY, label="WCSS Inertia (×10³)")
    ax1.set_xlabel("Number of Clusters (K)")
    ax1.set_ylabel("Within-Cluster Sum of Squares (×10³)", color=NAVY, fontweight="bold")
    ax1.set_xticks(k_vals)
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1_t = ax1.twinx()
    ax1_t.plot(k_vals, sils, marker="s", lw=2.2, linestyle="--", color=TEAL, label="Silhouette Score")
    ax1_t.set_ylabel("Mean Silhouette Coefficient", color=TEAL, fontweight="bold")
    ax1.axvline(3, color=CORAL, linestyle=":", lw=1.8, label="Selected K = 3")
    ax1.set_title("WCSS Inertia Elbow & Silhouette Profile Across K ∈ {2..6}", fontweight="bold")
    h1, l1 = ax1.get_legend_handles_labels()
    h2, l2 = ax1_t.get_legend_handles_labels()
    ax1.legend(h1 + h2, l1 + l2, loc="center right", frameon=True, facecolor="white", fontsize=8)

    ax2.plot(k_vals, dbs, marker="D", lw=2.2, color=CORAL, label="Davies–Bouldin Index (Lower is Better)")
    ax2.scatter([3], [dbs[1]], color=NAVY, s=90, zorder=5)
    ax2.annotate(
        f"Global Minimum at K = 3\n(DB = {dbs[1]:.4f}, Sil = {sils[1]:.4f})",
        xy=(3, dbs[1]), xytext=(3.4, dbs[1] + 0.08),
        arrowprops=dict(arrowstyle="->", color=NAVY, lw=1.3),
        fontsize=8.5, fontweight="bold", color=NAVY,
    )
    ax2.set_xlabel("Number of Clusters (K)")
    ax2.set_ylabel("Davies–Bouldin Index", fontweight="bold")
    ax2.set_xticks(k_vals)
    ax2.set_title("Davies–Bouldin Cluster Separation Index Across K ∈ {2..6}", fontweight="bold")
    ax2.grid(True, linestyle=":", alpha=0.6)
    ax2.legend(loc="upper left", frameon=True, facecolor="white", fontsize=8)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_04_kmeans_diagnostics.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 5. figure_05_pca_ica_projections.png: 2D PCA & FastICA projections
    # -------------------------------------------------------------------------
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.5, 4.4))
    P_tr = d_npz["P_tr"]
    S_tr = d_npz["S_tr"]
    y_tr_arr = d_npz["y_train"]
    non_ext = y_tr_arr == 0
    ext = y_tr_arr == 1

    ax1.scatter(P_tr[non_ext, 0], P_tr[non_ext, 1], c="#94A3B8", s=6, alpha=0.35, label="Non-Extreme Days (N=8,320)")
    ax1.scatter(P_tr[ext, 0], P_tr[ext, 1], c=CORAL, s=16, alpha=0.80, edgecolors="white", linewidth=0.2, label="Extreme Days ≥ 13.74 mm (N=439)")
    ax1.set_xlabel(f"PC1: Monsoon Moisture & Thermal Saturation ({unsup_res['pca_var_explained'][0]*100:.2f}%)")
    ax1.set_ylabel(f"PC2: Radiative & Wind Advection ({unsup_res['pca_var_explained'][1]*100:.2f}%)")
    ax1.set_title("2D Principal Component Projection (66.46% Combined Variance)", fontweight="bold")
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="upper left", frameon=True, facecolor="white", fontsize=8)

    ax2.scatter(S_tr[non_ext, 0], S_tr[non_ext, 1], c="#94A3B8", s=6, alpha=0.35, label="Non-Extreme Days (N=8,320)")
    ax2.scatter(S_tr[ext, 0], S_tr[ext, 1], c=PURPLE, s=16, alpha=0.80, edgecolors="white", linewidth=0.2, label="Extreme Days ≥ 13.74 mm (N=439)")
    ax2.set_xlabel("IC1: Post-2012 Calm-Wind Sentinel Regime Split (κ = −0.66)")
    ax2.set_ylabel("IC2: Super-Gaussian Antecedent Rain Pulse (κ = +18.60)")
    ax2.set_title("2D FastICA Non-Gaussian Source Projection (m = 7 Subspace)", fontweight="bold")
    ax2.grid(True, linestyle=":", alpha=0.6)
    ax2.legend(loc="upper center", frameon=True, facecolor="white", framealpha=0.92, fontsize=7.8)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_05_pca_ica_projections.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 6. figure_06_pca_scree_kmeans_radar.png: Combined PCA Scree & K-Means Radar
    # -------------------------------------------------------------------------
    fig = plt.figure(figsize=(12.0, 4.9))
    gs = GridSpec(1, 2, width_ratios=[1.18, 1.0], figure=fig, wspace=0.28)
    ax1 = fig.add_subplot(gs[0])
    comps = np.arange(1, 16)
    var_pct = np.array(unsup_res["pca_var_explained"][:15]) * 100
    cum_pct = np.array(unsup_res["pca_cum_var_explained"][:15]) * 100
    ax1.bar(comps, var_pct, color=BLUE, alpha=0.85, label="Individual Explained Variance (%)")
    ax1.plot(comps, cum_pct, color=CORAL, marker="o", lw=2.2, label="Cumulative Explained Variance (%)")
    ax1.axhline(90.0, color=TEAL, linestyle="--", lw=1.6, label="90% Retention Threshold (m=7: 91.46%)")
    ax1.axvline(7, color=TEAL, linestyle=":", lw=1.6)
    ax1.set_xticks(comps)
    ax1.set_xlabel("Principal Component Index (m)")
    ax1.set_ylabel("Explained Variance (%)")
    ax1.set_ylim(0, 105)
    ax1.set_title("PCA Eigenvalue Scree Plot & Cumulative Variance Retention", fontweight="bold")
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="center right", frameon=True, facecolor="white", fontsize=8)

    ax2 = fig.add_subplot(gs[1], polar=True)
    radar_feats = ["QV2M", "RH2M", "T2MDEW", "precip_roll7", "T2M", "ALLSKY_SFC_SW_DWN", "temp_diurnal_range", "PS"]
    radar_labels = ["QV2M", "RH2M", "T2MDEW", "Roll7 Rain", "T2M", "Shortwave", "Diurnal Range", "Pressure"]
    f_indices = [split_info["feature_names"].index(f) for f in radar_feats]
    angles = np.linspace(0, 2 * np.pi, len(radar_feats), endpoint=False).tolist()
    angles += angles[:1]
    c_colors = [BLUE, AMBER, CORAL]
    c_names = [
        "Cluster 0: Dry Winter (0.41% Ext)",
        "Cluster 1: Pre-Monsoon (0.39% Ext)",
        "Cluster 2: Active Monsoon (94.99% Share)",
    ]
    centers = np.array(unsup_res["cluster_centers_scaled"])
    for c_i in range(3):
        vals = centers[c_i, f_indices].tolist()
        vals += vals[:1]
        ax2.plot(angles, vals, color=c_colors[c_i], lw=2.0, label=c_names[c_i])
        ax2.fill(angles, vals, color=c_colors[c_i], alpha=0.12)
    ax2.set_xticks(angles[:-1])
    ax2.set_xticklabels(radar_labels, fontsize=8, fontweight="bold")
    ax2.tick_params(axis="x", pad=6)
    ax2.set_title("K-Means (K = 3) Standardized Centroid Profiles", fontweight="bold", pad=18)
    ax2.legend(
        loc="upper center", bbox_to_anchor=(0.5, -0.13),
        ncol=1, frameon=True, facecolor="white", fontsize=7.6,
    )
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_06_pca_scree_kmeans_radar.png"), dpi=300, bbox_inches="tight")
    plt.close()

    # -------------------------------------------------------------------------
    # 7. figure_07_roc_curves.png: Classifier ROC curves with random baseline
    # -------------------------------------------------------------------------
    y_te = d_npz["y_test"]
    model_specs = [
        ("Logistic Regression", d_npz["pr_lr"], d_npz["yp_lr"], CORAL, "-"),
        ("Random Forest", d_npz["pr_rf"], d_npz["yp_rf"], NAVY, "-"),
        ("Support Vector Machine (RBF)", d_npz["pr_svm"], d_npz["yp_svm"], TEAL, "--"),
        ("Decision Tree (CART)", d_npz["pr_dt"], d_npz["yp_dt"], AMBER, "-."),
        ("k-Nearest Neighbours (k=5)", d_npz["pr_knn"], d_npz["yp_knn"], PURPLE, ":"),
    ]
    fig, ax = plt.subplots(figsize=(7.2, 4.8))
    for name, pr, _, col, ls in model_specs:
        fpr, tpr, _ = roc_curve(y_te, pr)
        auc_v = roc_auc_score(y_te, pr)
        ax.plot(fpr, tpr, color=col, linestyle=ls, lw=2.2, label=f"{name} (ROC-AUC = {auc_v:.4f})")
    ax.plot([0, 1], [0, 1], color=SLATE, linestyle="--", lw=1.2, label="Random Classifier Baseline (AUC = 0.5000)")
    ax.set_xlabel("False Positive Rate (1 − Specificity)")
    ax.set_ylabel("True Positive Rate (Recall / Probability of Detection)")
    ax.set_title("Out-of-Sample Receiver Operating Characteristic Curves (2019–2024)", fontweight="bold")
    ax.grid(True, linestyle=":", alpha=0.6)
    ax.legend(loc="lower right", frameon=True, facecolor="white", fontsize=8.3)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_07_roc_curves.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 8. figure_08_pr_curves.png: Precision-Recall curves with 7.48% baseline
    # -------------------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(7.2, 4.8))
    for name, pr, _, col, ls in model_specs:
        prec, rec, _ = precision_recall_curve(y_te, pr)
        ap_v = average_precision_score(y_te, pr)
        ax.plot(rec, prec, color=col, linestyle=ls, lw=2.2, label=f"{name} (PR-AUC = {ap_v:.4f})")
    base_rate = float(y_te.mean())
    ax.axhline(base_rate, color=SLATE, linestyle="--", lw=1.4, label=f"Climatological Prevalence Baseline ({base_rate*100:.2f}%)")
    ax.set_xlabel("Recall (Probability of Detection)")
    ax.set_ylabel("Precision (Positive Predictive Value)")
    ax.set_ylim(0, 1.02)
    ax.set_title("Out-of-Sample Precision–Recall Curves on Holdout Set (2019–2024)", fontweight="bold")
    ax.grid(True, linestyle=":", alpha=0.6)
    ax.legend(loc="upper right", frameon=True, facecolor="white", fontsize=8.3)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_08_pr_curves.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 9. figure_09_confusion_matrices.png: 5-model grid with counts & row %
    # -------------------------------------------------------------------------
    perf_map = {r["Model"]: r for r in verified["test_performance"]}
    fig, axes = plt.subplots(1, 5, figsize=(14.5, 3.3))
    ordered_models = [
        ("Logistic Regression", "Logistic Regression", d_npz["yp_lr"]),
        ("Decision Tree", "Decision Tree (CART)", d_npz["yp_dt"]),
        ("Support Vector Machine", "RBF-Kernel SVM", d_npz["yp_svm"]),
        ("Random Forest", "Random Forest", d_npz["yp_rf"]),
        ("k-Nearest Neighbours", "k-Nearest Neighbours", d_npz["yp_knn"]),
    ]
    for idx, (m_key, m_disp, yp) in enumerate(ordered_models):
        ax = axes[idx]
        pm = perf_map[m_key]
        cm = confusion_matrix(y_te, yp)
        cm_pct = cm.astype(float) / cm.sum(axis=1, keepdims=True) * 100.0
        ax.imshow(cm_pct, cmap="Blues", vmin=0, vmax=100)
        title_str = f"{m_disp}\n(Rec: {pm['Recall']*100:.2f}%, F1: {pm['F1_Score']:.4f})"
        ax.set_title(title_str, fontsize=8.6, fontweight="bold")
        ax.set_xticks([0, 1])
        ax.set_yticks([0, 1])
        ax.set_xticklabels(["Pred 0", "Pred 1"], fontsize=8)
        ax.set_yticklabels(["Actual 0\n(2,028)", "Actual 1\n(164)"] if idx == 0 else ["", ""], fontsize=8)
        for r in range(2):
            for c in range(2):
                val_cnt = cm[r, c]
                val_p = cm_pct[r, c]
                lbl = [["TN", "FP"], ["FN", "TP"]][r][c]
                txt_col = "white" if val_p > 55 else NAVY
                ax.text(
                    c, r, f"{lbl}: {val_cnt}\n({val_p:.2f}%)",
                    ha="center", va="center", color=txt_col, fontsize=8.2, fontweight="bold",
                )
    plt.suptitle(
        "Holdout Confusion Matrices (2019–2024, N = 2,192 Days): Raw Counts and Row-Normalized Percentages",
        fontsize=10.5, fontweight="bold", y=1.02,
    )
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_09_confusion_matrices.png"), dpi=300, bbox_inches="tight")
    plt.close()

    # -------------------------------------------------------------------------
    # 10. figure_10_feature_attribution.png: Multi-panel feature attribution
    # -------------------------------------------------------------------------
    feat_df = pd.read_csv(os.path.join(res_dir, "feature_importances.csv")).head(10).iloc[::-1]
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(13.2, 4.4), sharey=True)
    y_pos = np.arange(len(feat_df))

    ax1.barh(y_pos, feat_df["RF_Gini_Importance"] * 100, height=0.38, label="Random Forest Gini (%)", color=NAVY)
    ax1.barh(y_pos - 0.38, feat_df["DT_Gini_Importance"] * 100, height=0.38, label="Decision Tree Gini (%)", color=AMBER, alpha=0.85)
    ax1.set_yticks(y_pos)
    ax1.set_yticklabels(feat_df["Feature"], fontweight="bold")
    ax1.set_xlabel("Impurity Importance (%)")
    ax1.set_title("Tree Gini Importance (RF vs. CART)", fontweight="bold")
    ax1.grid(True, axis="x", linestyle=":", alpha=0.6)
    ax1.legend(loc="lower right", frameon=True, facecolor="white", fontsize=7.8)

    bar_cols = [CORAL if v > 0 else BLUE for v in feat_df["LR_Coefficient"]]
    ax2.barh(y_pos, feat_df["LR_Coefficient"], height=0.55, color=bar_cols, alpha=0.88)
    ax2.axvline(0, color=SLATE, lw=1.0)
    ax2.set_xlabel("Standardized Log-Odds Weight (β)")
    ax2.set_title("Logistic Regression Standardized Coefficients", fontweight="bold")
    ax2.grid(True, axis="x", linestyle=":", alpha=0.6)

    ax3.barh(y_pos, feat_df["RF_Permutation_AUC_Drop"], height=0.55, color=TEAL, alpha=0.88)
    ax3.set_xlabel("Holdout Permutation ΔROC-AUC")
    ax3.set_title("Test-Set Permutation Importance (ΔAUC)", fontweight="bold")
    ax3.grid(True, axis="x", linestyle=":", alpha=0.6)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_10_feature_attribution.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 11. figure_11_calibration_reliability.png: Reliability curves & Brier
    # -------------------------------------------------------------------------
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.4, 4.3), gridspec_kw={"width_ratios": [1.25, 1.0]})
    ax1.plot([0, 1], [0, 1], "k--", lw=1.3, label="Perfect Calibration (Diagonal)")
    for name, pr, _, col, ls in model_specs:
        bins_cal = np.linspace(0, 1, 8)
        bin_ids = np.digitize(pr, bins_cal) - 1
        mean_p, frac_pos = [], []
        for b in range(len(bins_cal) - 1):
            m = bin_ids == b
            if m.sum() >= 8:
                mean_p.append(pr[m].mean())
                frac_pos.append(y_te[m].mean())
        brier_v = brier_score_loss(y_te, pr)
        ax1.plot(mean_p, frac_pos, marker="o", color=col, linestyle=ls, lw=2.0, label=f"{name} (Brier = {brier_v:.4f})")
    ax1.set_xlabel("Mean Predicted Extreme Rainfall Probability")
    ax1.set_ylabel("Observed Empirical Extreme Frequency")
    ax1.set_title("Probability Calibration Reliability Diagram (2019–2024)", fontweight="bold")
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="upper left", frameon=True, facecolor="white", fontsize=7.8)

    names_b = ["RBF-SVM\n(Platt)", "k-NN\n(k=5)", "Random Forest\n(Bagged)", "Decision Tree\n(CART)", "Logistic Reg.\n(Balanced)"]
    briers = [
        brier_score_loss(y_te, d_npz["pr_svm"]),
        brier_score_loss(y_te, d_npz["pr_knn"]),
        brier_score_loss(y_te, d_npz["pr_rf"]),
        brier_score_loss(y_te, d_npz["pr_dt"]),
        brier_score_loss(y_te, d_npz["pr_lr"]),
    ]
    b_cols = [TEAL, PURPLE, NAVY, AMBER, CORAL]
    bars = ax2.bar(names_b, briers, color=b_cols, alpha=0.88, width=0.52)
    for bar, v in zip(bars, briers):
        ax2.text(bar.get_x() + bar.get_width() / 2, v + 0.004, f"{v:.4f}", ha="center", va="bottom", fontsize=8.5, fontweight="bold")
    ax2.set_ylabel("Brier Calibration Loss (Lower is Better)")
    ax2.set_ylim(0, 0.195)
    ax2.set_title("Holdout Brier Score Comparison Across Classifiers", fontweight="bold")
    ax2.grid(True, axis="y", linestyle=":", alpha=0.6)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_11_calibration_reliability.png"), dpi=300)
    plt.close()

    # -------------------------------------------------------------------------
    # 12. figure_12_threshold_cost_sweep.png: RF trade-off & 15:1 cost curve
    # -------------------------------------------------------------------------
    sim_df = pd.read_csv(os.path.join(res_dir, "operational_threshold_simulation.csv"))
    rf_sub = sim_df[sim_df["Model"] == "Random Forest"].sort_values("Decision_Threshold")
    lr_sub = sim_df[sim_df["Model"] == "Logistic Regression"].sort_values("Decision_Threshold")

    t_sweep = {round(float(r["Threshold"]), 2): r for r in verified["threshold_cost_sweep"]["test_sweep"]}
    tau_cv = round(float(verified["threshold_cost_sweep"]["tau_cv_star"]), 2)
    tau_ph = round(float(verified["threshold_cost_sweep"]["tau_posthoc_star"]), 2)
    r_cv = t_sweep[tau_cv]
    r_ph = t_sweep[tau_ph]
    r_50 = t_sweep[0.50]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.8, 4.5))
    ax1.plot(rf_sub["Decision_Threshold"], rf_sub["Recall"] * 100, color=TEAL, lw=2.2, marker="o", markersize=4, label="Recall / POD (%)")
    ax1.plot(rf_sub["Decision_Threshold"], rf_sub["Precision"] * 100, color=BLUE, lw=2.2, marker="s", markersize=4, label="Precision / PPV (%)")
    ax1.plot(rf_sub["Decision_Threshold"], rf_sub["F1_Score"] * 100, color=NAVY, lw=2.2, marker="^", markersize=4, label="F1-Score (%)")
    ax1.axvline(tau_cv, color=PURPLE, linestyle="-.", lw=1.8, label=f"Leakage-Free OOF τ_CV* = {tau_cv:.2f} (Rec={r_cv['Recall']*100:.2f}%)")
    ax1.axvline(tau_ph, color=CORAL, linestyle="--", lw=1.8, label=f"Holdout Min τ* = {tau_ph:.2f} (Rec={r_ph['Recall']*100:.2f}%)")
    ax1.axvline(0.50, color=SLATE, linestyle=":", lw=1.6, label=f"Default Cutoff τ = 0.50 (Rec={r_50['Recall']*100:.2f}%)")
    ax1.set_xlabel("Decision Probability Threshold (τ)")
    ax1.set_ylabel("Performance Metric (%)")
    ax1.set_title("Random Forest Precision, Recall, and F1 Trade-Off Curve", fontweight="bold", fontsize=9.8)
    ax1.grid(True, linestyle=":", alpha=0.6)
    ax1.legend(loc="center left", frameon=True, facecolor="white", framealpha=0.92, fontsize=7.3)

    ax2.plot(rf_sub["Decision_Threshold"], rf_sub["Total_Cost_15x"], color=NAVY, lw=2.4, marker="o", markersize=4, label="Random Forest Holdout 15:1 Loss")
    ax2.plot(lr_sub["Decision_Threshold"], lr_sub["Total_Cost_15x"], color=CORAL, lw=2.0, linestyle="--", label="Logistic Regression Holdout 15:1 Loss")
    ax2.axvline(tau_cv, color=PURPLE, linestyle="-.", lw=1.8, label=f"Leakage-Free OOF τ_CV* = {tau_cv:.2f} (Loss = {r_cv['Total_Cost_15x']})")
    ax2.axvline(tau_ph, color=AMBER, linestyle="--", lw=1.8, label=f"Post-Hoc Test Min τ* = {tau_ph:.2f} (Loss = {r_ph['Total_Cost_15x']})")
    ax2.axvline(0.50, color=SLATE, linestyle=":", lw=1.6, label=f"Default Cutoff τ = 0.50 (Loss = {r_50['Total_Cost_15x']})")
    ax2.scatter(
        [tau_cv, tau_ph, 0.50],
        [r_cv["Total_Cost_15x"], r_ph["Total_Cost_15x"], r_50["Total_Cost_15x"]],
        color=[PURPLE, AMBER, SLATE], s=80, zorder=5,
    )
    ax2.set_xlabel("Decision Probability Threshold (τ)")
    ax2.set_ylabel("Asymmetric Cost Loss L(τ) = 15·FN(τ) + 1·FP(τ)")
    ax2.set_title("Asymmetric 15:1 Disaster Cost Curve (OOF vs. Holdout)", fontweight="bold", fontsize=9.8)
    ax2.grid(True, linestyle=":", alpha=0.6)
    ax2.legend(loc="upper left", frameon=True, facecolor="white", framealpha=0.92, fontsize=7.3)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_12_threshold_cost_sweep.png"), dpi=300, bbox_inches="tight")
    plt.close()

    # -------------------------------------------------------------------------
    # 13. figure_13_sept2024_case_study.png: 20-30 Sept 2024 Kathmandu flood
    # -------------------------------------------------------------------------
    sep_records = verified["september_2024_case_study"]
    d_labels = [pd.to_datetime(r["date"]).strftime("%d Sep") for r in sep_records]
    x_s = np.arange(len(d_labels))
    rain_vals = np.array([r["PRECTOTCORR"] for r in sep_records])
    rf_s24_probs = np.array([r["rf_prob_task_a"] for r in sep_records])
    lr_s24_probs = np.array([r["lr_prob_task_a"] for r in sep_records])
    lr24_s24_probs = np.array([r["lr_prob_task_b"] for r in sep_records])

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10.8, 5.8), sharex=True, gridspec_kw={"height_ratios": [1.0, 1.15]})
    b_cols = [CORAL if r >= 13.74 else BLUE for r in rain_vals]
    bars = ax1.bar(x_s, rain_vals, color=b_cols, width=0.55, alpha=0.90, label="Daily MERRA-2 Rainfall (mm/day)")
    ax1.axhline(13.74, color=CORAL, linestyle="--", lw=1.6, label="All-Day Extreme Threshold P95 = 13.74 mm/day")
    ax1.axhline(22.752, color=AMBER, linestyle="-.", lw=1.6, label="Wet-Day Threshold R95p = 22.75 mm/day")
    for bar, v in zip(bars, rain_vals):
        ax1.text(bar.get_x() + bar.get_width() / 2, v + 1.8, f"{v:.2f}", ha="center", va="bottom", fontsize=7.8, fontweight="bold")
    ax1.set_ylim(0, 108)
    ax1.set_ylabel("Rainfall (mm/day)", fontweight="bold")
    ax1.set_title("Holdout Case Study: 20–30 September 2024 Kathmandu Extreme Deluge & Classifier Warnings", fontweight="bold")
    ax1.grid(True, axis="y", linestyle=":", alpha=0.6)
    ax1.legend(loc="upper left", frameon=True, facecolor="white", fontsize=8)

    ax2.plot(x_s, lr_s24_probs, marker="s", lw=2.3, linestyle="-", color=CORAL, label="Logistic Regression (Task A Same-Day)")
    ax2.plot(x_s, rf_s24_probs, marker="o", lw=2.3, linestyle="-", color=NAVY, label="Random Forest (Task A Same-Day)")
    ax2.plot(x_s, lr24_s24_probs, marker="^", lw=1.9, linestyle="--", color=TEAL, label="Logistic Regression (Task B 24-h Lead Time)")
    ax2.axhline(tau_cv, color=AMBER, linestyle=":", lw=1.6, label=f"Cost-Calibrated OOF Cutoff (τ_CV* = {tau_cv:.2f})")
    ax2.axhline(0.50, color=SLATE, linestyle="--", lw=1.4, label="Default Cutoff (τ = 0.50)")
    ax2.axhline(0.70, color=PURPLE, linestyle="-.", lw=1.4, label="High-Priority Escalation (τ = 0.70)")
    ax2.axvspan(3.6, 8.4, color=CORAL, alpha=0.10, label="Active 5-Day Extreme Deluge Window (24–28 Sep)")
    ax2.set_xticks(x_s)
    ax2.set_xticklabels(d_labels, fontweight="bold")
    ax2.set_ylim(-0.04, 1.09)
    ax2.set_xlabel("Date (20–30 September 2024 Holdout Period)")
    ax2.set_ylabel("Predicted Extreme Probability", fontweight="bold")
    ax2.grid(True, linestyle=":", alpha=0.6)
    ax2.legend(
        loc="upper center", bbox_to_anchor=(0.5, -0.22),
        ncol=3, frameon=True, facecolor="white", fontsize=7.5,
    )
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_13_sept2024_case_study.png"), dpi=300, bbox_inches="tight")
    plt.close()

    # -------------------------------------------------------------------------
    # 14. figure_14_lead_time_wetday_sensitivity.png: Tasks A, B, and C
    # -------------------------------------------------------------------------
    sens = verified["sensitivity_tasks"]
    tasks_labels = [
        "Task A: Same-Day\nRandom Forest",
        "Task A: Same-Day\nLogistic Reg.",
        "Task B: 24-h Lead\nRandom Forest",
        "Task B: 24-h Lead\nLogistic Reg.",
        "Task B: 24-h Lead\nk-NN (k=5)",
        "Task C: Wet R95p\nRandom Forest",
        "Task C: Wet R95p\nLogistic Reg.",
    ]
    t_keys = [
        "Task_A_SameDay_RF",
        "Task_A_SameDay_LR",
        "Task_B_24hLeadTime_RF",
        "Task_B_24hLeadTime_LR",
        "Task_B_24hLeadTime_kNN",
        "Task_C_WetDayR95p_RF",
        "Task_C_WetDayR95p_LR",
    ]
    rec_vals = [sens[k]["Recall"] * 100 for k in t_keys]
    roc_vals = [sens[k]["ROC_AUC"] * 100 for k in t_keys]
    pr_vals = [sens[k]["PR_AUC"] * 100 for k in t_keys]
    f1_vals = [sens[k]["F1_Score"] * 100 for k in t_keys]

    fig, ax = plt.subplots(figsize=(12.2, 4.6))
    x_t = np.arange(len(tasks_labels))
    w_b = 0.19
    ax.bar(x_t - 1.5 * w_b, rec_vals, width=w_b, color=CORAL, label="Recall / POD (%)")
    ax.bar(x_t - 0.5 * w_b, roc_vals, width=w_b, color=NAVY, label="ROC-AUC (×100%)")
    ax.bar(x_t + 0.5 * w_b, pr_vals, width=w_b, color=TEAL, label="PR-AUC (×100%)")
    ax.bar(x_t + 1.5 * w_b, f1_vals, width=w_b, color=AMBER, label="F1-Score (×100%)")
    for i in range(len(x_t)):
        ax.text(x_t[i] - 1.5 * w_b, rec_vals[i] + 1.2, f"{rec_vals[i]:.1f}%", ha="center", fontsize=6.9, fontweight="bold")
        ax.text(x_t[i] - 0.5 * w_b, roc_vals[i] + 1.2, f"{roc_vals[i]:.1f}%", ha="center", fontsize=6.9, fontweight="bold")
        ax.text(x_t[i] + 0.5 * w_b, pr_vals[i] + 1.2, f"{pr_vals[i]:.1f}%", ha="center", fontsize=6.9, fontweight="bold")
        ax.text(x_t[i] + 1.5 * w_b, f1_vals[i] + 1.2, f"{f1_vals[i]:.1f}%", ha="center", fontsize=6.9, fontweight="bold")
    ax.set_xticks(x_t)
    ax.set_xticklabels(tasks_labels, fontweight="bold", fontsize=8.0)
    ax.set_ylim(0, 122)
    ax.set_ylabel("Metric Score (%)")
    ax.set_title("Sensitivity Comparison: Task A (Same-Day) vs. Task B (24-h Lead Time) vs. Task C (Wet-Day R95p)", fontweight="bold")
    ax.grid(True, axis="y", linestyle=":", alpha=0.6)
    ax.legend(loc="upper right", ncol=4, frameon=True, facecolor="white", fontsize=8.2)
    plt.tight_layout()
    plt.savefig(os.path.join(fig_dir, "figure_14_lead_time_wetday_sensitivity.png"), dpi=300)
    plt.close()

    print("Successfully generated all 14 figures at 300 DPI in:", fig_dir)


if __name__ == "__main__":
    generate_all_figures()
