/**
 * Kathmandu Airport Extreme Rainfall ML Early-Warning System
 * Dashboard Client-Side Logic, Interactive Simulators & Plotly Visualizations
 *
 * Reads verified metrics from window.DASHBOARD_DATA (RO1, RO2, RO3),
 * populates KPI cards, interactive Multi-Task Benchmark Switcher (Tasks A, B, C & PCA Ablation),
 * interactive Cost-Sensitive Decision-Threshold & Three-Tier Early-Warning Simulator,
 * Unsupervised Weather Regime & Feature Attribution Explorer, and September 2024 Flood Case Study.
 */

let CURRENT_TASK = "task_a";
let CURRENT_SIM_MODEL = "rf";
let CURRENT_SIM_TAU = 0.30;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboard);
} else {
    initDashboard();
}

/**
 * Initializes the full interactive dashboard.
 */
function initDashboard() {
    console.log("[Dashboard] Initializing Kathmandu Extreme Rainfall Decision-Support Dashboard...");

    if (!window.DASHBOARD_DATA) {
        console.error("[Dashboard] Error: window.DASHBOARD_DATA is undefined. Ensure js/dashboard-data.js is loaded.");
        showDataLoadError();
        return;
    }

    const data = window.DASHBOARD_DATA;

    try {
        // 1. Populate KPI Cards
        if (data.summary) {
            populateKpiCards(data.summary);
        }

        // 2. Bind Interactive Task Tabs (Task A, Task B, Task C, PCA Ablation)
        initTaskTabs(data);

        // 3. Bind Interactive Cost-Sensitive Threshold Simulator
        initThresholdSimulator(data);

        // 4. Populate September 2024 Case Study Daily Timeline Table
        if (data.case_study) {
            populateCaseStudyTable(data.case_study);
        }

        // 5. Render Plotly Interactive Visualizations
        if (typeof Plotly === "undefined") {
            console.error("[Dashboard] Plotly is undefined. Verify that js/plotly.min.js is present in the js/ folder.");
            showPlotlyError();
            return;
        }

        renderTaskView(data, CURRENT_TASK);
        renderCostTradeoffChart(data, CURRENT_SIM_TAU);
        renderFeatureAttributionChart(data);
        renderCaseStudyChart(data);

        // 6. Listen for Window Resize for Responsive Re-plot
        window.addEventListener("resize", handleWindowResize);

        console.log("[Dashboard] All 4 Plotly charts and interactive RO1–RO3 modules initialized successfully.");
    } catch (err) {
        console.error("[Dashboard] Runtime exception during initialization:", err);
    }
}

/**
 * Populates Summary KPI Cards at the top of the dashboard.
 */
function populateKpiCards(summary) {
    const cardsContainer = document.getElementById("kpi-cards-grid");
    if (!cardsContainer) return;

    const sil = summary.silhouette_k3 || 0.3119;
    const monsoonShare = summary.monsoon_extreme_share || 94.99;

    cardsContainer.innerHTML = `
        <div class="card">
            <h3>Archive Coverage (1995–2024)</h3>
            <div class="val">${summary.archive_days.toLocaleString()} Days</div>
            <div class="subtext">8,766 Train (1995–2018) / 2,192 Test (2019–2024)</div>
        </div>
        <div class="card">
            <h3>Training Extreme Threshold</h3>
            <div class="val">P<sub>95</sub> = ${summary.p95_threshold.toFixed(2)} mm</div>
            <div class="subtext">${summary.train_extremes} Train / ${summary.test_extremes} Test Extremes (5.01% / 7.48%)</div>
        </div>
        <div class="card">
            <h3>RO1 Synoptic Regimes (K=3)</h3>
            <div class="val">${monsoonShare.toFixed(2)}% Monsoon</div>
            <div class="subtext">417/439 Train Extremes in Cluster 2 (Sil = ${sil.toFixed(4)})</div>
        </div>
        <div class="card">
            <h3>Best Balanced Classifier (RF)</h3>
            <div class="val">F1 = ${summary.rf_f1.toFixed(4)}</div>
            <div class="subtext">PR-AUC = ${summary.rf_pr_auc.toFixed(4)} | Recall = ${summary.rf_recall.toFixed(2)}%</div>
        </div>
        <div class="card">
            <h3>Maximum Sensitivity (LR)</h3>
            <div class="val">Recall = ${summary.lr_recall.toFixed(2)}%</div>
            <div class="subtext">158/164 Storms Detected (ROC-AUC = ${summary.lr_roc_auc.toFixed(4)})</div>
        </div>
        <div class="card">
            <h3>Cost-Calibrated Cutoff</h3>
            <div class="val">&tau;*<sub>CV</sub> = ${summary.tau_cv.toFixed(2)}</div>
            <div class="subtext">OOF 15:1 Loss Minimized (RF Rec = 98.17%)</div>
        </div>
    `;
}

