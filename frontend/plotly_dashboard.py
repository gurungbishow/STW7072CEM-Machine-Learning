#!/usr/bin/env python3
"""
Interactive Model Performance & Early-Warning Decision-Support Dashboard Generator
MSc Machine Learning Coursework - STW7072CEM
Student: Bishow Gurung (College ID: 260005 | Coventry University ID: 17624457)
Topic: Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall
       at the Kathmandu Airport Grid Cell (1995-2024)

Generates clean, modular, and offline-capable dashboard assets:
  - frontend/index.html           : Semantic HTML5 dashboard with interactive RO1-RO3 controls
  - frontend/css/style.css        : Responsive CSS with custom properties, tabs, slider & alert badges
  - frontend/js/dashboard-data.js : Authoritative JSON-formatted data payload (RO1, RO2, RO3 + Plotly specs)
  - frontend/js/dashboard.js      : Client-side Plotly rendering, threshold simulator & multi-task switcher
  - frontend/js/plotly.min.js     : Local offline Plotly vendor bundle
"""

import os
import json
import pandas as pd

try:
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    import plotly.offline as po
    HAS_PLOTLY = True
except ImportError:
    HAS_PLOTLY = False

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS_DIR = os.path.join(BASE_DIR, "results")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
CSS_DIR = os.path.join(FRONTEND_DIR, "css")
JS_DIR = os.path.join(FRONTEND_DIR, "js")


def build_fig4_spec(top10):
    """Builds a Plotly JSON specification for RO2 Top-10 Feature Attribution & Permutation Drop."""
    features = [r["Feature"] for r in reversed(top10)]
    rf_gini = [round(r["RF_Gini_Importance"] * 100, 2) for r in reversed(top10)]
    perm_drop = [round(r["RF_Permutation_AUC_Drop"] * 100, 2) for r in reversed(top10)]
    lr_coef = [round(r["LR_Coefficient"], 3) for r in reversed(top10)]

    return {
        "data": [
            {
                "type": "bar",
                "orientation": "h",
                "name": "RF Gini Importance (%)",
                "y": features,
                "x": rf_gini,
                "xaxis": "x",
                "yaxis": "y",
                "marker": {"color": "#1E3A8A"}
            },
            {
                "type": "bar",
                "orientation": "h",
                "name": "RF Permutation ROC-AUC Drop (×100)",
                "y": features,
                "x": perm_drop,
                "xaxis": "x",
                "yaxis": "y",
                "marker": {"color": "#DC2626"}
            },
            {
                "type": "bar",
                "orientation": "h",
                "name": "LR Standardized Coefficient (β)",
                "y": features,
                "x": lr_coef,
                "xaxis": "x2",
                "yaxis": "y2",
                "marker": {
                    "color": ["#0D9488" if v >= 0 else "#D97706" for v in lr_coef]
                }
            }
        ],
        "layout": {
            "title": {
                "text": "<b>RO2 Physical Feature Attribution: RF Impurity/Permutation vs. LR Standardized Weights</b>",
                "font": {"size": 15, "color": "#0F172A"}
            },
            "barmode": "group",
            "autosize": True,
            "height": 460,
            "margin": {"l": 150, "r": 40, "t": 75, "b": 55},
            "grid": {"rows": 1, "columns": 2, "pattern": "independent"},
            "xaxis": {
                "domain": [0, 0.46],
                "title": "RF Importance / AUC Drop (%)",
                "gridcolor": "#E2E8F0"
            },
            "yaxis": {
                "anchor": "x",
                "gridcolor": "#F1F5F9",
                "tickfont": {"size": 12}
            },
            "xaxis2": {
                "domain": [0.54, 1.0],
                "title": "LR Standardized Log-Odds Weight (β)",
                "gridcolor": "#E2E8F0",
                "zeroline": True,
                "zerolinecolor": "#94A3B8",
                "zerolinewidth": 1.5
            },
            "yaxis2": {
                "anchor": "x2",
                "matches": "y",
                "showticklabels": False,
                "gridcolor": "#F1F5F9"
            },
            "legend": {
                "orientation": "h",
                "yanchor": "bottom",
                "y": 1.02,
                "xanchor": "center",
                "x": 0.5,
                "font": {"size": 11}
            },
            "plot_bgcolor": "#F8FAFC",
            "paper_bgcolor": "#FFFFFF"
        }
    }


