"""
Data Processing, Provenance Audit, and Leakage-Free Feature Engineering Module
MSc Machine Learning Coursework - STW7072CEM
Student: Bishow Gurung (College ID: 260005 | Coventry University ID: 17624457)
Topic: Comparative Evaluation of Machine Learning Classifiers for Extreme Rainfall
       at the Kathmandu Airport Grid Cell (1995-2024)
"""

import os
import json
import numpy as np
import pandas as pd

FEATURE_COLS_TASK_A = [
    "T2M", "T2M_MAX", "T2M_MIN", "temp_diurnal_range",
    "T2MDEW", "dew_point_depression", "RH2M", "QV2M",
    "PS", "pressure_tendency", "WS10M", "WS10M_MAX",
    "ALLSKY_SFC_SW_DWN", "TS", "wind_calm_flag",
    "precip_lag1", "precip_lag2", "precip_lag3",
    "precip_roll3", "precip_roll7",
    "sin_doy", "cos_doy",
]

FEATURE_COLS_TASK_B = [
    "T2M_lag1", "T2M_MAX_lag1", "T2M_MIN_lag1", "temp_diurnal_range_lag1",
    "T2MDEW_lag1", "dew_point_depression_lag1", "RH2M_lag1", "QV2M_lag1",
    "PS_lag1", "pressure_tendency_lag1", "WS10M_lag1", "WS10M_MAX_lag1",
    "ALLSKY_SFC_SW_DWN_lag1", "TS_lag1", "wind_calm_flag_lag1",
    "precip_lag1", "precip_lag2", "precip_lag3",
    "precip_roll3", "precip_roll7",
    "sin_doy", "cos_doy",
]


def resolve_dataset_path(csv_path=None):
    """Resolves the Kathmandu NASA POWER MERRA-2 CSV path across working directories."""
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    candidates = []
    if csv_path:
        candidates.append(csv_path)
    candidates.extend([
        os.path.join(base_dir, "data", "kathmandu_merra2_1995_2024.csv"),
        "data/kathmandu_merra2_1995_2024.csv",
        "../data/kathmandu_merra2_1995_2024.csv",
    ])
    for path in candidates:
        if os.path.exists(path):
            return os.path.abspath(path)
    raise FileNotFoundError(f"Could not locate Kathmandu dataset CSV in candidates: {candidates}")


def audit_raw_dataset(csv_path=None):
    """
    Audits raw daily NASA POWER / MERRA-2 observations (1995-2024) for data quality,
    continuity, missingness, sentinel values, and variable summary statistics.
    """
    resolved_path = resolve_dataset_path(csv_path)
    df = pd.read_csv(resolved_path)
    dates = pd.to_datetime(df["date"])
    expected_dates = pd.date_range("1995-01-01", "2024-12-31", freq="D")

    raw_vars = [
        "PRECTOTCORR", "T2M", "T2M_MAX", "T2M_MIN", "T2MDEW",
        "RH2M", "QV2M", "PS", "WS10M", "WS10M_MAX",
        "WD10M", "ALLSKY_SFC_SW_DWN", "TS",
    ]

    train_raw = df[dates.dt.year <= 2018].copy()
    train_post = df.iloc[7:][dates.iloc[7:].dt.year <= 2018].copy()

    var_stats = {}
    for col in raw_vars:
        if col == "WD10M":
            s_pre = train_raw.loc[train_raw["WD10M"] >= 0, "WD10M"]
            s_post = train_post.loc[train_post["WD10M"] >= 0, "WD10M"]
        else:
            s_pre = train_raw[col]
            s_post = train_post[col]
        var_stats[col] = {
            "train_prelag_mean": round(float(s_pre.mean()), 4),
            "train_prelag_std": round(float(s_pre.std(ddof=1)), 4),
            "train_postlag_mean": round(float(s_post.mean()), 4),
            "train_postlag_std": round(float(s_post.std(ddof=1)), 4),
            "train_min": round(float(s_post.min()), 4),
            "train_median": round(float(s_post.median()), 4),
            "train_iqr": round(float(np.percentile(s_post, 75) - np.percentile(s_post, 25)), 4),
            "train_max": round(float(s_post.max()), 4),
        }

    audit_summary = {
        "resolved_csv_path": resolved_path,
        "raw_total_days": int(len(df)),
        "raw_columns_count": int(df.shape[1]),
        "date_start": str(df["date"].min()),
        "date_end": str(df["date"].max()),
        "is_monotonic_increasing": bool(dates.is_monotonic_increasing),
        "duplicate_date_count": int(dates.duplicated().sum()),
        "missing_calendar_days": int(len(set(expected_dates) - set(dates))),
        "nan_values_total": int(df.isnull().sum().sum()),
        "fill_value_minus999_total": int((df[raw_vars] == -999.0).sum().sum()),
        "negative_precip_days": int((df["PRECTOTCORR"] < 0).sum()),
        "max_precip_mm": float(df["PRECTOTCORR"].max()),
        "max_precip_date": str(df.loc[df["PRECTOTCORR"].idxmax(), "date"]),
        "sep28_2024_precip_mm": float(df.loc[df["date"] == "2024-09-28", "PRECTOTCORR"].values[0]),
        "first_7_days_precip_mm": [float(v) for v in df["PRECTOTCORR"].iloc[:7].tolist()],
        "wd10m_negative_calm_days_all": int((df["WD10M"] < 0).sum()),
        "wd10m_valid_days_train_prelag": int((train_raw["WD10M"] >= 0).sum()),
        "wd10m_valid_days_train_postlag": int((train_post["WD10M"] >= 0).sum()),
        "wd10m_negative_days_test": int((df[dates.dt.year > 2018]["WD10M"] < 0).sum()),
        "variable_training_stats": var_stats,
    }
    return audit_summary