/**
 * Initializes the 4 Multi-Task Benchmark Switcher tabs.
 */
function initTaskTabs(data) {
    const tabs = document.querySelectorAll(".task-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            CURRENT_TASK = tab.getAttribute("data-task") || "task_a";
            renderTaskView(data, CURRENT_TASK);
        });
    });
}

/**
 * Returns the normalized rows and metadata for the selected benchmark task.
 */
function getTaskDataset(data, taskKey) {
    const st = data.sensitivity_tasks || {};
    const pca = data.pca7_ablation || {};

    if (taskKey === "task_b") {
        const rows = [];
        if (st.Task_B_24hLeadTime_LR) {
            rows.push(Object.assign({ Model: "Logistic Regression (24-h Lead)" }, st.Task_B_24hLeadTime_LR));
        }
        if (st.Task_B_24hLeadTime_RF) {
            rows.push(Object.assign({ Model: "Random Forest (24-h Lead)" }, st.Task_B_24hLeadTime_RF));
        }
        if (st.Task_B_24hLeadTime_kNN) {
            rows.push(Object.assign({ Model: "k-Nearest Neighbours (24-h Lead)" }, st.Task_B_24hLeadTime_kNN));
        }
        return {
            heading: "Holdout Evaluation Matrix — Task B: Strict 24-Hour Advance Forecasting (x<sub>t&minus;1</sub> &rarr; y<sub>t</sub>)",
            banner: "<strong>Task B (Strict 24-Hour Advance Forecasting, x<sub>t&minus;1</sub> &rarr; y<sub>t</sub>):</strong> Predicts next-day extreme rainfall (y<sub>t</sub> &ge; 13.74 mm) using only previous-day atmospheric states (x<sub>t&minus;1</sub>). Random Forest achieves the highest 24-hour advance F1-score (0.4097, Recall = 87.80%, ROC-AUC = 0.9135), while Logistic Regression detects 92.68% of next-day storms (152/164, ROC-AUC = 0.9088).",
            chartTitle: "<b>Task B: Strict 24-Hour Advance Forecasting Benchmarks (2019–2024 Holdout, N = 2,192 Days)</b>",
            rows: rows
        };
    }

    if (taskKey === "task_c") {
        const rows = [];
        if (st.Task_C_WetDayR95p_LR) {
            rows.push(Object.assign({ Model: "Logistic Regression (Wet-Day R95p)" }, st.Task_C_WetDayR95p_LR));
        }
        if (st.Task_C_WetDayR95p_RF) {
            rows.push(Object.assign({ Model: "Random Forest (Wet-Day R95p)" }, st.Task_C_WetDayR95p_RF));
        }
        return {
            heading: "Holdout Evaluation Matrix — Task C: Severe Wet-Day Deluge Classification (R95p = 22.75 mm/day)",
            banner: "<strong>Task C (WMO ETCCDI Wet-Day 95th Percentile R95p = 22.75 mm/day, 2.92% Test Prevalence):</strong> Evaluates structural robustness under severe deluge scarcity (64 test events). Logistic Regression captures 62/64 extreme deluges (Recall = 96.88%, ROC-AUC = 0.9461), while Random Forest captures 57/64 deluges (Recall = 89.06%, F1 = 0.2436).",
            chartTitle: "<b>Task C: Severe Wet-Day Deluge Classification (R95p = 22.75 mm/day, 64 Test Deluges)</b>",
            rows: rows
        };
    }

    if (taskKey === "pca_ablation") {
        const rows = [];
        if (pca.LR_Full22) rows.push(Object.assign({}, pca.LR_Full22, { Model: "Logistic Regression (Full 22-Feature)" }));
        if (pca.LR_PCA7) rows.push(Object.assign({}, pca.LR_PCA7, { Model: "Logistic Regression (7-PCA, 91.46% Var)" }));
        if (pca.kNN_Full22) rows.push(Object.assign({}, pca.kNN_Full22, { Model: "k-NN (Full 22-Feature)" }));
        if (pca.kNN_PCA7) rows.push(Object.assign({}, pca.kNN_PCA7, { Model: "k-NN (7-PCA, 91.46% Var)" }));
        return {
            heading: "RO2 Subspace Ablation — Full 22-Feature Space vs. 7-Component PCA (91.46% Variance)",
            banner: "<strong>RO2 Subspace Ablation (Full 22-D Physical Space vs. m = 7 Orthogonal Principal Components):</strong> Compressing the 22 predictors into 7 PCA axes (retaining 91.46% variance) reduces Logistic Regression Recall from 96.34% to 93.29% (&Delta;F1 = &minus;0.0177) and k-NN Recall from 28.66% to 24.39%, confirming that the discarded 8.54% trailing variance encodes sharp non-Gaussian moisture-convergence spikes critical for tail-event detection.",
            chartTitle: "<b>RO2 Subspace Ablation: Full 22-Feature Physical Space vs. 7-Component PCA Subspace</b>",
            rows: rows
        };
    }

    // Default: Task A
    return {
        heading: "Holdout Model Evaluation Matrix — Task A: Same-Day Classification (P<sub>95</sub> = 13.74 mm/day)",
        banner: "<strong>Task A (Same-Day Atmospheric State Classification, &tau; = 0.50):</strong> Evaluates all five supervised classifiers on the 2,192-day holdout test period (2019–2024, 164 extreme events &ge; 13.74 mm/day). Random Forest achieves the highest balanced F1-score (0.4385) and PR-AUC (0.5517), while Logistic Regression achieves the highest Recall (96.34%, 158/164 storms) and ROC-AUC (0.9411). Exact McNemar tests confirm both models significantly outperform k-NN on extreme days (p &lt; 10<sup>&minus;30</sup>).",
        chartTitle: "<b>Task A: Out-of-Sample Classifier Performance Benchmarks (2019–2024 Holdout, N = 2,192 Days)</b>",
        rows: data.performance || []
    };
}

