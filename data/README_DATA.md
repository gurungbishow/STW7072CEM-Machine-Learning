# Dataset Documentation: Kathmandu Airport Grid Cell Daily Meteorology (1995–2024)

## 1. Provenance & Grid Coordinates
- **Data Provider:** NASA Langley Research Center (LaRC) Prediction Of Worldwide Energy Resources (POWER) Project — Agroclimatology Daily API (v2.10.0), derived from NASA Global Modeling and Assimilation Office (GMAO) MERRA-2 reanalysis (`M2T1NXSLV` / `M2T1NXFLX`) and CERES/GEOS-5.12.4 radiative and assimilation products.
- **Target Station / Grid Cell:** Tribhuvan International Airport (ICAO: `VNKT`), Kathmandu Valley, Nepal ($27.697^\circ\text{N}, 85.359^\circ\text{E}$, Elevation $1,269.39\text{ m}$ above mean sea level; $0.5^\circ \times 0.625^\circ$ grid cell).
- **Temporal Coverage:** January 1, 1995 – December 31, 2024 ($30$ full calendar years; $N = 10,958$ uninterrupted daily observations; $10,951$ post-lag observations after 7-day rolling accumulation initialization).

## 2. Raw & Engineered Meteorological Variables (22 Features + Target)
| Variable Name | Physical Description | Units | Category |
| :--- | :--- | :---: | :--- |
| `PRECTOTCORR` | Bias-Corrected Daily Total Precipitation (Target source $R_t$, excluded from Day-$t$ predictors) | $\text{mm/day}$ | Target Source |
| `T2M` | Daily Mean Air Temperature at 2 Meters | $^\circ\text{C}$ | Thermal |
| `T2M_MAX` | Daily Maximum Air Temperature at 2 Meters | $^\circ\text{C}$ | Thermal |
| `T2M_MIN` | Daily Minimum Air Temperature at 2 Meters | $^\circ\text{C}$ | Thermal |
| `temp_diurnal_range` | Diurnal Temperature Range ($\text{T2M\_MAX} - \text{T2M\_MIN}$), cloud radiative proxy | $^\circ\text{C}$ | Engineered Thermal |
| `T2MDEW` | Dew Point Temperature at 2 Meters | $^\circ\text{C}$ | Hygrometric |
| `dew_point_depression` | Dew Point Depression ($\text{T2M} - \text{T2MDEW}$), boundary-layer saturation proxy | $^\circ\text{C}$ | Engineered Moisture |
| `RH2M` | Relative Humidity at 2 Meters | $\%$ | Hygrometric |
| `QV2M` | Specific Humidity at 2 Meters | $\text{g/kg}$ | Hygrometric |
| `PS` | Surface Barometric Pressure | $\text{kPa}$ | Barometric |
| `pressure_tendency` | 24-Hour Barometric Pressure Tendency ($\text{PS}_t - \text{PS}_{t-1}$) | $\text{kPa/day}$ | Engineered Synoptic |
| `WS10M` | Daily Mean Wind Speed at 10 Meters | $\text{m/s}$ | Kinematic |
| `WS10M_MAX` | Daily Maximum Wind Speed at 10 Meters | $\text{m/s}$ | Kinematic |
| `wind_calm_flag` | Binary Indicator for Calm/Variable Valley Wind Sentinel (`WD10M < 0`) | $\{0, 1\}$ | Quality/Kinematic |
| `ALLSKY_SFC_SW_DWN` | All-Sky Surface Downward Shortwave Solar Irradiance | $\text{MJ/m}^2\text{/day}$ | Radiative |
| `TS` | Earth Skin / Surface Temperature | $^\circ\text{C}$ | Thermal |
| `precip_lag1` | 1-Day Lagged Precipitation ($R_{t-1}$) | $\text{mm/day}$ | Antecedent Persistence |
| `precip_lag2` | 2-Day Lagged Precipitation ($R_{t-2}$) | $\text{mm/day}$ | Antecedent Persistence |
| `precip_lag3` | 3-Day Lagged Precipitation ($R_{t-3}$) | $\text{mm/day}$ | Antecedent Persistence |
| `precip_roll3` | 3-Day Antecedent Cumulative Precipitation ($\sum_{k=1}^{3} R_{t-k}$) | $\text{mm/3d}$ | Soil Moisture Proxy |
| `precip_roll7` | 7-Day Antecedent Cumulative Precipitation ($\sum_{k=1}^{7} R_{t-k}$) | $\text{mm/7d}$ | Watershed Saturation |
| `sin_doy`, `cos_doy` | Cyclical Annual Day-of-Year Harmonics ($\sin(2\pi d/365.25), \cos(2\pi d/365.25)$) | $[-1, 1]$ | Seasonal Cycle |

## 3. Quality Control & Leak-Free Split Protocol
- **Calm-Wind Sentinel Flag (`WD10M`):** In the raw NASA POWER agroclimatology export, `WD10M` records valid azimuths ($1.20^\circ$ to $359.90^\circ$, mean $217.8 \pm 43.7^\circ$) across 1995–2012 ($6,567$ post-lag training days, $74.97\%$) and switches to negative calm/variable sentinel codes (`-8994.0` to `-5404.0`) from December 31, 2012 through 2024 ($2,192$ training days and $2,192$ test days). Rather than discarding rows or imputing synthetic azimuths, `data_processing.py` extracts a binary `wind_calm_flag` ($\mathbb{I}(\text{WD10M}_t < 0)$) and excludes raw `WD10M` from continuous scaling.
- **Chronological Partitioning:**
  - **Training Set (`1995-01-08` to `2018-12-31`):** $8,759$ days; unconditional all-day $P_{95} = 13.74\text{ mm/day}$ ($439$ extremes, $5.01\%$ prevalence); conditional wet-day ($R \ge 1.0\text{ mm/day}$, $2,957$ wet days) $R95p = 22.752\text{ mm/day}$ ($148$ extremes, $1.69\%$ all-day prevalence).
  - **Holdout Test Set (`2019-01-01` to `2024-12-31`):** $2,192$ days; $164$ extremes ($7.48\%$ prevalence) under $P_{95} = 13.74\text{ mm/day}$; $64$ extremes ($2.92\%$ prevalence) under wet-day $R95p = 22.752\text{ mm/day}$.