def load_and_preprocess_data(csv_path=None):
    """
    Loads raw NASA POWER daily meteorological data for the Kathmandu Airport grid cell,
    encodes negative WD10M calm-wind flags (-8994.0 / <0) via wind_calm_flag, and engineers
    22 physically grounded predictors for Task A (same-day atmospheric state classification)
    plus strictly lagged (t-1) predictors for Task B (24-hour lead-time forecasting).
    """
    resolved_path = resolve_dataset_path(csv_path)
    df = pd.read_csv(resolved_path)
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date").reset_index(drop=True)

    # 1. Wind direction flag handling (negative values denote calm/undefined valley wind direction)
    df["wind_calm_flag"] = (df["WD10M"] < 0).astype(int)
    df["WD10M_clean"] = df["WD10M"].where(df["WD10M"] >= 0, np.nan)

    # 2. Antecedent rainfall memory (strictly shifted to t-1..t-7 so day-t rain never leaks into X)
    df["precip_lag1"] = df["PRECTOTCORR"].shift(1)
    df["precip_lag2"] = df["PRECTOTCORR"].shift(2)
    df["precip_lag3"] = df["PRECTOTCORR"].shift(3)
    df["precip_roll3"] = df["PRECTOTCORR"].shift(1).rolling(3).sum()
    df["precip_roll7"] = df["PRECTOTCORR"].shift(1).rolling(7).sum()

    # 3. Thermodynamic & synoptic stability indicators
    df["temp_diurnal_range"] = df["T2M_MAX"] - df["T2M_MIN"]
    df["dew_point_depression"] = df["T2M"] - df["T2MDEW"]
    df["pressure_tendency"] = df["PS"] - df["PS"].shift(1)

    # 4. Seasonal cyclical harmonics (capturing the South Asian Summer Monsoon cycle)
    doy = df["date"].dt.day_of_year if hasattr(df["date"].dt, "day_of_year") else df["date"].dt.dayofyear
    df["sin_doy"] = np.sin(2.0 * np.pi * doy / 365.25)
    df["cos_doy"] = np.cos(2.0 * np.pi * doy / 365.25)

    # 5. Strictly lagged atmospheric predictors (t-1) for Task B 24-hour lead-time forecasting
    day_t_vars = [
        "T2M", "T2M_MAX", "T2M_MIN", "temp_diurnal_range",
        "T2MDEW", "dew_point_depression", "RH2M", "QV2M",
        "PS", "pressure_tendency", "WS10M", "WS10M_MAX",
        "ALLSKY_SFC_SW_DWN", "TS", "wind_calm_flag",
    ]
    for col in day_t_vars:
        df[f"{col}_lag1"] = df[col].shift(1)

    # Trim initial 7 rows (1995-01-01 to 1995-01-07) to initialize 7-day rolling window without NaNs
    df_clean = df.iloc[7:].copy().reset_index(drop=True)
    return df_clean