/**
 * Renders the evaluation table and benchmark chart for the selected task.
 */
function renderTaskView(data, taskKey) {
    const taskObj = getTaskDataset(data, taskKey);
    const headingEl = document.getElementById("table-section-heading-text");
    const bannerEl = document.getElementById("task-context-banner");
    if (headingEl) headingEl.innerHTML = taskObj.heading;
    if (bannerEl) bannerEl.innerHTML = taskObj.banner;

    populatePerformanceTable(taskObj.rows);
    if (typeof Plotly !== "undefined") {
        renderModelComparisonChart(data, taskObj, taskKey);
    }
}

/**
 * Populates the Holdout Model Evaluation Matrix Table.
 */
function populatePerformanceTable(rows) {
    const tbody = document.getElementById("metrics-table-body");
    if (!tbody || !rows || rows.length === 0) return;

    const maxF1 = Math.max(...rows.map(r => r.F1_Score || 0));
    const maxRec = Math.max(...rows.map(r => r.Recall || 0));

    tbody.innerHTML = rows.map(r => {
        const isBestF1 = Math.abs((r.F1_Score || 0) - maxF1) < 1e-6;
        const isBestRecall = Math.abs((r.Recall || 0) - maxRec) < 1e-6;

        const f1Badge = isBestF1
            ? `<span class="badge badge-green">${r.F1_Score.toFixed(4)} (Best)</span>`
            : r.F1_Score.toFixed(4);
        const recallBadge = isBestRecall
            ? `<span class="badge badge-red">${(r.Recall * 100).toFixed(2)}% (Max)</span>`
            : `<b>${(r.Recall * 100).toFixed(2)}%</b>`;

        const ciOrMacro = r.F1_CI_95_Block7 || r.F1_CI_95 || (r.F1_Macro ? `Macro-F1: ${r.F1_Macro.toFixed(4)}` : "—");

        return `
            <tr>
                <td class="model-name">${escapeHtml(r.Model)}</td>
                <td>${(r.Accuracy * 100).toFixed(2)}%</td>
                <td>${(r.Precision * 100).toFixed(2)}%</td>
                <td>${recallBadge}</td>
                <td>${f1Badge}</td>
                <td class="ci-cell">${escapeHtml(ciOrMacro)}</td>
                <td>${r.ROC_AUC.toFixed(4)}</td>
                <td>${r.PR_AUC.toFixed(4)}</td>
                <td>${r.Brier_Score.toFixed(4)}</td>
                <td class="matrix-cell">TN=${r.TN}, FP=${r.FP}, FN=${r.FN}, TP=${r.TP}</td>
            </tr>
        `;
    }).join("");
}