def generate_dashboard():
    """Generates and syncs clean, modular dashboard assets from results/."""
    os.makedirs(CSS_DIR, exist_ok=True)
    os.makedirs(JS_DIR, exist_ok=True)

    # 1. Load verified metrics and operational simulation
    metrics_path = os.path.join(RESULTS_DIR, "verified_metrics.json")
    with open(metrics_path, "r", encoding="utf-8") as f:
        vm = json.load(f)

    perf = vm["test_performance"]
    sweep = vm["threshold_cost_sweep"]
    tau_cv = sweep["tau_cv_star"]
    sep_study = vm["september_2024_case_study"]
    unsupervised = vm.get("unsupervised", {})
    sensitivity_tasks = vm.get("sensitivity_tasks", {})
    top10_features = vm.get("top10_feature_attribution", [])
    pca7_ablation = vm.get("pca7_ablation", {})
    mcnemar_tests = vm.get("mcnemar_tests", [])

    sim_csv = os.path.join(RESULTS_DIR, "operational_threshold_simulation.csv")
    rf_data = []
    lr_data = []
    svm_data = []
    if os.path.exists(sim_csv):
        sim_df = pd.read_csv(sim_csv)
        cols = [
            "Decision_Threshold", "Accuracy", "Precision", "Recall",
            "F1_Score", "Specificity", "False_Alarm_Ratio",
            "TP", "FP", "FN", "TN", "Total_Cost_15x", "Total_Cost_5x"
        ]
        rf_sim = sim_df[sim_df["Model"] == "Random Forest"].sort_values("Decision_Threshold")
        lr_sim = sim_df[sim_df["Model"] == "Logistic Regression"].sort_values("Decision_Threshold")
        svm_sim = sim_df[sim_df["Model"] == "Support Vector Machine"].sort_values("Decision_Threshold")
        rf_data = rf_sim[cols].to_dict(orient="records")
        lr_data = lr_sim[cols].to_dict(orient="records")
        svm_data = svm_sim[cols].to_dict(orient="records")

    summary_payload = {
        "archive_days": 10958,
        "p95_threshold": 13.74,
        "r95p_threshold": 22.75,
        "train_extremes": 439,
        "test_extremes": 164,
        "best_balanced_model": "Random Forest",
        "rf_f1": 0.4385,
        "rf_recall": 90.24,
        "rf_pr_auc": 0.5517,
        "max_sensitivity_model": "Logistic Regression",
        "lr_recall": 96.34,
        "lr_roc_auc": 0.9411,
        "tau_cv": tau_cv,
        "optimal_k": unsupervised.get("optimal_k", 3),
        "silhouette_k3": round(unsupervised.get("silhouette_scores", [0, 0.3119])[1], 4),
        "db_k3": round(unsupervised.get("davies_bouldin_scores", [0, 1.1327])[1], 4),
        "monsoon_extreme_share": 94.99
    }

    fig4_spec = build_fig4_spec(top10_features)

    data_js_path = os.path.join(JS_DIR, "dashboard-data.js")
    if not HAS_PLOTLY and os.path.exists(data_js_path):
        raw_js = open(data_js_path, "r", encoding="utf-8").read()
        json_part = raw_js.split("window.DASHBOARD_DATA = ", 1)[1].rstrip().rstrip(";")
        existing_payload = json.loads(json_part)
        existing_payload["summary"] = summary_payload
        existing_payload["performance"] = perf
        existing_payload["sensitivity_tasks"] = sensitivity_tasks
        existing_payload["pca7_ablation"] = pca7_ablation
        existing_payload["unsupervised"] = {
            "optimal_k": unsupervised.get("optimal_k", 3),
            "k_range": unsupervised.get("k_range", []),
            "silhouette_scores": unsupervised.get("silhouette_scores", []),
            "davies_bouldin_scores": unsupervised.get("davies_bouldin_scores", []),
            "pca_cum_var_7": 0.9146316387592532,
            "cluster_profiles": unsupervised.get("cluster_profiles", []),
            "cluster_centers_unscaled": unsupervised.get("cluster_centers_unscaled", {})
        }
        existing_payload["top10_features"] = top10_features
        existing_payload["mcnemar_tests"] = mcnemar_tests
        existing_payload["cost_sweep"] = {
            "tau_cv": tau_cv,
            "rf": rf_data,
            "lr": lr_data,
            "svm": svm_data
        }
        existing_payload["case_study"] = sep_study
        existing_payload["fig4"] = fig4_spec
        with open(data_js_path, "w", encoding="utf-8") as f:
            f.write("/**\n * Kathmandu Airport Extreme Rainfall ML Early-Warning System\n")
            f.write(" * Authoritative Verified Metrics & Pre-compiled Plotly Figure Specs\n */\n\n")
            f.write("window.DASHBOARD_DATA = ")
            json.dump(existing_payload, f, indent=2)
            f.write(";\n")
        print("FRONTEND DASHBOARD ASSETS SYNCHRONIZED SUCCESSFULLY (Offline Mode)")
        return

    # Figure 1: Out-of-Sample Performance Benchmarks
    models = [r["Model"] for r in perf]
    f1s = [round(r["F1_Score"] * 100, 2) for r in perf]
    recs = [round(r["Recall"] * 100, 2) for r in perf]
    precs = [round(r["Precision"] * 100, 2) for r in perf]
    rocs = [round(r["ROC_AUC"] * 100, 2) for r in perf]
    prs = [round(r["PR_AUC"] * 100, 2) for r in perf]

    fig1 = go.Figure()
    fig1.add_trace(go.Bar(name="F1-Score (%)", x=models, y=f1s, marker_color="#1E3A8A"))
    fig1.add_trace(go.Bar(name="Recall / POD (%)", x=models, y=recs, marker_color="#DC2626"))
    fig1.add_trace(go.Bar(name="Precision (%)", x=models, y=precs, marker_color="#2563EB"))
    fig1.add_trace(go.Bar(name="ROC-AUC (×100%)", x=models, y=rocs, marker_color="#0D9488"))
    fig1.add_trace(go.Bar(name="PR-AUC (×100%)", x=models, y=prs, marker_color="#D97706"))
    fig1.update_layout(
        title=dict(text="<b>Out-of-Sample Classifier Performance Benchmarks (2019–2024 Holdout, N = 2,192 Days)</b>", font=dict(size=16, color="#0F172A")),
        barmode="group",
        autosize=True,
        height=480,
        margin=dict(l=60, r=40, t=70, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="center", x=0.5, font=dict(size=12)),
        plot_bgcolor="#F8FAFC",
        paper_bgcolor="#FFFFFF",
        yaxis=dict(title="Metric Score (%)", gridcolor="#E2E8F0"),
        xaxis=dict(gridcolor="#F1F5F9", tickfont=dict(size=13, weight="bold"))
    )

    # Figure 2: Asymmetric 15:1 Cost Trade-Off Analysis
    fig2 = make_subplots(rows=1, cols=2, subplot_titles=("Random Forest Metric Trade-Off", "Asymmetric 15:1 Disaster Loss L(τ)"))
    if rf_data:
        rf_df = pd.DataFrame(rf_data)
        fig2.add_trace(go.Scatter(x=rf_df["Decision_Threshold"], y=rf_df["Recall"]*100, name="Recall (%)", line=dict(color="#DC2626", width=2.5)), row=1, col=1)
        fig2.add_trace(go.Scatter(x=rf_df["Decision_Threshold"], y=rf_df["Precision"]*100, name="Precision (%)", line=dict(color="#2563EB", width=2.5)), row=1, col=1)
        fig2.add_trace(go.Scatter(x=rf_df["Decision_Threshold"], y=rf_df["F1_Score"]*100, name="F1-Score (%)", line=dict(color="#1E3A8A", width=2.5)), row=1, col=1)
        fig2.add_vline(x=tau_cv, line=dict(color="#7C3AED", dash="dash", width=2), annotation_text=f"OOF τ*={tau_cv:.2f}", row=1, col=1)
        fig2.add_trace(go.Scatter(x=rf_df["Decision_Threshold"], y=rf_df["Total_Cost_15x"], name="RF 15:1 Cost", line=dict(color="#1E3A8A", width=2.5)), row=1, col=2)
    if lr_data:
        lr_df = pd.DataFrame(lr_data)
        fig2.add_trace(go.Scatter(x=lr_df["Decision_Threshold"], y=lr_df["Total_Cost_15x"], name="LR 15:1 Cost", line=dict(color="#DC2626", dash="dot", width=2)), row=1, col=2)
        fig2.add_vline(x=tau_cv, line=dict(color="#7C3AED", dash="dash", width=2), annotation_text=f"OOF τ*={tau_cv:.2f}", row=1, col=2)

    fig2.update_layout(
        title=dict(text="<b>Operational Asymmetric Cost-Sensitive Threshold Sweep (15:1 Missed Flood Penalty)</b>", font=dict(size=16, color="#0F172A")),
        autosize=True,
        height=480,
        margin=dict(l=60, r=60, t=80, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="center", x=0.5, font=dict(size=11)),
        plot_bgcolor="#F8FAFC",
        paper_bgcolor="#FFFFFF"
    )
    fig2.update_xaxes(title_text="Decision Threshold (τ)", gridcolor="#E2E8F0")
    fig2.update_yaxes(title_text="Metric Score (%)", gridcolor="#E2E8F0", row=1, col=1)
    fig2.update_yaxes(title_text="Total Loss L(τ)", gridcolor="#E2E8F0", row=1, col=2)

    # Figure 3: September 2024 Flood Case Study
    sep_dates = [r["date"] for r in sep_study]
    sep_rain = [r["PRECTOTCORR"] for r in sep_study]
    sep_rf_p = [r["rf_prob_task_a"] for r in sep_study]
    sep_lr_p = [r["lr_prob_task_a"] for r in sep_study]
    sep_lr_24 = [r["lr_prob_task_b"] for r in sep_study]

    fig3 = make_subplots(rows=2, cols=1, shared_xaxes=True, vertical_spacing=0.10,
                         subplot_titles=("MERRA-2 Daily Rainfall (mm/day)", "Classifier Extreme Probability Warnings"))
    fig3.add_trace(go.Bar(x=sep_dates, y=sep_rain, name="Observed Rainfall (mm)", marker_color=["#DC2626" if r >= 13.74 else "#3B82F6" for r in sep_rain]), row=1, col=1)
    fig3.add_hline(y=13.74, line=dict(color="#DC2626", dash="dash", width=1.5), annotation_text="P95 = 13.74 mm", row=1, col=1)

    fig3.add_trace(go.Scatter(x=sep_dates, y=sep_lr_p, name="Logistic Regression (Same-Day)", line=dict(color="#DC2626", width=2.5)), row=2, col=1)
    fig3.add_trace(go.Scatter(x=sep_dates, y=sep_rf_p, name="Random Forest (Same-Day)", line=dict(color="#1E3A8A", width=2.5)), row=2, col=1)
    fig3.add_trace(go.Scatter(x=sep_dates, y=sep_lr_24, name="Logistic Regression (24-h Lead)", line=dict(color="#0D9488", dash="dash", width=2)), row=2, col=1)
    fig3.add_hline(y=tau_cv, line=dict(color="#7C3AED", dash="dot", width=1.5), annotation_text=f"OOF τ* = {tau_cv:.2f}", row=2, col=1)

    fig3.update_layout(
        title=dict(text="<b>Real-World Operational Case Study: 20–30 September 2024 Kathmandu Extreme Flood Event</b>", font=dict(size=16, color="#0F172A")),
        autosize=True,
        height=540,
        margin=dict(l=60, r=60, t=80, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="center", x=0.5, font=dict(size=11)),
        plot_bgcolor="#F8FAFC",
        paper_bgcolor="#FFFFFF"
    )
    fig3.update_yaxes(title_text="Rainfall (mm/day)", gridcolor="#E2E8F0", row=1, col=1)
    fig3.update_yaxes(title_text="Alarm Probability P(Y=1)", range=[0, 1.05], gridcolor="#E2E8F0", row=2, col=1)
    fig3.update_xaxes(title_text="Observation Date (September 2024)", gridcolor="#E2E8F0", row=2, col=1)

    # 3. Assemble Unified Dashboard Data Payload
    dashboard_data = {
        "summary": summary_payload,
        "performance": perf,
        "sensitivity_tasks": sensitivity_tasks,
        "pca7_ablation": pca7_ablation,
        "unsupervised": {
            "optimal_k": unsupervised.get("optimal_k", 3),
            "k_range": unsupervised.get("k_range", []),
            "silhouette_scores": unsupervised.get("silhouette_scores", []),
            "davies_bouldin_scores": unsupervised.get("davies_bouldin_scores", []),
            "pca_cum_var_7": 0.9146316387592532,
            "cluster_profiles": unsupervised.get("cluster_profiles", []),
            "cluster_centers_unscaled": unsupervised.get("cluster_centers_unscaled", {})
        },
        "top10_features": top10_features,
        "mcnemar_tests": mcnemar_tests,
        "cost_sweep": {
            "tau_cv": tau_cv,
            "rf": rf_data,
            "lr": lr_data,
            "svm": svm_data
        },
        "case_study": sep_study,
        "fig1": json.loads(fig1.to_json()),
        "fig2": json.loads(fig2.to_json()),
        "fig3": json.loads(fig3.to_json()),
        "fig4": fig4_spec
    }

    with open(data_js_path, "w", encoding="utf-8") as f:
        f.write("/**\n")
        f.write(" * Kathmandu Airport Extreme Rainfall ML Early-Warning System\n")
        f.write(" * Authoritative Verified Metrics & Pre-compiled Plotly Figure Specs\n")
        f.write(" * Auto-generated from results/verified_metrics.json & results/operational_threshold_simulation.csv\n")
        f.write(" */\n\n")
        f.write("window.DASHBOARD_DATA = ")
        json.dump(dashboard_data, f, indent=2)
        f.write(";\n")

    plotly_js_path = os.path.join(JS_DIR, "plotly.min.js")
    if not os.path.exists(plotly_js_path):
        plotly_bundle = po.get_plotlyjs()
        with open(plotly_js_path, "w", encoding="utf-8") as f:
            f.write(plotly_bundle)

    index_html_path = os.path.join(FRONTEND_DIR, "index.html")
    css_path = os.path.join(CSS_DIR, "style.css")
    js_app_path = os.path.join(JS_DIR, "dashboard.js")

    print("=" * 84)
    print("FRONTEND DASHBOARD ASSETS SYNCHRONIZED SUCCESSFULLY")
    print("=" * 84)
    print(f"  [HTML] {index_html_path} ({round(os.path.getsize(index_html_path)/1024, 2)} KB)")
    print(f"  [CSS ] {css_path} ({round(os.path.getsize(css_path)/1024, 2)} KB)")
    print(f"  [DATA] {data_js_path} ({round(os.path.getsize(data_js_path)/1024, 2)} KB)")
    print(f"  [JS  ] {js_app_path} ({round(os.path.getsize(js_app_path)/1024, 2)} KB)")
    print(f"  [OFFL] {plotly_js_path} ({round(os.path.getsize(plotly_js_path)/1024/1024, 2)} MB vendor bundle)")
    print("=" * 84)


if __name__ == "__main__":
    generate_dashboard()