def split_and_construct_target(df, train_end_year=2018, percentile=95, wet_day_only=False):
    """
    Strict chronological train-test split to prevent temporal lookahead leakage.
    Both extreme thresholds (all-day P95 = 13.7400 mm/day and wet-day R95p = 22.7520 mm/day
    for wet days R >= 1.0 mm/day) are computed STRICTLY on the 1995-2018 training partition.
    """
    train_mask = df["date"].dt.year <= train_end_year
    test_mask = df["date"].dt.year > train_end_year

    train_precip = df.loc[train_mask, "PRECTOTCORR"]
    all_day_threshold = float(np.percentile(train_precip, percentile))
    wet_threshold = float(np.percentile(train_precip[train_precip >= 1.0], percentile))

    threshold = wet_threshold if wet_day_only else all_day_threshold

    df["target_extreme"] = (df["PRECTOTCORR"] >= all_day_threshold).astype(int)
    df["target_extreme_wet95"] = (df["PRECTOTCORR"] >= wet_threshold).astype(int)

    target_col = "target_extreme_wet95" if wet_day_only else "target_extreme"

    X_train = df.loc[train_mask, FEATURE_COLS_TASK_A].copy()
    y_train = df.loc[train_mask, target_col].copy()

    X_test = df.loc[test_mask, FEATURE_COLS_TASK_A].copy()
    y_test = df.loc[test_mask, target_col].copy()

    dates_train = df.loc[train_mask, "date"].copy()
    dates_test = df.loc[test_mask, "date"].copy()

    train_wet_days = int((df.loc[train_mask, "PRECTOTCORR"] >= 1.0).sum())
    test_wet_days = int((df.loc[test_mask, "PRECTOTCORR"] >= 1.0).sum())
    train_wet_ext = int(df.loc[train_mask, "target_extreme_wet95"].sum())
    test_wet_ext = int(df.loc[test_mask, "target_extreme_wet95"].sum())

    split_info = {
        "train_start": str(dates_train.min().date()),
        "train_end": str(dates_train.max().date()),
        "test_start": str(dates_test.min().date()),
        "test_end": str(dates_test.max().date()),
        "threshold_mm_exact": float(all_day_threshold),
        "threshold_mm": round(all_day_threshold, 2),
        "wet_day_r95p_threshold_mm_exact": float(wet_threshold),
        "wet_day_r95p_threshold_mm": round(wet_threshold, 2),
        "percentile": percentile,
        "raw_total_samples": 10958,
        "post_lag_total_samples": int(len(df)),
        "train_samples": int(len(y_train)),
        "test_samples": int(len(y_test)),
        "train_positives": int(df.loc[train_mask, "target_extreme"].sum()),
        "train_negatives": int((df.loc[train_mask, "target_extreme"] == 0).sum()),
        "train_prevalence": float(df.loc[train_mask, "target_extreme"].mean()),
        "test_positives": int(df.loc[test_mask, "target_extreme"].sum()),
        "test_negatives": int((df.loc[test_mask, "target_extreme"] == 0).sum()),
        "test_prevalence": float(df.loc[test_mask, "target_extreme"].mean()),
        "train_wet_days_ge_1mm": train_wet_days,
        "test_wet_days_ge_1mm": test_wet_days,
        "train_wet95_positives": train_wet_ext,
        "train_wet95_prevalence_all_days": float(train_wet_ext / len(y_train)),
        "train_wet95_prevalence_wet_days": float(train_wet_ext / max(1, train_wet_days)),
        "test_wet95_positives": test_wet_ext,
        "test_wet95_prevalence_all_days": float(test_wet_ext / len(y_test)),
        "test_wet95_prevalence_wet_days": float(test_wet_ext / max(1, test_wet_days)),
        "feature_names": FEATURE_COLS_TASK_A,
        "feature_names_task_b": FEATURE_COLS_TASK_B,
    }

    return X_train, y_train, X_test, y_test, dates_train, dates_test, split_info


if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    results_dir = os.path.join(base_dir, "results")
    os.makedirs(results_dir, exist_ok=True)

    audit = audit_raw_dataset()
    df_clean = load_and_preprocess_data()
    X_tr, y_tr, X_te, y_te, d_tr, d_te, split_info = split_and_construct_target(df_clean)

    with open(os.path.join(results_dir, "dataset_split_info.json"), "w", encoding="utf-8") as f:
        json.dump(split_info, f, indent=2)

    print("=" * 80)
    print("DATA PROCESSING & AUDIT VERIFICATION (src/data_processing.py)")
    print("=" * 80)
    print(f"Resolved Dataset Path : {audit['resolved_csv_path']}")
    print(f"Raw Observations      : {audit['raw_total_days']:,} days ({audit['date_start']} to {audit['date_end']})")
    print(f"Missing / NaN / -999  : NaN={audit['nan_values_total']}, -999={audit['fill_value_minus999_total']}, Gaps={audit['missing_calendar_days']}")
    print(f"Post-Lag Observations : {split_info['post_lag_total_samples']:,} days (after 7-day rolling window init)")
    print(f"Training Partition    : {split_info['train_samples']:,} days ({split_info['train_start']} to {split_info['train_end']})")
    print(f"  - All-Day P95       : {split_info['threshold_mm_exact']:.4f} mm/day -> {split_info['train_positives']} extremes ({split_info['train_prevalence']*100:.2f}%)")
    print(f"  - Wet-Day R95p      : {split_info['wet_day_r95p_threshold_mm_exact']:.4f} mm/day -> {split_info['train_wet95_positives']} extremes ({split_info['train_wet95_prevalence_all_days']*100:.2f}%)")
    print(f"Testing Partition     : {split_info['test_samples']:,} days ({split_info['test_start']} to {split_info['test_end']})")
    print(f"  - All-Day P95 Ext   : {split_info['test_positives']} extremes ({split_info['test_prevalence']*100:.2f}%)")
    print(f"  - Wet-Day R95p Ext  : {split_info['test_wet95_positives']} extremes ({split_info['test_wet95_prevalence_all_days']*100:.2f}%)")
    print(f"Engineered Features   : {len(split_info['feature_names'])} Task A predictors | {len(split_info['feature_names_task_b'])} Task B predictors")