/**
 * Chart 1: Out-of-Sample Classifier Performance Benchmarks (Grouped Bar Chart)
 */
function renderModelComparisonChart(data, taskObj, taskKey) {
    const el = document.getElementById("chart-model-comparison");
    if (!el) return;

    const config = { responsive: true, displayModeBar: true, displaylogo: false };

    if (taskKey === "task_a" && data.fig1 && data.fig1.data && data.fig1.layout) {
        const layout = Object.assign({}, data.fig1.layout, {
            autosize: true,
            plot_bgcolor: "#F8FAFC",
            paper_bgcolor: "#FFFFFF"
        });
        Plotly.react(el, data.fig1.data, layout, config);
        return;
    }

    const perf = (taskObj && taskObj.rows) || data.performance || [];
    const models = perf.map(r => r.Model);
    const f1s = perf.map(r => Number((r.F1_Score * 100).toFixed(2)));
    const recs = perf.map(r => Number((r.Recall * 100).toFixed(2)));
    const precs = perf.map(r => Number((r.Precision * 100).toFixed(2)));
    const rocs = perf.map(r => Number((r.ROC_AUC * 100).toFixed(2)));
    const prs = perf.map(r => Number((r.PR_AUC * 100).toFixed(2)));

    const traces = [
        { name: "F1-Score (%)", x: models, y: f1s, type: "bar", marker: { color: "#1E3A8A" } },
        { name: "Recall / POD (%)", x: models, y: recs, type: "bar", marker: { color: "#DC2626" } },
        { name: "Precision (%)", x: models, y: precs, type: "bar", marker: { color: "#2563EB" } },
        { name: "ROC-AUC (×100%)", x: models, y: rocs, type: "bar", marker: { color: "#0D9488" } },
        { name: "PR-AUC (×100%)", x: models, y: prs, type: "bar", marker: { color: "#D97706" } }
    ];

    const layout = {
        title: {
            text: (taskObj && taskObj.chartTitle) || "<b>Out-of-Sample Classifier Performance Benchmarks</b>",
            font: { size: 15, color: "#0F172A" }
        },
        barmode: "group",
        autosize: true,
        height: 460,
        margin: { l: 60, r: 40, t: 70, b: 65 },
        legend: { orientation: "h", yanchor: "bottom", y: 1.02, xanchor: "center", x: 0.5, font: { size: 12 } },
        plot_bgcolor: "#F8FAFC",
        paper_bgcolor: "#FFFFFF",
        yaxis: { title: "Metric Score (%)", gridcolor: "#E2E8F0", range: [0, 105] },
        xaxis: { gridcolor: "#F1F5F9", tickfont: { size: 12.5 } }
    };

    Plotly.react(el, traces, layout, config);
}

/**
 * Initializes the Interactive Cost-Sensitive Decision-Threshold Simulator.
 */
