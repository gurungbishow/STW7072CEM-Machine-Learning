# Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall at the Kathmandu Airport Grid Cell, Nepal

- **Student Name:** Bishow Gurung
- **College ID:** `260005` | **Coventry University ID:** `17624457`
- **Programme:** MSc Data Science and Computational Intelligence
- **Institution:** Softwarica College of IT & E-Commerce
- **Module:** `STW7072CEM Machine Learning`
- **Email:** `260005@softwarica.edu.np`
- **GitHub Repository:** [https://github.com/gurungbishow/STW7072CEM-Machine-Learning.git](https://github.com/gurungbishow/STW7072CEM-Machine-Learning.git)
- **Presentation Video:** [https://youtu.be/1XqPLvwBD_4](https://youtu.be/1XqPLvwBD_4)

---

## 1. Project Overview & Architecture

This project codebase contains the complete, reproducible machine-learning coursework implementation, executed Jupyter Notebook prototype, 300 DPI scientific figures, verified experimental results, compiled IEEE two-column academic report, and interactive Plotly evaluation dashboard evaluating five supervised classifiers (**Logistic Regression, CART Decision Tree, RBF-Kernel SVM, Random Forest, and $k$-Nearest Neighbours**) alongside **PCA, FastICA, and $K$-Means ($K=3$) clustering** on 30 years of daily NASA POWER MERRA-2 meteorology at the Kathmandu Airport grid cell (`1995–2024`, $N = 10,958$ raw days; $10,951$ post-lag days).

### Project Directory Structure
```text
.
├── notebook/
│   └── extreme_rainfall_classification.ipynb # Primary executed Jupyter Notebook
├── src/
│   ├── __init__.py                           # Source package initialization
│   ├── data_processing.py                    # Dataset audit, chronological split, P95/R95p, 22 features
│   ├── train_and_evaluate.py                 # Unsupervised PCA/ICA/K-Means, 5-fold TimeSeriesSplit CV, Block-7 bootstrap
│   ├── run_experiments.py                    # End-to-end master pipeline generating results/* and execution_log.txt
│   └── generate_figures.py                   # Generates all 14 main figures at 300 DPI
├── data/
│   ├── kathmandu_merra2_1995_2024.csv        # 30-year daily NASA POWER MERRA-2 dataset (10,958 days)
│   ├── kathmandu_airport_nasa_power_metadata.json
│   └── README_DATA.md                        # Dataset provenance, variables, and quality-control documentation
├── figures/
│   ├── figure_01_location.png .. figure_14_lead_time_wetday_sensitivity.png # 14 main publication figures (300 DPI)
│   └── data_processing*.png, train_and_evaluate*.png, generate_figures*.png, dashboard*.png # 38 appendix screenshots
├── results/
│   ├── verified_metrics.json                 # Single authoritative source of truth for all metrics
│   ├── test_predictions.npz                  # Saved holdout probability arrays & binary targets
│   ├── execution_log.txt                     # Complete console execution transcript
│   ├── dataset_split_info.json               # Chronological partition & P95/R95p threshold metadata
│   ├── unsupervised_regime_analysis.json     # PCA, FastICA, and K-Means (K=3) diagnostic profiles
│   ├── pca_kmeans_exact.json                 # Exact eigenspectrum, loadings, and standardized centroids
│   ├── model_performance_comparison.csv      # Out-of-sample 2019-2024 test results across 5 models
│   ├── hyperparameter_tuning_results.csv     # 5-fold TimeSeriesSplit CV tuning grid results
│   ├── bootstrapped_confidence_intervals.json# 7-day moving-block & i.i.d. 95% confidence intervals
│   ├── feature_importances.csv               # Multi-method feature attribution table
│   └── operational_threshold_simulation.csv  # 15:1 asymmetric cost threshold sweep
├── report/
│   ├── main.tex                              # Overleaf / pdflatex report source (includes 38-figure Appendix)
│   └── Bishow_Gurung_17624457.pdf          # Compiled IEEE two-column academic report (with Appendix)
├── script/
│   └── verify_wordcount.py                   # Automated LaTeX prose word-count validator
├── frontend/
│   ├── plotly_dashboard.py                   # Model performance dashboard generator
│   ├── index.html                            # Standalone interactive evaluation dashboard
│   ├── css/style.css                         # Dashboard stylesheet
│   └── js/dashboard-data.js, dashboard.js    # Synchronized metrics & interactive dashboard logic
├── README.md                                 # Project documentation and execution instructions
├── requirements.txt                          # Python dependencies specification
└── .gitignore                                # Git ignore rules for Python, Jupyter, and LaTeX
```

---

## 2. Step-by-Step Execution Instructions

### Option A: Interactive Jupyter Notebook / Google Colab Execution (Primary Deliverable)
1. Activate the virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS:**
     ```bash
     source .venv/bin/activate
     ```
2. Launch Jupyter Notebook or JupyterLab from the project root:
   ```bash
   jupyter notebook notebook/extreme_rainfall_classification.ipynb
   ```
3. Run all cells (`Kernel -> Restart & Run All`). The notebook imports the modular pipeline from `src/`, executes data auditing, preprocessing, unsupervised clustering, 5-fold `TimeSeriesSplit` cross-validation, holdout evaluation, feature attribution, McNemar tests, PCA ablation, and 15:1 cost-threshold analysis, and displays all 14 figures inline.

### Option B: Command-Line Modular Pipeline Execution
Run the modular Python scripts in sequence from the project root:
```bash
python3 src/data_processing.py
python3 src/train_and_evaluate.py
python3 src/run_experiments.py
python3 src/generate_figures.py
```

### Option C: Compiling the IEEE Two-Column LaTeX Report
Compile within the project root or `report/` directory:
```bash
pdflatex -interaction=nonstopmode -output-directory=report report/main.tex
pdflatex -interaction=nonstopmode -output-directory=report report/main.tex
python3 script/verify_wordcount.py
```

### Option D: Launching the Interactive Web Dashboard
To view or regenerate the interactive Plotly model evaluation dashboard:
```bash
python3 frontend/plotly_dashboard.py
python3 -m http.server 8000 --directory frontend
# Open http://localhost:8000 in your browser
```