function initThresholdSimulator(data) {
    const modelSelect = document.getElementById("sim-model-select");
    const slider = document.getElementById("sim-threshold-slider");
    const presets = document.querySelectorAll(".preset-btn");

    if (!modelSelect || !slider) return;

    modelSelect.addEventListener("change", () => {
        CURRENT_SIM_MODEL = modelSelect.value;
        updateSimulatorReadout(data, CURRENT_SIM_MODEL, CURRENT_SIM_TAU);
    });

    slider.addEventListener("input", () => {
        CURRENT_SIM_TAU = parseFloat(slider.value);
        syncPresetButtons(CURRENT_SIM_TAU);
        updateSimulatorReadout(data, CURRENT_SIM_MODEL, CURRENT_SIM_TAU);
    });

    presets.forEach(btn => {
        btn.addEventListener("click", () => {
            const tau = parseFloat(btn.getAttribute("data-tau"));
            CURRENT_SIM_TAU = tau;
            slider.value = String(tau);
            syncPresetButtons(tau);
            updateSimulatorReadout(data, CURRENT_SIM_MODEL, CURRENT_SIM_TAU);
        });
    });

    updateSimulatorReadout(data, CURRENT_SIM_MODEL, CURRENT_SIM_TAU);
}

function syncPresetButtons(tau) {
    document.querySelectorAll(".preset-btn").forEach(btn => {
        const bTau = parseFloat(btn.getAttribute("data-tau"));
        if (Math.abs(bTau - tau) < 0.005) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

/**
 * Updates the live threshold simulator readout cards, Three-Tier banner, and chart marker.
 */
function updateSimulatorReadout(data, modelKey, tau) {
    const disp = document.getElementById("sim-threshold-display");
    if (disp) disp.textContent = tau.toFixed(3);

    const sweep = (data && data.cost_sweep) || {};
    const series = sweep[modelKey] || sweep.rf || [];
    if (!series.length) return;

    // Find closest threshold record
    let closest = series[0];
    let minDiff = Math.abs(series[0].Decision_Threshold - tau);
    for (let i = 1; i < series.length; i++) {
        const diff = Math.abs(series[i].Decision_Threshold - tau);
        if (diff < minDiff) {
            minDiff = diff;
            closest = series[i];
        }
    }

    const recPct = ((closest.Recall || 0) * 100).toFixed(2);
    const precPct = ((closest.Precision || 0) * 100).toFixed(2);
    const f1Val = (closest.F1_Score || 0).toFixed(4);
    const farPct = closest.False_Alarm_Ratio !== undefined
        ? (closest.False_Alarm_Ratio * 100).toFixed(2)
        : (100 - (closest.Precision || 0) * 100).toFixed(2);
    const specPct = closest.Specificity !== undefined
        ? (closest.Specificity * 100).toFixed(2)
        : "—";
    const cost15 = closest.Total_Cost_15x !== undefined ? closest.Total_Cost_15x : "—";
    const cost5 = closest.Total_Cost_5x !== undefined ? closest.Total_Cost_5x : "—";

    const tp = closest.TP !== undefined ? closest.TP : Math.round((closest.Recall || 0) * 164);
    const fn = closest.FN !== undefined ? closest.FN : (164 - tp);
    const fp = closest.FP !== undefined ? closest.FP : "—";
    const tn = closest.TN !== undefined ? closest.TN : "—";

    const elRec = document.getElementById("sim-val-recall");
    const elSubRec = document.getElementById("sim-sub-recall");
    const elPrec = document.getElementById("sim-val-precision");
    const elSubFar = document.getElementById("sim-sub-far");
    const elF1 = document.getElementById("sim-val-f1");
    const elSubSpec = document.getElementById("sim-sub-spec");
    const elCost15 = document.getElementById("sim-val-cost15");
    const elSubCost5 = document.getElementById("sim-sub-cost5");
    const elCm = document.getElementById("sim-val-cm");
    const elSubCm = document.getElementById("sim-sub-cm");

    if (elRec) elRec.textContent = `${recPct}%`;
    if (elSubRec) elSubRec.textContent = `${tp} / 164 Storms Caught (${fn} Missed)`;
    if (elPrec) elPrec.textContent = `${precPct}%`;
    if (elSubFar) elSubFar.textContent = `False Alarm Ratio: ${farPct}%`;
    if (elF1) elF1.textContent = f1Val;
    if (elSubSpec) elSubSpec.textContent = `Specificity: ${specPct}%`;
    if (elCost15) elCost15.textContent = `${cost15} units`;
    if (elSubCost5) elSubCost5.textContent = `5:1 Moderate Cost: ${cost5 !== "—" ? cost5 + " units" : "—"}`;
    if (elCm) elCm.textContent = `TP=${tp} | FN=${fn}`;
    if (elSubCm) elSubCm.textContent = `FP=${fp} | TN=${tn}`;

    // Update Three-Tier Advisory Banner
    const banner = document.getElementById("sim-advisory-banner");
    const badge = document.getElementById("sim-advisory-badge");
    const desc = document.getElementById("sim-advisory-desc");

    if (banner && badge && desc) {
        banner.className = "advisory-banner";
        if (tau < 0.25) {
            banner.classList.add("advisory-blue");
            badge.textContent = `ULTRA-SENSITIVE SCREENING (τ = ${tau.toFixed(3)} < 0.25)`;
            desc.innerHTML = `Captures <strong>${tp}/164</strong> extreme rainfall events (${recPct}% Recall) with elevated false-alarm volume (FP = ${fp}). Recommended only for automated background moisture-convergence tracking.`;
        } else if (tau < 0.30) {
            banner.classList.add("advisory-yellow");
            badge.textContent = `TIER 1: YELLOW WATCH (0.25 ≤ P < 0.30 | Active τ = ${tau.toFixed(3)})`;
            desc.innerHTML = `<strong>Routine Meteorological Watch:</strong> Alerts DHM and TIA duty forecasters to heightened synoptic moisture flux. Detects <strong>${tp}/164</strong> storms (${recPct}% Recall) with 15:1 disaster loss L(τ) = <strong>${cost15}</strong>.`;
        } else if (tau < 0.70) {
            banner.classList.add("advisory-orange");
            badge.textContent = `TIER 2: ORANGE STANDBY (0.30 ≤ P < 0.70 | Active τ = ${tau.toFixed(3)})`;
            desc.innerHTML = `<strong>Pre-Emptive Airport Drainage &amp; Aviation Standby:</strong> Includes the prospective OOF 15:1 optimum (τ*<sub>CV</sub> = 0.30) and retrospective holdout minimum (τ* = 0.40). Detects <strong>${tp}/164</strong> storms (${recPct}% Recall, Precision = ${precPct}%, L(τ) = <strong>${cost15}</strong>).`;
        } else {
            banner.classList.add("advisory-red");
            badge.textContent = `TIER 3: RED ESCALATION (P ≥ 0.70 | Active τ = ${tau.toFixed(3)})`;
            desc.innerHTML = `<strong>High-Confidence Emergency Flood &amp; Ground-Stop Protocol:</strong> Maximizes warning precision (${precPct}%) with low false alarms (FP = ${fp}), but misses ${fn}/164 moderate-tail storms (Recall = ${recPct}%). Deploy alongside Tier 2 standby.`;
        }
    }

    if (typeof Plotly !== "undefined") {
        renderCostTradeoffChart(data, tau);
    }
}

/**
 * Chart 2: Operational Asymmetric 15:1 Cost Trade-Off Analysis with live vertical threshold marker
 */
function renderCostTradeoffChart(data, activeTau) {
    const el = document.getElementById("chart-cost-tradeoff");
    if (!el) return;

    const config = { responsive: true, displayModeBar: true, displaylogo: false };
    const tauMarker = activeTau !== undefined ? activeTau : CURRENT_SIM_TAU;

    if (data.fig2 && data.fig2.data && data.fig2.layout) {
        const baseLayout = JSON.parse(JSON.stringify(data.fig2.layout));
        baseLayout.autosize = true;
        baseLayout.plot_bgcolor = "#F8FAFC";
        baseLayout.paper_bgcolor = "#FFFFFF";

        // Add or update active threshold marker lines across both subplots
        baseLayout.shapes = [
            {
                type: "line", x0: 0.30, x1: 0.30, y0: 0, y1: 1,
                xref: "x", yref: "paper",
                line: { color: "#7C3AED", width: 2, dash: "dash" }
            },
            {
                type: "line", x0: 0.30, x1: 0.30, y0: 0, y1: 1,
                xref: "x2", yref: "paper",
                line: { color: "#7C3AED", width: 2, dash: "dash" }
            },
            {
                type: "line", x0: tauMarker, x1: tauMarker, y0: 0, y1: 1,
                xref: "x", yref: "paper",
                line: { color: "#0D9488", width: 2.5, dash: "solid" }
            },
            {
                type: "line", x0: tauMarker, x1: tauMarker, y0: 0, y1: 1,
                xref: "x2", yref: "paper",
                line: { color: "#0D9488", width: 2.5, dash: "solid" }
            }
        ];

        Plotly.react(el, data.fig2.data, baseLayout, config);
        return;
    }
}

/**
 * Chart 4: RO2 Physical Feature Attribution & Permutation Drop (Horizontal Dual Subplot)
 */
function renderFeatureAttributionChart(data) {
    const el = document.getElementById("chart-feature-attribution");
    if (!el) return;

    const config = { responsive: true, displayModeBar: true, displaylogo: false };

    if (data.fig4 && data.fig4.data && data.fig4.layout) {
        const layout = Object.assign({}, data.fig4.layout, {
            autosize: true,
            plot_bgcolor: "#F8FAFC",
            paper_bgcolor: "#FFFFFF"
        });
        Plotly.react(el, data.fig4.data, layout, config);
        return;
    }

    const top10 = (data.top10_features || []).slice().reverse();
    if (!top10.length) return;

    const features = top10.map(r => r.Feature);
    const rfGini = top10.map(r => Number((r.RF_Gini_Importance * 100).toFixed(2)));
    const permDrop = top10.map(r => Number((r.RF_Permutation_AUC_Drop * 100).toFixed(2)));
    const lrCoef = top10.map(r => Number(r.LR_Coefficient.toFixed(3)));

    const traces = [
        {
            type: "bar", orientation: "h", name: "RF Gini Importance (%)",
            y: features, x: rfGini, xaxis: "x", yaxis: "y", marker: { color: "#1E3A8A" }
        },
        {
            type: "bar", orientation: "h", name: "RF Permutation ROC-AUC Drop (×100)",
            y: features, x: permDrop, xaxis: "x", yaxis: "y", marker: { color: "#DC2626" }
        },
        {
            type: "bar", orientation: "h", name: "LR Standardized Coefficient (β)",
            y: features, x: lrCoef, xaxis: "x2", yaxis: "y2",
            marker: { color: lrCoef.map(v => v >= 0 ? "#0D9488" : "#D97706") }
        }
    ];

    const layout = {
        title: {
            text: "<b>RO2 Physical Feature Attribution: RF Impurity/Permutation vs. LR Standardized Weights</b>",
            font: { size: 15, color: "#0F172A" }
        },
        barmode: "group",
        autosize: true,
        height: 460,
        margin: { l: 150, r: 40, t: 75, b: 55 },
        grid: { rows: 1, columns: 2, pattern: "independent" },
        xaxis: { domain: [0, 0.46], title: "RF Importance / AUC Drop (%)", gridcolor: "#E2E8F0" },
        yaxis: { anchor: "x", gridcolor: "#F1F5F9", tickfont: { size: 12 } },
        xaxis2: { domain: [0.54, 1.0], title: "LR Standardized Log-Odds Weight (β)", gridcolor: "#E2E8F0", zeroline: true },
        yaxis2: { anchor: "x2", matches: "y", showticklabels: false, gridcolor: "#F1F5F9" },
        legend: { orientation: "h", yanchor: "bottom", y: 1.02, xanchor: "center", x: 0.5, font: { size: 11 } },
        plot_bgcolor: "#F8FAFC",
        paper_bgcolor: "#FFFFFF"
    };

    Plotly.react(el, traces, layout, config);
}

/**
 * Chart 3: Real-World Case Study: 20-30 September 2024 Flood Event
 */
function renderCaseStudyChart(data) {
    const el = document.getElementById("chart-case-study");
    if (!el) return;

    const config = { responsive: true, displayModeBar: true, displaylogo: false };

    if (data.fig3 && data.fig3.data && data.fig3.layout) {
        const layout = Object.assign({}, data.fig3.layout, {
            autosize: true,
            plot_bgcolor: "#F8FAFC",
            paper_bgcolor: "#FFFFFF"
        });
        Plotly.react(el, data.fig3.data, layout, config);
        return;
    }
}

/**
 * Populates the September 2024 Flood Case Study Daily Timeline Table.
 */
function populateCaseStudyTable(caseStudy) {
    const tbody = document.getElementById("case-study-table-body");
    if (!tbody || !Array.isArray(caseStudy)) return;

    tbody.innerHTML = caseStudy.map(row => {
        const rain = Number(row.PRECTOTCORR || 0);
        const isExtreme = rain >= 13.74;
        const rfP = Number(row.rf_prob_task_a || 0);
        const lrP = Number(row.lr_prob_task_a || 0);
        const lr24 = Number(row.lr_prob_task_b || 0);
        const maxP = Math.max(rfP, lrP);

        const obsBadge = isExtreme
            ? `<span class="badge badge-red">EXTREME DELUGE (${rain.toFixed(2)} mm)</span>`
            : `<span class="badge badge-blue">Normal / Wet (${rain.toFixed(2)} mm)</span>`;

        let tierBadge = `<span class="badge badge-green">Routine (&lt; 0.25)</span>`;
        if (maxP >= 0.70) {
            tierBadge = `<span class="badge badge-red">TIER 3: RED ESCALATION</span>`;
        } else if (maxP >= 0.30) {
            tierBadge = `<span class="badge badge-amber">TIER 2: ORANGE STANDBY</span>`;
        } else if (maxP >= 0.25) {
            tierBadge = `<span class="badge badge-purple">TIER 1: YELLOW WATCH</span>`;
        }

        return `
            <tr style="${isExtreme ? "background-color: #FFF1F2;" : ""}">
                <td class="model-name">${escapeHtml(row.date)}</td>
                <td><b>${rain.toFixed(2)} mm</b></td>
                <td>${obsBadge}</td>
                <td>${(rfP * 100).toFixed(1)}% (<code>${rfP.toFixed(3)}</code>)</td>
                <td>${(lrP * 100).toFixed(1)}% (<code>${lrP.toFixed(3)}</code>)</td>
                <td>${(lr24 * 100).toFixed(1)}% (<code>${lr24.toFixed(3)}</code>)</td>
                <td>${tierBadge}</td>
            </tr>
        `;
    }).join("");
}

/**
 * Handle window resize to dynamically redraw charts.
 */
function handleWindowResize() {
    ["chart-model-comparison", "chart-cost-tradeoff", "chart-feature-attribution", "chart-case-study"].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.data && typeof Plotly !== "undefined") {
            Plotly.Plots.resize(el);
        }
    });
}

function showDataLoadError() {
    const container = document.querySelector(".container");
    if (container) {
        const div = document.createElement("div");
        div.className = "card";
        div.style.backgroundColor = "#FEE2E2";
        div.style.borderColor = "#EF4444";
        div.style.color = "#991B1B";
        div.style.margin = "20px 0";
        div.innerHTML = `
            <h3>Data Load Notice</h3>
            <p>Could not load <code>js/dashboard-data.js</code>. Verify that the <code>js/</code> folder exists alongside <code>index.html</code>.</p>
        `;
        container.prepend(div);
    }
}

function showPlotlyError() {
    document.querySelectorAll(".chart-plot").forEach(c => {
        c.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:300px;color:#DC2626;font-size:14px;">
                Failed to load Plotly graphing engine. Verify that <code>js/plotly.min.js</code> is present.
            </div>
        `;
    });
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
