/**
 * Kathmandu Airport Extreme Rainfall ML Early-Warning System
 * Authoritative Verified Metrics & Pre-compiled Plotly Figure Specs
 */

window.DASHBOARD_DATA = {
  "summary": {
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
    "tau_cv": 0.3,
    "optimal_k": 3,
    "silhouette_k3": 0.3119,
    "db_k3": 1.1327,
    "monsoon_extreme_share": 94.99
  },
  "performance": [
    {
      "Accuracy": 0.7586678832116789,
      "Precision": 0.23201174743024963,
      "Recall": 0.9634146341463414,
      "F1_Score": 0.3739644970414201,
      "F1_Macro": 0.6122436217899951,
      "Specificity": 0.7421104536489151,
      "ROC_AUC": 0.9410809640640786,
      "PR_AUC": 0.5478239162150603,
      "Brier_Score": 0.16209497725544694,
      "TN": 1505,
      "FP": 523,
      "FN": 6,
      "TP": 158,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Logistic Regression",
      "CV_F1": 0.3172,
      "CV_Std": 0.0778,
      "Fit_Runtime_Sec": 0.0533,
      "Test_Inference_Sec": 0.0011,
      "F1_CI_95_Block7": "[31.97%, 42.63%]",
      "F1_CI_95_IID": "[33.24%, 41.59%]",
      "F1_CI_95": "[31.97%, 42.63%]"
    },
    {
      "Accuracy": 0.8106751824817519,
      "Precision": 0.26454033771106944,
      "Recall": 0.8597560975609756,
      "F1_Score": 0.40459110473457677,
      "F1_Macro": 0.6460167349005133,
      "Specificity": 0.8067061143984221,
      "ROC_AUC": 0.8717527781786694,
      "PR_AUC": 0.4068109541763234,
      "Brier_Score": 0.14175115534350669,
      "TN": 1636,
      "FP": 392,
      "FN": 23,
      "TP": 141,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Decision Tree",
      "CV_F1": 0.3383,
      "CV_Std": 0.0566,
      "Fit_Runtime_Sec": 0.0576,
      "Test_Inference_Sec": 0.0006,
      "F1_CI_95_Block7": "[34.75%, 45.44%]",
      "F1_CI_95_IID": "[35.70%, 44.67%]",
      "F1_CI_95": "[34.75%, 45.44%]"
    },
    {
      "Accuracy": 0.7906021897810219,
      "Precision": 0.2469982847341338,
      "Recall": 0.8780487804878049,
      "F1_Score": 0.3855421686746988,
      "F1_Macro": 0.6296696270923673,
      "Specificity": 0.7835305719921104,
      "ROC_AUC": 0.9011175855101746,
      "PR_AUC": 0.3676140033567597,
      "Brier_Score": 0.055284627889058115,
      "TN": 1589,
      "FP": 439,
      "FN": 20,
      "TP": 144,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Support Vector Machine",
      "CV_F1": 0.3476,
      "CV_Std": 0.0514,
      "Fit_Runtime_Sec": 10.4518,
      "Test_Inference_Sec": 0.7772,
      "F1_CI_95_Block7": "[33.07%, 43.70%]",
      "F1_CI_95_IID": "[34.27%, 42.93%]",
      "F1_CI_95": "[33.07%, 43.70%]"
    },
    {
      "Accuracy": 0.8270985401459854,
      "Precision": 0.2896281800391389,
      "Recall": 0.9024390243902439,
      "F1_Score": 0.43851851851851853,
      "F1_Macro": 0.6681673207313541,
      "Specificity": 0.8210059171597633,
      "ROC_AUC": 0.9349352960985232,
      "PR_AUC": 0.5516613989737256,
      "Brier_Score": 0.11539781532847312,
      "TN": 1665,
      "FP": 363,
      "FN": 16,
      "TP": 148,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Random Forest",
      "CV_F1": 0.378,
      "CV_Std": 0.0429,
      "Fit_Runtime_Sec": 1.2909,
      "Test_Inference_Sec": 0.029,
      "F1_CI_95_Block7": "[38.17%, 49.14%]",
      "F1_CI_95_IID": "[39.22%, 48.48%]",
      "F1_CI_95": "[38.17%, 49.14%]"
    },
    {
      "Accuracy": 0.9315693430656934,
      "Precision": 0.5875,
      "Recall": 0.2865853658536585,
      "F1_Score": 0.38524590163934425,
      "F1_Macro": 0.6745070087906866,
      "Specificity": 0.9837278106508875,
      "ROC_AUC": 0.8218748496656564,
      "PR_AUC": 0.35466470068530975,
      "Brier_Score": 0.055967153284671535,
      "TN": 1995,
      "FP": 33,
      "FN": 117,
      "TP": 47,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "k-Nearest Neighbours",
      "CV_F1": 0.2003,
      "CV_Std": 0.0844,
      "Fit_Runtime_Sec": 0.0024,
      "Test_Inference_Sec": 0.0702,
      "F1_CI_95_Block7": "[30.77%, 44.90%]",
      "F1_CI_95_IID": "[30.70%, 46.34%]",
      "F1_CI_95": "[30.77%, 44.90%]"
    }
  ],
  "cost_sweep": {
    "tau_cv": 0.3,
    "rf": [
      {
        "Decision_Threshold": 0.05,
        "Accuracy": 0.5492700729927007,
        "Precision": 0.1423611111111111,
        "Recall": 1.0,
        "F1_Score": 0.2492401215805471,
        "Specificity": 0.5128205128205128,
        "False_Alarm_Ratio": 0.8576388888888888,
        "TP": 164,
        "FP": 988,
        "FN": 0,
        "TN": 1040,
        "Total_Cost_15x": 988,
        "Total_Cost_5x": 988
      },
      {
        "Decision_Threshold": 0.075,
        "Accuracy": 0.5853102189781022,
        "Precision": 0.1528424976700838,
        "Recall": 1.0,
        "F1_Score": 0.2651576394502829,
        "Specificity": 0.5517751479289941,
        "False_Alarm_Ratio": 0.8471575023299162,
        "TP": 164,
        "FP": 909,
        "FN": 0,
        "TN": 1119,
        "Total_Cost_15x": 909,
        "Total_Cost_5x": 909
      },
      {
        "Decision_Threshold": 0.1,
        "Accuracy": 0.6158759124087592,
        "Precision": 0.1630218687872763,
        "Recall": 1.0,
        "F1_Score": 0.2803418803418803,
        "Specificity": 0.5848126232741617,
        "False_Alarm_Ratio": 0.8369781312127237,
        "TP": 164,
        "FP": 842,
        "FN": 0,
        "TN": 1186,
        "Total_Cost_15x": 842,
        "Total_Cost_5x": 842
      },
      {
        "Decision_Threshold": 0.125,
        "Accuracy": 0.6400547445255474,
        "Precision": 0.1720881427072403,
        "Recall": 1.0,
        "F1_Score": 0.2936436884512086,
        "Specificity": 0.6109467455621301,
        "False_Alarm_Ratio": 0.8279118572927597,
        "TP": 164,
        "FP": 789,
        "FN": 0,
        "TN": 1239,
        "Total_Cost_15x": 789,
        "Total_Cost_5x": 789
      },
      {
        "Decision_Threshold": 0.15,
        "Accuracy": 0.6665145985401459,
        "Precision": 0.1825307950727883,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3084200567644276,
        "Specificity": 0.6400394477317555,
        "False_Alarm_Ratio": 0.8174692049272116,
        "TP": 163,
        "FP": 730,
        "FN": 1,
        "TN": 1298,
        "Total_Cost_15x": 745,
        "Total_Cost_5x": 735
      },
      {
        "Decision_Threshold": 0.175,
        "Accuracy": 0.6856751824817519,
        "Precision": 0.1915393654524089,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3211822660098522,
        "Specificity": 0.6607495069033531,
        "False_Alarm_Ratio": 0.8084606345475911,
        "TP": 163,
        "FP": 688,
        "FN": 1,
        "TN": 1340,
        "Total_Cost_15x": 703,
        "Total_Cost_5x": 693
      },
      {
        "Decision_Threshold": 0.2,
        "Accuracy": 0.7043795620437956,
        "Precision": 0.2012345679012345,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3347022587268994,
        "Specificity": 0.6809664694280079,
        "False_Alarm_Ratio": 0.7987654320987654,
        "TP": 163,
        "FP": 647,
        "FN": 1,
        "TN": 1381,
        "Total_Cost_15x": 662,
        "Total_Cost_5x": 652
      },
      {
        "Decision_Threshold": 0.225,
        "Accuracy": 0.7244525547445255,
        "Precision": 0.2120418848167539,
        "Recall": 0.9878048780487804,
        "F1_Score": 0.3491379310344827,
        "Specificity": 0.703155818540434,
        "False_Alarm_Ratio": 0.7879581151832461,
        "TP": 162,
        "FP": 602,
        "FN": 2,
        "TN": 1426,
        "Total_Cost_15x": 632,
        "Total_Cost_5x": 612
      },
      {
        "Decision_Threshold": 0.25,
        "Accuracy": 0.738594890510949,
        "Precision": 0.2210095497953615,
        "Recall": 0.9878048780487804,
        "F1_Score": 0.3612040133779264,
        "Specificity": 0.7184418145956607,
        "False_Alarm_Ratio": 0.7789904502046385,
        "TP": 162,
        "FP": 571,
        "FN": 2,
        "TN": 1457,
        "Total_Cost_15x": 601,
        "Total_Cost_5x": 581
      },
      {
        "Decision_Threshold": 0.275,
        "Accuracy": 0.7550182481751825,
        "Precision": 0.2316546762589928,
        "Recall": 0.9817073170731708,
        "F1_Score": 0.3748544819557625,
        "Specificity": 0.7366863905325444,
        "False_Alarm_Ratio": 0.7683453237410072,
        "TP": 161,
        "FP": 534,
        "FN": 3,
        "TN": 1494,
        "Total_Cost_15x": 579,
        "Total_Cost_5x": 549
      },
      {
        "Decision_Threshold": 0.3,
        "Accuracy": 0.7682481751824818,
        "Precision": 0.2417417417417417,
        "Recall": 0.9817073170731708,
        "F1_Score": 0.3879518072289156,
        "Specificity": 0.7509861932938856,
        "False_Alarm_Ratio": 0.7582582582582582,
        "TP": 161,
        "FP": 505,
        "FN": 3,
        "TN": 1523,
        "Total_Cost_15x": 550,
        "Total_Cost_5x": 520
      },
      {
        "Decision_Threshold": 0.325,
        "Accuracy": 0.7755474452554745,
        "Precision": 0.2461300309597523,
        "Recall": 0.9695121951219512,
        "F1_Score": 0.3925925925925926,
        "Specificity": 0.7598619329388561,
        "False_Alarm_Ratio": 0.7538699690402477,
        "TP": 159,
        "FP": 487,
        "FN": 5,
        "TN": 1541,
        "Total_Cost_15x": 562,
        "Total_Cost_5x": 512
      },
      {
        "Decision_Threshold": 0.35,
        "Accuracy": 0.7837591240875912,
        "Precision": 0.2516025641025641,
        "Recall": 0.9573170731707316,
        "F1_Score": 0.398477157360406,
        "Specificity": 0.769723865877712,
        "False_Alarm_Ratio": 0.7483974358974359,
        "TP": 157,
        "FP": 467,
        "FN": 7,
        "TN": 1561,
        "Total_Cost_15x": 572,
        "Total_Cost_5x": 502
      },
      {
        "Decision_Threshold": 0.375,
        "Accuracy": 0.7974452554744526,
        "Precision": 0.2643097643097643,
        "Recall": 0.9573170731707316,
        "F1_Score": 0.4142480211081794,
        "Specificity": 0.784516765285996,
        "False_Alarm_Ratio": 0.7356902356902357,
        "TP": 157,
        "FP": 437,
        "FN": 7,
        "TN": 1591,
        "Total_Cost_15x": 542,
        "Total_Cost_5x": 472
      },
      {
        "Decision_Threshold": 0.4,
        "Accuracy": 0.802007299270073,
        "Precision": 0.2688356164383562,
        "Recall": 0.9573170731707316,
        "F1_Score": 0.4197860962566845,
        "Specificity": 0.789447731755424,
        "False_Alarm_Ratio": 0.7311643835616438,
        "TP": 157,
        "FP": 427,
        "FN": 7,
        "TN": 1601,
        "Total_Cost_15x": 532,
        "Total_Cost_5x": 462
      },
      {
        "Decision_Threshold": 0.425,
        "Accuracy": 0.8088503649635036,
        "Precision": 0.2735346358792184,
        "Recall": 0.9390243902439024,
        "F1_Score": 0.4236588720770289,
        "Specificity": 0.7983234714003945,
        "False_Alarm_Ratio": 0.7264653641207816,
        "TP": 154,
        "FP": 409,
        "FN": 10,
        "TN": 1619,
        "Total_Cost_15x": 559,
        "Total_Cost_5x": 459
      },
      {
        "Decision_Threshold": 0.45,
        "Accuracy": 0.8125,
        "Precision": 0.2758620689655172,
        "Recall": 0.926829268292683,
        "F1_Score": 0.4251748251748252,
        "Specificity": 0.8032544378698225,
        "False_Alarm_Ratio": 0.7241379310344828,
        "TP": 152,
        "FP": 399,
        "FN": 12,
        "TN": 1629,
        "Total_Cost_15x": 579,
        "Total_Cost_5x": 459
      },
      {
        "Decision_Threshold": 0.475,
        "Accuracy": 0.8166058394160584,
        "Precision": 0.2788104089219331,
        "Recall": 0.9146341463414634,
        "F1_Score": 0.4273504273504273,
        "Specificity": 0.8086785009861933,
        "False_Alarm_Ratio": 0.7211895910780669,
        "TP": 150,
        "FP": 388,
        "FN": 14,
        "TN": 1640,
        "Total_Cost_15x": 598,
        "Total_Cost_5x": 458
      },
      {
        "Decision_Threshold": 0.5,
        "Accuracy": 0.8270985401459854,
        "Precision": 0.2896281800391389,
        "Recall": 0.902439024390244,
        "F1_Score": 0.4385185185185185,
        "Specificity": 0.8210059171597633,
        "False_Alarm_Ratio": 0.7103718199608611,
        "TP": 148,
        "FP": 363,
        "FN": 16,
        "TN": 1665,
        "Total_Cost_15x": 603,
        "Total_Cost_5x": 443
      },
      {
        "Decision_Threshold": 0.525,
        "Accuracy": 0.8348540145985401,
        "Precision": 0.2995951417004048,
        "Recall": 0.902439024390244,
        "F1_Score": 0.4498480243161094,
        "Specificity": 0.8293885601577909,
        "False_Alarm_Ratio": 0.7004048582995952,
        "TP": 148,
        "FP": 346,
        "FN": 16,
        "TN": 1682,
        "Total_Cost_15x": 586,
        "Total_Cost_5x": 426
      },
      {
        "Decision_Threshold": 0.55,
        "Accuracy": 0.8394160583941606,
        "Precision": 0.3057851239669421,
        "Recall": 0.902439024390244,
        "F1_Score": 0.4567901234567901,
        "Specificity": 0.834319526627219,
        "False_Alarm_Ratio": 0.6942148760330579,
        "TP": 148,
        "FP": 336,
        "FN": 16,
        "TN": 1692,
        "Total_Cost_15x": 576,
        "Total_Cost_5x": 416
      },
      {
        "Decision_Threshold": 0.575,
        "Accuracy": 0.8421532846715328,
        "Precision": 0.3055555555555556,
        "Recall": 0.8719512195121951,
        "F1_Score": 0.4525316455696203,
        "Specificity": 0.8397435897435898,
        "False_Alarm_Ratio": 0.6944444444444444,
        "TP": 143,
        "FP": 325,
        "FN": 21,
        "TN": 1703,
        "Total_Cost_15x": 640,
        "Total_Cost_5x": 430
      },
      {
        "Decision_Threshold": 0.6,
        "Accuracy": 0.8471715328467153,
        "Precision": 0.3112582781456953,
        "Recall": 0.8597560975609756,
        "F1_Score": 0.4570502431118314,
        "Specificity": 0.8461538461538461,
        "False_Alarm_Ratio": 0.6887417218543046,
        "TP": 141,
        "FP": 312,
        "FN": 23,
        "TN": 1716,
        "Total_Cost_15x": 657,
        "Total_Cost_5x": 427
      },
      {
        "Decision_Threshold": 0.625,
        "Accuracy": 0.8567518248175182,
        "Precision": 0.3247663551401869,
        "Recall": 0.8475609756097561,
        "F1_Score": 0.4695945945945945,
        "Specificity": 0.8574950690335306,
        "False_Alarm_Ratio": 0.6752336448598131,
        "TP": 139,
        "FP": 289,
        "FN": 25,
        "TN": 1739,
        "Total_Cost_15x": 664,
        "Total_Cost_5x": 414
      },
      {
        "Decision_Threshold": 0.65,
        "Accuracy": 0.8654197080291971,
        "Precision": 0.337468982630273,
        "Recall": 0.8292682926829268,
        "F1_Score": 0.4797178130511463,
        "Specificity": 0.8683431952662722,
        "False_Alarm_Ratio": 0.662531017369727,
        "TP": 136,
        "FP": 267,
        "FN": 28,
        "TN": 1761,
        "Total_Cost_15x": 687,
        "Total_Cost_5x": 407
      },
      {
        "Decision_Threshold": 0.675,
        "Accuracy": 0.8699817518248175,
        "Precision": 0.3444730077120823,
        "Recall": 0.8170731707317073,
        "F1_Score": 0.484629294755877,
        "Specificity": 0.8742603550295858,
        "False_Alarm_Ratio": 0.6555269922879177,
        "TP": 134,
        "FP": 255,
        "FN": 30,
        "TN": 1773,
        "Total_Cost_15x": 705,
        "Total_Cost_5x": 405
      },
      {
        "Decision_Threshold": 0.7,
        "Accuracy": 0.8795620437956204,
        "Precision": 0.361878453038674,
        "Recall": 0.7987804878048781,
        "F1_Score": 0.4980988593155893,
        "Specificity": 0.886094674556213,
        "False_Alarm_Ratio": 0.638121546961326,
        "TP": 131,
        "FP": 231,
        "FN": 33,
        "TN": 1797,
        "Total_Cost_15x": 726,
        "Total_Cost_5x": 396
      },
      {
        "Decision_Threshold": 0.725,
        "Accuracy": 0.886405109489051,
        "Precision": 0.3708206686930091,
        "Recall": 0.7439024390243902,
        "F1_Score": 0.4949290060851927,
        "Specificity": 0.8979289940828402,
        "False_Alarm_Ratio": 0.6291793313069909,
        "TP": 122,
        "FP": 207,
        "FN": 42,
        "TN": 1821,
        "Total_Cost_15x": 837,
        "Total_Cost_5x": 417
      },
      {
        "Decision_Threshold": 0.75,
        "Accuracy": 0.895529197080292,
        "Precision": 0.3875432525951557,
        "Recall": 0.6829268292682927,
        "F1_Score": 0.4944812362030905,
        "Specificity": 0.9127218934911244,
        "False_Alarm_Ratio": 0.6124567474048443,
        "TP": 112,
        "FP": 177,
        "FN": 52,
        "TN": 1851,
        "Total_Cost_15x": 957,
        "Total_Cost_5x": 437
      },
      {
        "Decision_Threshold": 0.775,
        "Accuracy": 0.9041970802919708,
        "Precision": 0.4141791044776119,
        "Recall": 0.676829268292683,
        "F1_Score": 0.5138888888888888,
        "Specificity": 0.9225838264299804,
        "False_Alarm_Ratio": 0.585820895522388,
        "TP": 111,
        "FP": 157,
        "FN": 53,
        "TN": 1871,
        "Total_Cost_15x": 952,
        "Total_Cost_5x": 422
      },
      {
        "Decision_Threshold": 0.8,
        "Accuracy": 0.916970802919708,
        "Precision": 0.4605263157894737,
        "Recall": 0.6402439024390244,
        "F1_Score": 0.5357142857142857,
        "Specificity": 0.9393491124260356,
        "False_Alarm_Ratio": 0.5394736842105263,
        "TP": 105,
        "FP": 123,
        "FN": 59,
        "TN": 1905,
        "Total_Cost_15x": 1008,
        "Total_Cost_5x": 418
      },
      {
        "Decision_Threshold": 0.825,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.5,
        "Recall": 0.5792682926829268,
        "F1_Score": 0.536723163841808,
        "Specificity": 0.953155818540434,
        "False_Alarm_Ratio": 0.5,
        "TP": 95,
        "FP": 95,
        "FN": 69,
        "TN": 1933,
        "Total_Cost_15x": 1130,
        "Total_Cost_5x": 440
      },
      {
        "Decision_Threshold": 0.85,
        "Accuracy": 0.9302007299270072,
        "Precision": 0.535031847133758,
        "Recall": 0.5121951219512195,
        "F1_Score": 0.5233644859813084,
        "Specificity": 0.9640039447731756,
        "False_Alarm_Ratio": 0.464968152866242,
        "TP": 84,
        "FP": 73,
        "FN": 80,
        "TN": 1955,
        "Total_Cost_15x": 1273,
        "Total_Cost_5x": 473
      },
      {
        "Decision_Threshold": 0.875,
        "Accuracy": 0.9338503649635036,
        "Precision": 0.576,
        "Recall": 0.4390243902439024,
        "F1_Score": 0.4982698961937716,
        "Specificity": 0.9738658777120316,
        "False_Alarm_Ratio": 0.424,
        "TP": 72,
        "FP": 53,
        "FN": 92,
        "TN": 1975,
        "Total_Cost_15x": 1433,
        "Total_Cost_5x": 513
      },
      {
        "Decision_Threshold": 0.9,
        "Accuracy": 0.935675182481752,
        "Precision": 0.6236559139784946,
        "Recall": 0.3536585365853658,
        "F1_Score": 0.4513618677042801,
        "Specificity": 0.982741617357002,
        "False_Alarm_Ratio": 0.3763440860215054,
        "TP": 58,
        "FP": 35,
        "FN": 106,
        "TN": 1993,
        "Total_Cost_15x": 1625,
        "Total_Cost_5x": 565
      },
      {
        "Decision_Threshold": 0.925,
        "Accuracy": 0.936131386861314,
        "Precision": 0.6818181818181818,
        "Recall": 0.274390243902439,
        "F1_Score": 0.391304347826087,
        "Specificity": 0.9896449704142012,
        "False_Alarm_Ratio": 0.3181818181818182,
        "TP": 45,
        "FP": 21,
        "FN": 119,
        "TN": 2007,
        "Total_Cost_15x": 1806,
        "Total_Cost_5x": 616
      },
      {
        "Decision_Threshold": 0.95,
        "Accuracy": 0.9329379562043796,
        "Precision": 0.84,
        "Recall": 0.1280487804878048,
        "F1_Score": 0.2222222222222222,
        "Specificity": 0.9980276134122288,
        "False_Alarm_Ratio": 0.16,
        "TP": 21,
        "FP": 4,
        "FN": 143,
        "TN": 2024,
        "Total_Cost_15x": 2149,
        "Total_Cost_5x": 719
      }
    ],
    "lr": [
      {
        "Decision_Threshold": 0.05,
        "Accuracy": 0.3093065693430657,
        "Precision": 0.0977353992848629,
        "Recall": 1.0,
        "F1_Score": 0.1780673181324647,
        "Specificity": 0.2534516765285996,
        "False_Alarm_Ratio": 0.902264600715137,
        "TP": 164,
        "FP": 1514,
        "FN": 0,
        "TN": 514,
        "Total_Cost_15x": 1514,
        "Total_Cost_5x": 1514
      },
      {
        "Decision_Threshold": 0.075,
        "Accuracy": 0.3850364963503649,
        "Precision": 0.1084656084656084,
        "Recall": 1.0,
        "F1_Score": 0.1957040572792363,
        "Specificity": 0.3353057199211045,
        "False_Alarm_Ratio": 0.8915343915343915,
        "TP": 164,
        "FP": 1348,
        "FN": 0,
        "TN": 680,
        "Total_Cost_15x": 1348,
        "Total_Cost_5x": 1348
      },
      {
        "Decision_Threshold": 0.1,
        "Accuracy": 0.4434306569343065,
        "Precision": 0.1184971098265895,
        "Recall": 1.0,
        "F1_Score": 0.2118863049095607,
        "Specificity": 0.398422090729783,
        "False_Alarm_Ratio": 0.8815028901734104,
        "TP": 164,
        "FP": 1220,
        "FN": 0,
        "TN": 808,
        "Total_Cost_15x": 1220,
        "Total_Cost_5x": 1220
      },
      {
        "Decision_Threshold": 0.125,
        "Accuracy": 0.4895072992700729,
        "Precision": 0.127825409197194,
        "Recall": 1.0,
        "F1_Score": 0.2266758811333794,
        "Specificity": 0.4482248520710059,
        "False_Alarm_Ratio": 0.8721745908028059,
        "TP": 164,
        "FP": 1119,
        "FN": 0,
        "TN": 909,
        "Total_Cost_15x": 1119,
        "Total_Cost_5x": 1119
      },
      {
        "Decision_Threshold": 0.15,
        "Accuracy": 0.5360401459854015,
        "Precision": 0.1388653683319221,
        "Recall": 1.0,
        "F1_Score": 0.2438661710037174,
        "Specificity": 0.4985207100591716,
        "False_Alarm_Ratio": 0.8611346316680779,
        "TP": 164,
        "FP": 1017,
        "FN": 0,
        "TN": 1011,
        "Total_Cost_15x": 1017,
        "Total_Cost_5x": 1017
      },
      {
        "Decision_Threshold": 0.175,
        "Accuracy": 0.5702554744525548,
        "Precision": 0.1482820976491862,
        "Recall": 1.0,
        "F1_Score": 0.258267716535433,
        "Specificity": 0.5355029585798816,
        "False_Alarm_Ratio": 0.8517179023508137,
        "TP": 164,
        "FP": 942,
        "FN": 0,
        "TN": 1086,
        "Total_Cost_15x": 942,
        "Total_Cost_5x": 942
      },
      {
        "Decision_Threshold": 0.2,
        "Accuracy": 0.5907846715328468,
        "Precision": 0.1545711592836946,
        "Recall": 1.0,
        "F1_Score": 0.2677551020408163,
        "Specificity": 0.5576923076923077,
        "False_Alarm_Ratio": 0.8454288407163053,
        "TP": 164,
        "FP": 897,
        "FN": 0,
        "TN": 1131,
        "Total_Cost_15x": 897,
        "Total_Cost_5x": 897
      },
      {
        "Decision_Threshold": 0.225,
        "Accuracy": 0.6040145985401459,
        "Precision": 0.158252427184466,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.2730318257956449,
        "Specificity": 0.5724852071005917,
        "False_Alarm_Ratio": 0.8417475728155339,
        "TP": 163,
        "FP": 867,
        "FN": 1,
        "TN": 1161,
        "Total_Cost_15x": 882,
        "Total_Cost_5x": 872
      },
      {
        "Decision_Threshold": 0.25,
        "Accuracy": 0.6190693430656934,
        "Precision": 0.1634904714142427,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.280792420327304,
        "Specificity": 0.5887573964497042,
        "False_Alarm_Ratio": 0.8365095285857573,
        "TP": 163,
        "FP": 834,
        "FN": 1,
        "TN": 1194,
        "Total_Cost_15x": 849,
        "Total_Cost_5x": 839
      },
      {
        "Decision_Threshold": 0.275,
        "Accuracy": 0.6359489051094891,
        "Precision": 0.1697916666666666,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.2900355871886121,
        "Specificity": 0.6070019723865878,
        "False_Alarm_Ratio": 0.8302083333333333,
        "TP": 163,
        "FP": 797,
        "FN": 1,
        "TN": 1231,
        "Total_Cost_15x": 812,
        "Total_Cost_5x": 802
      },
      {
        "Decision_Threshold": 0.3,
        "Accuracy": 0.6541970802919708,
        "Precision": 0.1771739130434782,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3007380073800738,
        "Specificity": 0.6267258382642998,
        "False_Alarm_Ratio": 0.8228260869565217,
        "TP": 163,
        "FP": 757,
        "FN": 1,
        "TN": 1271,
        "Total_Cost_15x": 772,
        "Total_Cost_5x": 762
      },
      {
        "Decision_Threshold": 0.325,
        "Accuracy": 0.6687956204379562,
        "Precision": 0.1835585585585585,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3098859315589353,
        "Specificity": 0.6425049309664694,
        "False_Alarm_Ratio": 0.8164414414414414,
        "TP": 163,
        "FP": 725,
        "FN": 1,
        "TN": 1303,
        "Total_Cost_15x": 740,
        "Total_Cost_5x": 730
      },
      {
        "Decision_Threshold": 0.35,
        "Accuracy": 0.6824817518248175,
        "Precision": 0.1899766899766899,
        "Recall": 0.9939024390243902,
        "F1_Score": 0.3189823874755381,
        "Specificity": 0.6572978303747534,
        "False_Alarm_Ratio": 0.8100233100233101,
        "TP": 163,
        "FP": 695,
        "FN": 1,
        "TN": 1333,
        "Total_Cost_15x": 710,
        "Total_Cost_5x": 700
      },
      {
        "Decision_Threshold": 0.375,
        "Accuracy": 0.698905109489051,
        "Precision": 0.1975609756097561,
        "Recall": 0.9878048780487804,
        "F1_Score": 0.3292682926829268,
        "Specificity": 0.6755424063116371,
        "False_Alarm_Ratio": 0.802439024390244,
        "TP": 162,
        "FP": 658,
        "FN": 2,
        "TN": 1370,
        "Total_Cost_15x": 688,
        "Total_Cost_5x": 668
      },
      {
        "Decision_Threshold": 0.4,
        "Accuracy": 0.708941605839416,
        "Precision": 0.2022613065326633,
        "Recall": 0.9817073170731708,
        "F1_Score": 0.3354166666666666,
        "Specificity": 0.6868836291913215,
        "False_Alarm_Ratio": 0.7977386934673367,
        "TP": 161,
        "FP": 635,
        "FN": 3,
        "TN": 1393,
        "Total_Cost_15x": 680,
        "Total_Cost_5x": 650
      },
      {
        "Decision_Threshold": 0.425,
        "Accuracy": 0.7217153284671532,
        "Precision": 0.2096354166666666,
        "Recall": 0.9817073170731708,
        "F1_Score": 0.3454935622317596,
        "Specificity": 0.7006903353057199,
        "False_Alarm_Ratio": 0.7903645833333334,
        "TP": 161,
        "FP": 607,
        "FN": 3,
        "TN": 1421,
        "Total_Cost_15x": 652,
        "Total_Cost_5x": 622
      },
      {
        "Decision_Threshold": 0.45,
        "Accuracy": 0.7358576642335767,
        "Precision": 0.2184531886024423,
        "Recall": 0.9817073170731708,
        "F1_Score": 0.3573806881243063,
        "Specificity": 0.7159763313609467,
        "False_Alarm_Ratio": 0.7815468113975577,
        "TP": 161,
        "FP": 576,
        "FN": 3,
        "TN": 1452,
        "Total_Cost_15x": 621,
        "Total_Cost_5x": 591
      },
      {
        "Decision_Threshold": 0.475,
        "Accuracy": 0.7477189781021898,
        "Precision": 0.2248939179632249,
        "Recall": 0.9695121951219512,
        "F1_Score": 0.365097588978186,
        "Specificity": 0.7297830374753451,
        "False_Alarm_Ratio": 0.7751060820367751,
        "TP": 159,
        "FP": 548,
        "FN": 5,
        "TN": 1480,
        "Total_Cost_15x": 623,
        "Total_Cost_5x": 573
      },
      {
        "Decision_Threshold": 0.5,
        "Accuracy": 0.7586678832116789,
        "Precision": 0.2320117474302496,
        "Recall": 0.9634146341463414,
        "F1_Score": 0.3739644970414201,
        "Specificity": 0.7421104536489151,
        "False_Alarm_Ratio": 0.7679882525697503,
        "TP": 158,
        "FP": 523,
        "FN": 6,
        "TN": 1505,
        "Total_Cost_15x": 613,
        "Total_Cost_5x": 553
      },
      {
        "Decision_Threshold": 0.525,
        "Accuracy": 0.7723540145985401,
        "Precision": 0.2419106317411402,
        "Recall": 0.9573170731707316,
        "F1_Score": 0.3862238622386224,
        "Specificity": 0.757396449704142,
        "False_Alarm_Ratio": 0.7580893682588598,
        "TP": 157,
        "FP": 492,
        "FN": 7,
        "TN": 1536,
        "Total_Cost_15x": 597,
        "Total_Cost_5x": 527
      },
      {
        "Decision_Threshold": 0.55,
        "Accuracy": 0.7851277372262774,
        "Precision": 0.2528180354267311,
        "Recall": 0.9573170731707316,
        "F1_Score": 0.4,
        "Specificity": 0.7712031558185405,
        "False_Alarm_Ratio": 0.7471819645732689,
        "TP": 157,
        "FP": 464,
        "FN": 7,
        "TN": 1564,
        "Total_Cost_15x": 569,
        "Total_Cost_5x": 499
      },
      {
        "Decision_Threshold": 0.575,
        "Accuracy": 0.7937956204379562,
        "Precision": 0.2591973244147157,
        "Recall": 0.945121951219512,
        "F1_Score": 0.4068241469816273,
        "Specificity": 0.7815581854043393,
        "False_Alarm_Ratio": 0.7408026755852843,
        "TP": 155,
        "FP": 443,
        "FN": 9,
        "TN": 1585,
        "Total_Cost_15x": 578,
        "Total_Cost_5x": 488
      },
      {
        "Decision_Threshold": 0.6,
        "Accuracy": 0.8065693430656934,
        "Precision": 0.2711267605633803,
        "Recall": 0.9390243902439024,
        "F1_Score": 0.4207650273224044,
        "Specificity": 0.7958579881656804,
        "False_Alarm_Ratio": 0.7288732394366197,
        "TP": 154,
        "FP": 414,
        "FN": 10,
        "TN": 1614,
        "Total_Cost_15x": 564,
        "Total_Cost_5x": 464
      },
      {
        "Decision_Threshold": 0.625,
        "Accuracy": 0.8170620437956204,
        "Precision": 0.2825688073394495,
        "Recall": 0.9390243902439024,
        "F1_Score": 0.4344146685472496,
        "Specificity": 0.8071992110453649,
        "False_Alarm_Ratio": 0.7174311926605504,
        "TP": 154,
        "FP": 391,
        "FN": 10,
        "TN": 1637,
        "Total_Cost_15x": 541,
        "Total_Cost_5x": 441
      },
      {
        "Decision_Threshold": 0.65,
        "Accuracy": 0.8266423357664233,
        "Precision": 0.2915057915057915,
        "Recall": 0.9207317073170732,
        "F1_Score": 0.4428152492668621,
        "Specificity": 0.8190335305719921,
        "False_Alarm_Ratio": 0.7084942084942085,
        "TP": 151,
        "FP": 367,
        "FN": 13,
        "TN": 1661,
        "Total_Cost_15x": 562,
        "Total_Cost_5x": 432
      },
      {
        "Decision_Threshold": 0.675,
        "Accuracy": 0.8371350364963503,
        "Precision": 0.3010309278350515,
        "Recall": 0.8902439024390244,
        "F1_Score": 0.4499229583975346,
        "Specificity": 0.8328402366863905,
        "False_Alarm_Ratio": 0.6989690721649484,
        "TP": 146,
        "FP": 339,
        "FN": 18,
        "TN": 1689,
        "Total_Cost_15x": 609,
        "Total_Cost_5x": 429
      },
      {
        "Decision_Threshold": 0.7,
        "Accuracy": 0.8489963503649635,
        "Precision": 0.3172866520787746,
        "Recall": 0.8841463414634146,
        "F1_Score": 0.4669887278582931,
        "Specificity": 0.8461538461538461,
        "False_Alarm_Ratio": 0.6827133479212254,
        "TP": 145,
        "FP": 312,
        "FN": 19,
        "TN": 1716,
        "Total_Cost_15x": 597,
        "Total_Cost_5x": 407
      },
      {
        "Decision_Threshold": 0.725,
        "Accuracy": 0.864963503649635,
        "Precision": 0.3421052631578947,
        "Recall": 0.8719512195121951,
        "F1_Score": 0.4914089347079037,
        "Specificity": 0.8643984220907298,
        "False_Alarm_Ratio": 0.6578947368421053,
        "TP": 143,
        "FP": 275,
        "FN": 21,
        "TN": 1753,
        "Total_Cost_15x": 590,
        "Total_Cost_5x": 380
      },
      {
        "Decision_Threshold": 0.75,
        "Accuracy": 0.8772810218978102,
        "Precision": 0.3636363636363636,
        "Recall": 0.8536585365853658,
        "F1_Score": 0.5100182149362478,
        "Specificity": 0.8791913214990138,
        "False_Alarm_Ratio": 0.6363636363636364,
        "TP": 140,
        "FP": 245,
        "FN": 24,
        "TN": 1783,
        "Total_Cost_15x": 605,
        "Total_Cost_5x": 365
      },
      {
        "Decision_Threshold": 0.775,
        "Accuracy": 0.8877737226277372,
        "Precision": 0.3835227272727273,
        "Recall": 0.823170731707317,
        "F1_Score": 0.5232558139534884,
        "Specificity": 0.8929980276134122,
        "False_Alarm_Ratio": 0.6164772727272727,
        "TP": 135,
        "FP": 217,
        "FN": 29,
        "TN": 1811,
        "Total_Cost_15x": 652,
        "Total_Cost_5x": 362
      },
      {
        "Decision_Threshold": 0.8,
        "Accuracy": 0.8982664233576643,
        "Precision": 0.4069400630914827,
        "Recall": 0.7865853658536586,
        "F1_Score": 0.5363825363825364,
        "Specificity": 0.9072978303747534,
        "False_Alarm_Ratio": 0.5930599369085173,
        "TP": 129,
        "FP": 188,
        "FN": 35,
        "TN": 1840,
        "Total_Cost_15x": 713,
        "Total_Cost_5x": 363
      },
      {
        "Decision_Threshold": 0.825,
        "Accuracy": 0.9119525547445256,
        "Precision": 0.447653429602888,
        "Recall": 0.7560975609756098,
        "F1_Score": 0.562358276643991,
        "Specificity": 0.9245562130177516,
        "False_Alarm_Ratio": 0.552346570397112,
        "TP": 124,
        "FP": 153,
        "FN": 40,
        "TN": 1875,
        "Total_Cost_15x": 753,
        "Total_Cost_5x": 353
      },
      {
        "Decision_Threshold": 0.85,
        "Accuracy": 0.915602189781022,
        "Precision": 0.4574898785425101,
        "Recall": 0.6890243902439024,
        "F1_Score": 0.5498783454987834,
        "Specificity": 0.9339250493096648,
        "False_Alarm_Ratio": 0.5425101214574899,
        "TP": 113,
        "FP": 134,
        "FN": 51,
        "TN": 1894,
        "Total_Cost_15x": 899,
        "Total_Cost_5x": 389
      },
      {
        "Decision_Threshold": 0.875,
        "Accuracy": 0.9297445255474452,
        "Precision": 0.525,
        "Recall": 0.6402439024390244,
        "F1_Score": 0.5769230769230769,
        "Specificity": 0.953155818540434,
        "False_Alarm_Ratio": 0.475,
        "TP": 105,
        "FP": 95,
        "FN": 59,
        "TN": 1933,
        "Total_Cost_15x": 980,
        "Total_Cost_5x": 390
      },
      {
        "Decision_Threshold": 0.9,
        "Accuracy": 0.9338503649635036,
        "Precision": 0.558282208588957,
        "Recall": 0.5548780487804879,
        "F1_Score": 0.5565749235474006,
        "Specificity": 0.9644970414201184,
        "False_Alarm_Ratio": 0.4417177914110429,
        "TP": 91,
        "FP": 72,
        "FN": 73,
        "TN": 1956,
        "Total_Cost_15x": 1167,
        "Total_Cost_5x": 437
      },
      {
        "Decision_Threshold": 0.925,
        "Accuracy": 0.937043795620438,
        "Precision": 0.5970149253731343,
        "Recall": 0.4878048780487805,
        "F1_Score": 0.5369127516778524,
        "Specificity": 0.9733727810650888,
        "False_Alarm_Ratio": 0.4029850746268657,
        "TP": 80,
        "FP": 54,
        "FN": 84,
        "TN": 1974,
        "Total_Cost_15x": 1314,
        "Total_Cost_5x": 474
      },
      {
        "Decision_Threshold": 0.95,
        "Accuracy": 0.937043795620438,
        "Precision": 0.6354166666666666,
        "Recall": 0.3719512195121951,
        "F1_Score": 0.4692307692307692,
        "Specificity": 0.982741617357002,
        "False_Alarm_Ratio": 0.3645833333333333,
        "TP": 61,
        "FP": 35,
        "FN": 103,
        "TN": 1993,
        "Total_Cost_15x": 1580,
        "Total_Cost_5x": 550
      }
    ],
    "svm": [
      {
        "Decision_Threshold": 0.05,
        "Accuracy": 0.7668795620437956,
        "Precision": 0.2301710730948678,
        "Recall": 0.902439024390244,
        "F1_Score": 0.3667905824039653,
        "Specificity": 0.7559171597633136,
        "False_Alarm_Ratio": 0.7698289269051322,
        "TP": 148,
        "FP": 495,
        "FN": 16,
        "TN": 1533,
        "Total_Cost_15x": 735,
        "Total_Cost_5x": 575
      },
      {
        "Decision_Threshold": 0.075,
        "Accuracy": 0.8029197080291971,
        "Precision": 0.2554744525547445,
        "Recall": 0.8536585365853658,
        "F1_Score": 0.3932584269662921,
        "Specificity": 0.7988165680473372,
        "False_Alarm_Ratio": 0.7445255474452555,
        "TP": 140,
        "FP": 408,
        "FN": 24,
        "TN": 1620,
        "Total_Cost_15x": 768,
        "Total_Cost_5x": 528
      },
      {
        "Decision_Threshold": 0.1,
        "Accuracy": 0.8302919708029197,
        "Precision": 0.2842323651452282,
        "Recall": 0.8353658536585366,
        "F1_Score": 0.4241486068111455,
        "Specificity": 0.8298816568047337,
        "False_Alarm_Ratio": 0.7157676348547718,
        "TP": 137,
        "FP": 345,
        "FN": 27,
        "TN": 1683,
        "Total_Cost_15x": 750,
        "Total_Cost_5x": 480
      },
      {
        "Decision_Threshold": 0.125,
        "Accuracy": 0.8453467153284672,
        "Precision": 0.2891566265060241,
        "Recall": 0.7317073170731707,
        "F1_Score": 0.4145077720207253,
        "Specificity": 0.8545364891518737,
        "False_Alarm_Ratio": 0.7108433734939759,
        "TP": 120,
        "FP": 295,
        "FN": 44,
        "TN": 1733,
        "Total_Cost_15x": 955,
        "Total_Cost_5x": 515
      },
      {
        "Decision_Threshold": 0.15,
        "Accuracy": 0.8663321167883211,
        "Precision": 0.3213296398891966,
        "Recall": 0.7073170731707317,
        "F1_Score": 0.4419047619047619,
        "Specificity": 0.8791913214990138,
        "False_Alarm_Ratio": 0.6786703601108033,
        "TP": 116,
        "FP": 245,
        "FN": 48,
        "TN": 1783,
        "Total_Cost_15x": 965,
        "Total_Cost_5x": 485
      },
      {
        "Decision_Threshold": 0.175,
        "Accuracy": 0.8777372262773723,
        "Precision": 0.3354430379746835,
        "Recall": 0.6463414634146342,
        "F1_Score": 0.4416666666666666,
        "Specificity": 0.8964497041420119,
        "False_Alarm_Ratio": 0.6645569620253164,
        "TP": 106,
        "FP": 210,
        "FN": 58,
        "TN": 1818,
        "Total_Cost_15x": 1080,
        "Total_Cost_5x": 500
      },
      {
        "Decision_Threshold": 0.2,
        "Accuracy": 0.8827554744525548,
        "Precision": 0.3402061855670103,
        "Recall": 0.6036585365853658,
        "F1_Score": 0.4351648351648352,
        "Specificity": 0.9053254437869822,
        "False_Alarm_Ratio": 0.6597938144329897,
        "TP": 99,
        "FP": 192,
        "FN": 65,
        "TN": 1836,
        "Total_Cost_15x": 1167,
        "Total_Cost_5x": 517
      },
      {
        "Decision_Threshold": 0.225,
        "Accuracy": 0.8882299270072993,
        "Precision": 0.3424124513618677,
        "Recall": 0.5365853658536586,
        "F1_Score": 0.4180522565320665,
        "Specificity": 0.9166666666666666,
        "False_Alarm_Ratio": 0.6575875486381323,
        "TP": 88,
        "FP": 169,
        "FN": 76,
        "TN": 1859,
        "Total_Cost_15x": 1309,
        "Total_Cost_5x": 549
      },
      {
        "Decision_Threshold": 0.25,
        "Accuracy": 0.8941605839416058,
        "Precision": 0.3468468468468468,
        "Recall": 0.4695121951219512,
        "F1_Score": 0.3989637305699481,
        "Specificity": 0.928500986193294,
        "False_Alarm_Ratio": 0.6531531531531531,
        "TP": 77,
        "FP": 145,
        "FN": 87,
        "TN": 1883,
        "Total_Cost_15x": 1450,
        "Total_Cost_5x": 580
      },
      {
        "Decision_Threshold": 0.275,
        "Accuracy": 0.9005474452554745,
        "Precision": 0.3578947368421052,
        "Recall": 0.4146341463414634,
        "F1_Score": 0.384180790960452,
        "Specificity": 0.9398422090729784,
        "False_Alarm_Ratio": 0.6421052631578947,
        "TP": 68,
        "FP": 122,
        "FN": 96,
        "TN": 1906,
        "Total_Cost_15x": 1562,
        "Total_Cost_5x": 602
      },
      {
        "Decision_Threshold": 0.3,
        "Accuracy": 0.9083029197080292,
        "Precision": 0.3821656050955414,
        "Recall": 0.3658536585365853,
        "F1_Score": 0.3738317757009345,
        "Specificity": 0.9521696252465484,
        "False_Alarm_Ratio": 0.6178343949044586,
        "TP": 60,
        "FP": 97,
        "FN": 104,
        "TN": 1931,
        "Total_Cost_15x": 1657,
        "Total_Cost_5x": 617
      },
      {
        "Decision_Threshold": 0.325,
        "Accuracy": 0.9137773722627736,
        "Precision": 0.4087591240875912,
        "Recall": 0.3414634146341463,
        "F1_Score": 0.3720930232558139,
        "Specificity": 0.9600591715976332,
        "False_Alarm_Ratio": 0.5912408759124088,
        "TP": 56,
        "FP": 81,
        "FN": 108,
        "TN": 1947,
        "Total_Cost_15x": 1701,
        "Total_Cost_5x": 621
      },
      {
        "Decision_Threshold": 0.35,
        "Accuracy": 0.9146897810218978,
        "Precision": 0.3963963963963964,
        "Recall": 0.2682926829268293,
        "F1_Score": 0.32,
        "Specificity": 0.9669625246548323,
        "False_Alarm_Ratio": 0.6036036036036037,
        "TP": 44,
        "FP": 67,
        "FN": 120,
        "TN": 1961,
        "Total_Cost_15x": 1867,
        "Total_Cost_5x": 667
      },
      {
        "Decision_Threshold": 0.375,
        "Accuracy": 0.91742700729927,
        "Precision": 0.4105263157894737,
        "Recall": 0.2378048780487804,
        "F1_Score": 0.3011583011583011,
        "Specificity": 0.9723865877712032,
        "False_Alarm_Ratio": 0.5894736842105264,
        "TP": 39,
        "FP": 56,
        "FN": 125,
        "TN": 1972,
        "Total_Cost_15x": 1931,
        "Total_Cost_5x": 681
      },
      {
        "Decision_Threshold": 0.4,
        "Accuracy": 0.9219890510948904,
        "Precision": 0.4545454545454545,
        "Recall": 0.2134146341463414,
        "F1_Score": 0.2904564315352697,
        "Specificity": 0.9792899408284024,
        "False_Alarm_Ratio": 0.5454545454545454,
        "TP": 35,
        "FP": 42,
        "FN": 129,
        "TN": 1986,
        "Total_Cost_15x": 1977,
        "Total_Cost_5x": 687
      },
      {
        "Decision_Threshold": 0.425,
        "Accuracy": 0.9242700729927008,
        "Precision": 0.4833333333333333,
        "Recall": 0.1768292682926829,
        "F1_Score": 0.2589285714285714,
        "Specificity": 0.9847140039447732,
        "False_Alarm_Ratio": 0.5166666666666666,
        "TP": 29,
        "FP": 31,
        "FN": 135,
        "TN": 1997,
        "Total_Cost_15x": 2056,
        "Total_Cost_5x": 706
      },
      {
        "Decision_Threshold": 0.45,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.5,
        "Recall": 0.1463414634146341,
        "F1_Score": 0.2264150943396226,
        "Specificity": 0.9881656804733728,
        "False_Alarm_Ratio": 0.5,
        "TP": 24,
        "FP": 24,
        "FN": 140,
        "TN": 2004,
        "Total_Cost_15x": 2124,
        "Total_Cost_5x": 724
      },
      {
        "Decision_Threshold": 0.475,
        "Accuracy": 0.9238138686131386,
        "Precision": 0.4666666666666667,
        "Recall": 0.1280487804878048,
        "F1_Score": 0.200956937799043,
        "Specificity": 0.9881656804733728,
        "False_Alarm_Ratio": 0.5333333333333333,
        "TP": 21,
        "FP": 24,
        "FN": 143,
        "TN": 2004,
        "Total_Cost_15x": 2169,
        "Total_Cost_5x": 739
      },
      {
        "Decision_Threshold": 0.5,
        "Accuracy": 0.926094890510949,
        "Precision": 0.5263157894736842,
        "Recall": 0.1219512195121951,
        "F1_Score": 0.198019801980198,
        "Specificity": 0.9911242603550297,
        "False_Alarm_Ratio": 0.4736842105263158,
        "TP": 20,
        "FP": 18,
        "FN": 144,
        "TN": 2010,
        "Total_Cost_15x": 2178,
        "Total_Cost_5x": 738
      },
      {
        "Decision_Threshold": 0.525,
        "Accuracy": 0.9256386861313868,
        "Precision": 0.52,
        "Recall": 0.0792682926829268,
        "F1_Score": 0.1375661375661375,
        "Specificity": 0.9940828402366864,
        "False_Alarm_Ratio": 0.48,
        "TP": 13,
        "FP": 12,
        "FN": 151,
        "TN": 2016,
        "Total_Cost_15x": 2277,
        "Total_Cost_5x": 767
      },
      {
        "Decision_Threshold": 0.55,
        "Accuracy": 0.927007299270073,
        "Precision": 0.6111111111111112,
        "Recall": 0.0670731707317073,
        "F1_Score": 0.1208791208791208,
        "Specificity": 0.9965483234714004,
        "False_Alarm_Ratio": 0.3888888888888888,
        "TP": 11,
        "FP": 7,
        "FN": 153,
        "TN": 2021,
        "Total_Cost_15x": 2302,
        "Total_Cost_5x": 772
      },
      {
        "Decision_Threshold": 0.575,
        "Accuracy": 0.9256386861313868,
        "Precision": 0.5555555555555556,
        "Recall": 0.0304878048780487,
        "F1_Score": 0.0578034682080924,
        "Specificity": 0.9980276134122288,
        "False_Alarm_Ratio": 0.4444444444444444,
        "TP": 5,
        "FP": 4,
        "FN": 159,
        "TN": 2024,
        "Total_Cost_15x": 2389,
        "Total_Cost_5x": 799
      },
      {
        "Decision_Threshold": 0.6,
        "Accuracy": 0.926094890510949,
        "Precision": 0.6666666666666666,
        "Recall": 0.024390243902439,
        "F1_Score": 0.0470588235294117,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 0.3333333333333333,
        "TP": 4,
        "FP": 2,
        "FN": 160,
        "TN": 2026,
        "Total_Cost_15x": 2402,
        "Total_Cost_5x": 802
      },
      {
        "Decision_Threshold": 0.625,
        "Accuracy": 0.926094890510949,
        "Precision": 0.6666666666666666,
        "Recall": 0.024390243902439,
        "F1_Score": 0.0470588235294117,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 0.3333333333333333,
        "TP": 4,
        "FP": 2,
        "FN": 160,
        "TN": 2026,
        "Total_Cost_15x": 2402,
        "Total_Cost_5x": 802
      },
      {
        "Decision_Threshold": 0.65,
        "Accuracy": 0.926094890510949,
        "Precision": 0.6666666666666666,
        "Recall": 0.024390243902439,
        "F1_Score": 0.0470588235294117,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 0.3333333333333333,
        "TP": 4,
        "FP": 2,
        "FN": 160,
        "TN": 2026,
        "Total_Cost_15x": 2402,
        "Total_Cost_5x": 802
      },
      {
        "Decision_Threshold": 0.675,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.5,
        "Recall": 0.0121951219512195,
        "F1_Score": 0.0238095238095238,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 0.5,
        "TP": 2,
        "FP": 2,
        "FN": 162,
        "TN": 2026,
        "Total_Cost_15x": 2432,
        "Total_Cost_5x": 812
      },
      {
        "Decision_Threshold": 0.7,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.5,
        "Recall": 0.0121951219512195,
        "F1_Score": 0.0238095238095238,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 0.5,
        "TP": 2,
        "FP": 2,
        "FN": 162,
        "TN": 2026,
        "Total_Cost_15x": 2432,
        "Total_Cost_5x": 812
      },
      {
        "Decision_Threshold": 0.725,
        "Accuracy": 0.9242700729927008,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 0.9990138067061144,
        "False_Alarm_Ratio": 1.0,
        "TP": 0,
        "FP": 2,
        "FN": 164,
        "TN": 2026,
        "Total_Cost_15x": 2462,
        "Total_Cost_5x": 822
      },
      {
        "Decision_Threshold": 0.75,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.775,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.8,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.825,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.85,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.875,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.9,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.925,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      },
      {
        "Decision_Threshold": 0.95,
        "Accuracy": 0.9251824817518248,
        "Precision": 0.0,
        "Recall": 0.0,
        "F1_Score": 0.0,
        "Specificity": 1.0,
        "False_Alarm_Ratio": 0.0,
        "TP": 0,
        "FP": 0,
        "FN": 164,
        "TN": 2028,
        "Total_Cost_15x": 2460,
        "Total_Cost_5x": 820
      }
    ]
  },
  "case_study": [
    {
      "date": "2024-09-20",
      "PRECTOTCORR": 0.39,
      "RH2M": 81.17,
      "QV2M": 16.4,
      "temp_diurnal_range": 5.149999999999999,
      "precip_roll7": 21.36,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.12877770743579567,
      "lr_prob_task_a": 0.5973196396329992,
      "lr_prob_task_b": 0.44256444239491005
    },
    {
      "date": "2024-09-21",
      "PRECTOTCORR": 1.14,
      "RH2M": 75.57,
      "QV2M": 16.53,
      "temp_diurnal_range": 6.700000000000003,
      "precip_roll7": 18.63,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.08101613342753444,
      "lr_prob_task_a": 0.43638917289887424,
      "lr_prob_task_b": 0.5871818965738996
    },
    {
      "date": "2024-09-22",
      "PRECTOTCORR": 1.11,
      "RH2M": 76.56,
      "QV2M": 17.26,
      "temp_diurnal_range": 6.300000000000001,
      "precip_roll7": 10.36,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.18151626356934983,
      "lr_prob_task_a": 0.32013495291240207,
      "lr_prob_task_b": 0.5482082438177734
    },
    {
      "date": "2024-09-23",
      "PRECTOTCORR": 0.58,
      "RH2M": 78.91,
      "QV2M": 17.89,
      "temp_diurnal_range": 5.199999999999999,
      "precip_roll7": 5.489999999999998,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.18307960674352983,
      "lr_prob_task_a": 0.37853420103171864,
      "lr_prob_task_b": 0.482230245274793
    },
    {
      "date": "2024-09-24",
      "PRECTOTCORR": 47.54,
      "RH2M": 90.47,
      "QV2M": 17.86,
      "temp_diurnal_range": 3.66,
      "precip_roll7": 3.339999999999998,
      "target_extreme": 1,
      "target_extreme_wet95": 1,
      "rf_prob_task_a": 0.13067349619044547,
      "lr_prob_task_a": 0.7154226839398087,
      "lr_prob_task_b": 0.4786178472421361
    },
    {
      "date": "2024-09-25",
      "PRECTOTCORR": 55.89,
      "RH2M": 92.45,
      "QV2M": 16.4,
      "temp_diurnal_range": 2.5500000000000007,
      "precip_roll7": 50.83,
      "target_extreme": 1,
      "target_extreme_wet95": 1,
      "rf_prob_task_a": 0.7189243112650305,
      "lr_prob_task_a": 0.9962086834042571,
      "lr_prob_task_b": 0.999223142222225
    },
    {
      "date": "2024-09-26",
      "PRECTOTCORR": 16.56,
      "RH2M": 92.08,
      "QV2M": 16.17,
      "temp_diurnal_range": 4.609999999999999,
      "precip_roll7": 106.72,
      "target_extreme": 1,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.699196462137349,
      "lr_prob_task_a": 0.9938731095667414,
      "lr_prob_task_b": 0.9990196026074134
    },
    {
      "date": "2024-09-27",
      "PRECTOTCORR": 76.28,
      "RH2M": 91.16,
      "QV2M": 14.69,
      "temp_diurnal_range": 3.4499999999999993,
      "precip_roll7": 123.21000000000001,
      "target_extreme": 1,
      "target_extreme_wet95": 1,
      "rf_prob_task_a": 0.6973464578462734,
      "lr_prob_task_a": 0.8673510815099447,
      "lr_prob_task_b": 0.791027589139531
    },
    {
      "date": "2024-09-28",
      "PRECTOTCORR": 93.26,
      "RH2M": 94.48,
      "QV2M": 14.98,
      "temp_diurnal_range": 4.169999999999998,
      "precip_roll7": 199.10000000000002,
      "target_extreme": 1,
      "target_extreme_wet95": 1,
      "rf_prob_task_a": 0.688085964014975,
      "lr_prob_task_a": 0.9996836632362569,
      "lr_prob_task_b": 0.999991594100551
    },
    {
      "date": "2024-09-29",
      "PRECTOTCORR": 0.43,
      "RH2M": 90.49,
      "QV2M": 16.69,
      "temp_diurnal_range": 5.940000000000001,
      "precip_roll7": 291.22,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.49365443964731626,
      "lr_prob_task_a": 0.9993386197280687,
      "lr_prob_task_b": 0.9999956782528417
    },
    {
      "date": "2024-09-30",
      "PRECTOTCORR": 0.07,
      "RH2M": 92.32,
      "QV2M": 17.41,
      "temp_diurnal_range": 5.41,
      "precip_roll7": 290.53999999999996,
      "target_extreme": 0,
      "target_extreme_wet95": 0,
      "rf_prob_task_a": 0.2237433152284311,
      "lr_prob_task_a": 0.16809024199397618,
      "lr_prob_task_b": 0.19623798261317
    }
  ],
  "fig1": {
    "data": [
      {
        "marker": {
          "color": "#1E3A8A"
        },
        "name": "F1-Score (%)",
        "x": [
          "Logistic Regression",
          "Decision Tree",
          "Support Vector Machine",
          "Random Forest",
          "k-Nearest Neighbours"
        ],
        "y": [
          37.4,
          40.46,
          38.55,
          43.85,
          38.52
        ],
        "type": "bar"
      },
      {
        "marker": {
          "color": "#DC2626"
        },
        "name": "Recall / POD (%)",
        "x": [
          "Logistic Regression",
          "Decision Tree",
          "Support Vector Machine",
          "Random Forest",
          "k-Nearest Neighbours"
        ],
        "y": [
          96.34,
          85.98,
          87.8,
          90.24,
          28.66
        ],
        "type": "bar"
      },
      {
        "marker": {
          "color": "#2563EB"
        },
        "name": "Precision (%)",
        "x": [
          "Logistic Regression",
          "Decision Tree",
          "Support Vector Machine",
          "Random Forest",
          "k-Nearest Neighbours"
        ],
        "y": [
          23.2,
          26.45,
          24.7,
          28.96,
          58.75
        ],
        "type": "bar"
      },
      {
        "marker": {
          "color": "#0D9488"
        },
        "name": "ROC-AUC (\u00d7100%)",
        "x": [
          "Logistic Regression",
          "Decision Tree",
          "Support Vector Machine",
          "Random Forest",
          "k-Nearest Neighbours"
        ],
        "y": [
          94.11,
          87.18,
          90.11,
          93.49,
          82.19
        ],
        "type": "bar"
      },
      {
        "marker": {
          "color": "#D97706"
        },
        "name": "PR-AUC (\u00d7100%)",
        "x": [
          "Logistic Regression",
          "Decision Tree",
          "Support Vector Machine",
          "Random Forest",
          "k-Nearest Neighbours"
        ],
        "y": [
          54.78,
          40.68,
          36.76,
          55.17,
          35.47
        ],
        "type": "bar"
      }
    ],
    "layout": {
      "template": {
        "data": {
          "histogram2dcontour": [
            {
              "type": "histogram2dcontour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "choropleth": [
            {
              "type": "choropleth",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "histogram2d": [
            {
              "type": "histogram2d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "heatmap": [
            {
              "type": "heatmap",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "contourcarpet": [
            {
              "type": "contourcarpet",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "contour": [
            {
              "type": "contour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "surface": [
            {
              "type": "surface",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "mesh3d": [
            {
              "type": "mesh3d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "scatter": [
            {
              "fillpattern": {
                "fillmode": "overlay",
                "size": 10,
                "solidity": 0.2
              },
              "type": "scatter"
            }
          ],
          "parcoords": [
            {
              "type": "parcoords",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolargl": [
            {
              "type": "scatterpolargl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "bar": [
            {
              "error_x": {
                "color": "#2a3f5f"
              },
              "error_y": {
                "color": "#2a3f5f"
              },
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "bar"
            }
          ],
          "scattergeo": [
            {
              "type": "scattergeo",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolar": [
            {
              "type": "scatterpolar",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "histogram": [
            {
              "marker": {
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "histogram"
            }
          ],
          "scattergl": [
            {
              "type": "scattergl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatter3d": [
            {
              "type": "scatter3d",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              },
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattermap": [
            {
              "type": "scattermap",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterternary": [
            {
              "type": "scatterternary",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattercarpet": [
            {
              "type": "scattercarpet",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "carpet": [
            {
              "aaxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "baxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "type": "carpet"
            }
          ],
          "table": [
            {
              "cells": {
                "fill": {
                  "color": "#EBF0F8"
                },
                "line": {
                  "color": "white"
                }
              },
              "header": {
                "fill": {
                  "color": "#C8D4E3"
                },
                "line": {
                  "color": "white"
                }
              },
              "type": "table"
            }
          ],
          "barpolar": [
            {
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "barpolar"
            }
          ],
          "pie": [
            {
              "automargin": true,
              "type": "pie"
            }
          ]
        },
        "layout": {
          "autotypenumbers": "strict",
          "colorway": [
            "#636efa",
            "#EF553B",
            "#00cc96",
            "#ab63fa",
            "#FFA15A",
            "#19d3f3",
            "#FF6692",
            "#B6E880",
            "#FF97FF",
            "#FECB52"
          ],
          "font": {
            "color": "#2a3f5f"
          },
          "hovermode": "closest",
          "hoverlabel": {
            "align": "left"
          },
          "paper_bgcolor": "white",
          "plot_bgcolor": "#E5ECF6",
          "polar": {
            "bgcolor": "#E5ECF6",
            "angularaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "radialaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "ternary": {
            "bgcolor": "#E5ECF6",
            "aaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "baxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "caxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "coloraxis": {
            "colorbar": {
              "outlinewidth": 0,
              "ticks": ""
            }
          },
          "colorscale": {
            "sequential": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "sequentialminus": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "diverging": [
              [
                0,
                "#8e0152"
              ],
              [
                0.1,
                "#c51b7d"
              ],
              [
                0.2,
                "#de77ae"
              ],
              [
                0.3,
                "#f1b6da"
              ],
              [
                0.4,
                "#fde0ef"
              ],
              [
                0.5,
                "#f7f7f7"
              ],
              [
                0.6,
                "#e6f5d0"
              ],
              [
                0.7,
                "#b8e186"
              ],
              [
                0.8,
                "#7fbc41"
              ],
              [
                0.9,
                "#4d9221"
              ],
              [
                1,
                "#276419"
              ]
            ]
          },
          "xaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "yaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "scene": {
            "xaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "yaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "zaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            }
          },
          "shapedefaults": {
            "line": {
              "color": "#2a3f5f"
            }
          },
          "annotationdefaults": {
            "arrowcolor": "#2a3f5f",
            "arrowhead": 0,
            "arrowwidth": 1
          },
          "geo": {
            "bgcolor": "white",
            "landcolor": "#E5ECF6",
            "subunitcolor": "white",
            "showland": true,
            "showlakes": true,
            "lakecolor": "white"
          },
          "title": {
            "x": 0.05
          }
        }
      },
      "title": {
        "font": {
          "size": 16,
          "color": "#0F172A"
        },
        "text": "<b>Out-of-Sample Classifier Performance Benchmarks (2019-2024 Holdout, N = 2,192 Days)</b>"
      },
      "margin": {
        "l": 60,
        "r": 40,
        "t": 70,
        "b": 60
      },
      "legend": {
        "font": {
          "size": 12
        },
        "orientation": "h",
        "yanchor": "bottom",
        "y": 1.02,
        "xanchor": "center",
        "x": 0.5
      },
      "yaxis": {
        "title": {
          "text": "Metric Score (%)"
        },
        "gridcolor": "#E2E8F0"
      },
      "xaxis": {
        "tickfont": {
          "size": 13,
          "weight": "bold"
        },
        "gridcolor": "#F1F5F9"
      },
      "barmode": "group",
      "autosize": true,
      "height": 480,
      "plot_bgcolor": "#F8FAFC",
      "paper_bgcolor": "#FFFFFF"
    }
  },
  "fig2": {
    "data": [
      {
        "line": {
          "color": "#DC2626",
          "width": 2.5
        },
        "name": "Recall (%)",
        "x": {
          "dtype": "f8",
          "bdata": "mpmZmZmZqT8zMzMzMzOzP5qZmZmZmbk/AAAAAAAAwD8zMzMzMzPDP2ZmZmZmZsY/mpmZmZmZyT/NzMzMzMzMPwAAAAAAANA/mpmZmZmZ0T8zMzMzMzPTP83MzMzMzNQ/ZmZmZmZm1j8AAAAAAADYP5qZmZmZmdk/MzMzMzMz2z/NzMzMzMzcP2ZmZmZmZt4/AAAAAAAA4D/NzMzMzMzgP5qZmZmZmeE/ZmZmZmZm4j8zMzMzMzPjPwAAAAAAAOQ/zczMzMzM5D+amZmZmZnlP2ZmZmZmZuY/MzMzMzMz5z8AAAAAAADoP83MzMzMzOg/mpmZmZmZ6T9mZmZmZmbqPzMzMzMzM+s/AAAAAAAA7D/NzMzMzMzsP5qZmZmZme0/ZmZmZmZm7j8="
        },
        "y": {
          "dtype": "f8",
          "bdata": "AAAAAAAAWUAAAAAAAABZQAAAAAAAAFlAAAAAAAAAWUAZnI/B+dhYQBmcj8H52FhAGZyPwfnYWEAyOB+D87FYQDI4H4PzsVhAS9SuRO2KWEBL1K5E7YpYQH0MzsfgPFhAr0TtStTuV0CvRO1K1O5XQK9E7UrU7ldA+Ricj8F5V0AsUbsStStXQF6J2pWo3VZAkMH5GJyPVkCQwfkYnI9WQJDB+Ricj1ZADM7H4HzMVUA+BudjcH5VQHA+BudjMFVAuxK1K1G7VEDtStSuRG1UQDgfg/Mx+FNAGZyPwfmYUkATtStRuxJRQCxRuxK161BAwvkYnI8BUEB2JWpXovZMQJyPwfkYnElA9DE4H4PzRUCvRO1K1K5BQHE+BudjcDtAnI/B+RicKUA="
        },
        "type": "scatter",
        "xaxis": "x",
        "yaxis": "y"
      },
      {
        "line": {
          "color": "#2563EB",
          "width": 2.5
        },
        "name": "Precision (%)",
        "x": {
          "dtype": "f8",
          "bdata": "mpmZmZmZqT8zMzMzMzOzP5qZmZmZmbk/AAAAAAAAwD8zMzMzMzPDP2ZmZmZmZsY/mpmZmZmZyT/NzMzMzMzMPwAAAAAAANA/mpmZmZmZ0T8zMzMzMzPTP83MzMzMzNQ/ZmZmZmZm1j8AAAAAAADYP5qZmZmZmdk/MzMzMzMz2z/NzMzMzMzcP2ZmZmZmZt4/AAAAAAAA4D/NzMzMzMzgP5qZmZmZmeE/ZmZmZmZm4j8zMzMzMzPjPwAAAAAAAOQ/zczMzMzM5D+amZmZmZnlP2ZmZmZmZuY/MzMzMzMz5z8AAAAAAADoP83MzMzMzOg/mpmZmZmZ6T9mZmZmZmbqPzMzMzMzM+s/AAAAAAAA7D/NzMzMzMzsP5qZmZmZme0/ZmZmZmZm7j8="
        },
        "y": {
          "dtype": "f8",
          "bdata": "juM4juN4LECuZHoviZEuQF9qiR5cTTBAo7If2nQ1MUDmDI/RyUAyQAd4q2JoJzNApAw83ZofNEAFBEOyRTQ1QON5fy/YGTZAv8gZFlwqN0DJ4r2tliw4QHWPWcXtnDhAkAZpkAYpOUD9Y6x4VG46QCRGjBgx4jpAfnP2lnxaO0AaYbmnEZY7QK9oWuWL4TtAZ8+ePXv2PEBaX3y4ovU9QNkhcGMZlD5A5DiO4ziOPkDYgGxANiA/QEZpfGQCPUBAG5K+XJrfQEBP6NMmQTlBQKponlALGEJAw93LKoGKQkBCFei6jWBDQEHl7BZ+tURAbCivobwGR0AAAAAAAABJQOnlT1towEpAzMzMzMzMTEAvu+yyyy5PQIsuuuiiC1FAAAAAAAAAVUA="
        },
        "type": "scatter",
        "xaxis": "x",
        "yaxis": "y"
      },
      {
        "line": {
          "color": "#1E3A8A",
          "width": 2.5
        },
        "name": "F1-Score (%)",
        "x": {
          "dtype": "f8",
          "bdata": "mpmZmZmZqT8zMzMzMzOzP5qZmZmZmbk/AAAAAAAAwD8zMzMzMzPDP2ZmZmZmZsY/mpmZmZmZyT/NzMzMzMzMPwAAAAAAANA/mpmZmZmZ0T8zMzMzMzPTP83MzMzMzNQ/ZmZmZmZm1j8AAAAAAADYP5qZmZmZmdk/MzMzMzMz2z/NzMzMzMzcP2ZmZmZmZt4/AAAAAAAA4D/NzMzMzMzgP5qZmZmZmeE/ZmZmZmZm4j8zMzMzMzPjPwAAAAAAAOQ/zczMzMzM5D+amZmZmZnlP2ZmZmZmZuY/MzMzMzMz5z8AAAAAAADoP83MzMzMzOg/mpmZmZmZ6T9mZmZmZmbqPzMzMzMzM+s/AAAAAAAA7D/NzMzMzMzsP5qZmZmZme0/ZmZmZmZm7j8="
        },
        "y": {
          "dtype": "f8",
          "bdata": "jfOPD4zsOEA7WhwbCYQ6QIzACIzACDxAsnnRRkddPUA3Xhuvjdc+QNhfnAwiD0BA2neEXDC8QEBzTyMs93RBQGYboE9pD0JAfPOdKiO+QkBNnV97yGVDQBPaS2gvoUNAq0wB84HsQ0APnmLqX7ZEQP3liBRD/URA6Y1bZNUuRUBqa/zdPEJFQOEVXuEVXkVA0V5CewntRUAoZY4BDn5GQMQiZeDp1kZAQVQ6smegRkBRtZM8PtpGQK0bTJHPekdAcCpuVGP8R0B2AOdFQTtIQJ/Emleq50hAZ+L8XRe/SEBx5WIdXLlIQBzHcRzHsUlAkiRJkiTJSkCNT5l2DtZKQOXgZr8QK0pAnq28y9rpSEBvkW6RbpFGQFnIQhaykENAjuM4juM4NkA="
        },
        "type": "scatter",
        "xaxis": "x",
        "yaxis": "y"
      },
      {
        "line": {
          "color": "#1E3A8A",
          "width": 2.5
        },
        "name": "RF 15:1 Cost",
        "x": {
          "dtype": "f8",
          "bdata": "mpmZmZmZqT8zMzMzMzOzP5qZmZmZmbk/AAAAAAAAwD8zMzMzMzPDP2ZmZmZmZsY/mpmZmZmZyT/NzMzMzMzMPwAAAAAAANA/mpmZmZmZ0T8zMzMzMzPTP83MzMzMzNQ/ZmZmZmZm1j8AAAAAAADYP5qZmZmZmdk/MzMzMzMz2z/NzMzMzMzcP2ZmZmZmZt4/AAAAAAAA4D/NzMzMzMzgP5qZmZmZmeE/ZmZmZmZm4j8zMzMzMzPjPwAAAAAAAOQ/zczMzMzM5D+amZmZmZnlP2ZmZmZmZuY/MzMzMzMz5z8AAAAAAADoP83MzMzMzOg/mpmZmZmZ6T9mZmZmZmbqPzMzMzMzM+s/AAAAAAAA7D/NzMzMzMzsP5qZmZmZme0/ZmZmZmZm7j8="
        },
        "y": {
          "dtype": "i2",
          "bdata": "3AONA0oDFQPpAr8ClgJ4AlkCQwImAjICPAIeAhQCLwJDAlYCWwJKAkACgAKRApgCrwLBAtYCRQO9A7gD8ANqBPkEmQVZBg4HZQg="
        },
        "type": "scatter",
        "xaxis": "x2",
        "yaxis": "y2"
      },
      {
        "line": {
          "color": "#DC2626",
          "dash": "dot",
          "width": 2
        },
        "name": "LR 15:1 Cost",
        "x": {
          "dtype": "f8",
          "bdata": "mpmZmZmZqT8zMzMzMzOzP5qZmZmZmbk/AAAAAAAAwD8zMzMzMzPDP2ZmZmZmZsY/mpmZmZmZyT/NzMzMzMzMPwAAAAAAANA/mpmZmZmZ0T8zMzMzMzPTP83MzMzMzNQ/ZmZmZmZm1j8AAAAAAADYP5qZmZmZmdk/MzMzMzMz2z/NzMzMzMzcP2ZmZmZmZt4/AAAAAAAA4D/NzMzMzMzgP5qZmZmZmeE/ZmZmZmZm4j8zMzMzMzPjPwAAAAAAAOQ/zczMzMzM5D+amZmZmZnlP2ZmZmZmZuY/MzMzMzMz5z8AAAAAAADoP83MzMzMzOg/mpmZmZmZ6T9mZmZmZmbqPzMzMzMzM+s/AAAAAAAA7D/NzMzMzMzsP5qZmZmZme0/ZmZmZmZm7j8="
        },
        "y": {
          "dtype": "i2",
          "bdata": "6gVEBcQEXwT5A64DgQNyA1EDLAMEA+QCxgKwAqgCjAJtAm8CZQJVAjkCQgI0Ah0CMgJhAlUCTgJdAowCyQLxAoMD1AOPBCIFLAY="
        },
        "type": "scatter",
        "xaxis": "x2",
        "yaxis": "y2"
      }
    ],
    "layout": {
      "template": {
        "data": {
          "histogram2dcontour": [
            {
              "type": "histogram2dcontour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "choropleth": [
            {
              "type": "choropleth",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "histogram2d": [
            {
              "type": "histogram2d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "heatmap": [
            {
              "type": "heatmap",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "contourcarpet": [
            {
              "type": "contourcarpet",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "contour": [
            {
              "type": "contour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "surface": [
            {
              "type": "surface",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "mesh3d": [
            {
              "type": "mesh3d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "scatter": [
            {
              "fillpattern": {
                "fillmode": "overlay",
                "size": 10,
                "solidity": 0.2
              },
              "type": "scatter"
            }
          ],
          "parcoords": [
            {
              "type": "parcoords",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolargl": [
            {
              "type": "scatterpolargl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "bar": [
            {
              "error_x": {
                "color": "#2a3f5f"
              },
              "error_y": {
                "color": "#2a3f5f"
              },
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "bar"
            }
          ],
          "scattergeo": [
            {
              "type": "scattergeo",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolar": [
            {
              "type": "scatterpolar",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "histogram": [
            {
              "marker": {
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "histogram"
            }
          ],
          "scattergl": [
            {
              "type": "scattergl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatter3d": [
            {
              "type": "scatter3d",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              },
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattermap": [
            {
              "type": "scattermap",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterternary": [
            {
              "type": "scatterternary",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattercarpet": [
            {
              "type": "scattercarpet",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "carpet": [
            {
              "aaxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "baxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "type": "carpet"
            }
          ],
          "table": [
            {
              "cells": {
                "fill": {
                  "color": "#EBF0F8"
                },
                "line": {
                  "color": "white"
                }
              },
              "header": {
                "fill": {
                  "color": "#C8D4E3"
                },
                "line": {
                  "color": "white"
                }
              },
              "type": "table"
            }
          ],
          "barpolar": [
            {
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "barpolar"
            }
          ],
          "pie": [
            {
              "automargin": true,
              "type": "pie"
            }
          ]
        },
        "layout": {
          "autotypenumbers": "strict",
          "colorway": [
            "#636efa",
            "#EF553B",
            "#00cc96",
            "#ab63fa",
            "#FFA15A",
            "#19d3f3",
            "#FF6692",
            "#B6E880",
            "#FF97FF",
            "#FECB52"
          ],
          "font": {
            "color": "#2a3f5f"
          },
          "hovermode": "closest",
          "hoverlabel": {
            "align": "left"
          },
          "paper_bgcolor": "white",
          "plot_bgcolor": "#E5ECF6",
          "polar": {
            "bgcolor": "#E5ECF6",
            "angularaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "radialaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "ternary": {
            "bgcolor": "#E5ECF6",
            "aaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "baxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "caxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "coloraxis": {
            "colorbar": {
              "outlinewidth": 0,
              "ticks": ""
            }
          },
          "colorscale": {
            "sequential": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "sequentialminus": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "diverging": [
              [
                0,
                "#8e0152"
              ],
              [
                0.1,
                "#c51b7d"
              ],
              [
                0.2,
                "#de77ae"
              ],
              [
                0.3,
                "#f1b6da"
              ],
              [
                0.4,
                "#fde0ef"
              ],
              [
                0.5,
                "#f7f7f7"
              ],
              [
                0.6,
                "#e6f5d0"
              ],
              [
                0.7,
                "#b8e186"
              ],
              [
                0.8,
                "#7fbc41"
              ],
              [
                0.9,
                "#4d9221"
              ],
              [
                1,
                "#276419"
              ]
            ]
          },
          "xaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "yaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "scene": {
            "xaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "yaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "zaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            }
          },
          "shapedefaults": {
            "line": {
              "color": "#2a3f5f"
            }
          },
          "annotationdefaults": {
            "arrowcolor": "#2a3f5f",
            "arrowhead": 0,
            "arrowwidth": 1
          },
          "geo": {
            "bgcolor": "white",
            "landcolor": "#E5ECF6",
            "subunitcolor": "white",
            "showland": true,
            "showlakes": true,
            "lakecolor": "white"
          },
          "title": {
            "x": 0.05
          }
        }
      },
      "xaxis": {
        "anchor": "y",
        "domain": [
          0.0,
          0.45
        ],
        "title": {
          "text": "Decision Threshold (\u03c4)"
        },
        "gridcolor": "#E2E8F0"
      },
      "yaxis": {
        "anchor": "x",
        "domain": [
          0.0,
          1.0
        ],
        "title": {
          "text": "Metric Score (%)"
        },
        "gridcolor": "#E2E8F0"
      },
      "xaxis2": {
        "anchor": "y2",
        "domain": [
          0.55,
          1.0
        ],
        "title": {
          "text": "Decision Threshold (\u03c4)"
        },
        "gridcolor": "#E2E8F0"
      },
      "yaxis2": {
        "anchor": "x2",
        "domain": [
          0.0,
          1.0
        ],
        "title": {
          "text": "Total Loss L(\u03c4)"
        },
        "gridcolor": "#E2E8F0"
      },
      "annotations": [
        {
          "font": {
            "size": 16
          },
          "showarrow": false,
          "text": "Random Forest Metric Trade-Off",
          "x": 0.225,
          "xanchor": "center",
          "xref": "paper",
          "y": 1.0,
          "yanchor": "bottom",
          "yref": "paper"
        },
        {
          "font": {
            "size": 16
          },
          "showarrow": false,
          "text": "Asymmetric 15:1 Disaster Loss L(\u03c4)",
          "x": 0.775,
          "xanchor": "center",
          "xref": "paper",
          "y": 1.0,
          "yanchor": "bottom",
          "yref": "paper"
        },
        {
          "showarrow": false,
          "text": "OOF \u03c4*=0.30",
          "x": 0.3,
          "xanchor": "left",
          "xref": "x",
          "y": 1,
          "yanchor": "top",
          "yref": "y domain"
        },
        {
          "showarrow": false,
          "text": "OOF \u03c4*=0.30",
          "x": 0.3,
          "xanchor": "left",
          "xref": "x2",
          "y": 1,
          "yanchor": "top",
          "yref": "y2 domain"
        }
      ],
      "shapes": [
        {
          "line": {
            "color": "#7C3AED",
            "dash": "dash",
            "width": 2
          },
          "type": "line",
          "x0": 0.3,
          "x1": 0.3,
          "xref": "x",
          "y0": 0,
          "y1": 1,
          "yref": "y domain"
        },
        {
          "line": {
            "color": "#7C3AED",
            "dash": "dash",
            "width": 2
          },
          "type": "line",
          "x0": 0.3,
          "x1": 0.3,
          "xref": "x2",
          "y0": 0,
          "y1": 1,
          "yref": "y2 domain"
        }
      ],
      "title": {
        "font": {
          "size": 16,
          "color": "#0F172A"
        },
        "text": "<b>Operational Asymmetric Cost-Sensitive Threshold Sweep (15:1 Missed Flood Penalty)</b>"
      },
      "margin": {
        "l": 60,
        "r": 60,
        "t": 80,
        "b": 60
      },
      "legend": {
        "font": {
          "size": 11
        },
        "orientation": "h",
        "yanchor": "bottom",
        "y": 1.02,
        "xanchor": "center",
        "x": 0.5
      },
      "autosize": true,
      "height": 480,
      "plot_bgcolor": "#F8FAFC",
      "paper_bgcolor": "#FFFFFF"
    }
  },
  "fig3": {
    "data": [
      {
        "marker": {
          "color": [
            "#3B82F6",
            "#3B82F6",
            "#3B82F6",
            "#3B82F6",
            "#DC2626",
            "#DC2626",
            "#DC2626",
            "#DC2626",
            "#DC2626",
            "#3B82F6",
            "#3B82F6"
          ]
        },
        "name": "Observed Rainfall (mm)",
        "x": [
          "2024-09-20",
          "2024-09-21",
          "2024-09-22",
          "2024-09-23",
          "2024-09-24",
          "2024-09-25",
          "2024-09-26",
          "2024-09-27",
          "2024-09-28",
          "2024-09-29",
          "2024-09-30"
        ],
        "y": [
          0.39,
          1.14,
          1.11,
          0.58,
          47.54,
          55.89,
          16.56,
          76.28,
          93.26,
          0.43,
          0.07
        ],
        "type": "bar",
        "xaxis": "x",
        "yaxis": "y"
      },
      {
        "line": {
          "color": "#DC2626",
          "width": 2.5
        },
        "name": "Logistic Regression (Same-Day)",
        "x": [
          "2024-09-20",
          "2024-09-21",
          "2024-09-22",
          "2024-09-23",
          "2024-09-24",
          "2024-09-25",
          "2024-09-26",
          "2024-09-27",
          "2024-09-28",
          "2024-09-29",
          "2024-09-30"
        ],
        "y": [
          0.5973196396329992,
          0.43638917289887424,
          0.32013495291240207,
          0.37853420103171864,
          0.7154226839398087,
          0.9962086834042571,
          0.9938731095667414,
          0.8673510815099447,
          0.9996836632362569,
          0.9993386197280687,
          0.16809024199397618
        ],
        "type": "scatter",
        "xaxis": "x2",
        "yaxis": "y2"
      },
      {
        "line": {
          "color": "#1E3A8A",
          "width": 2.5
        },
        "name": "Random Forest (Same-Day)",
        "x": [
          "2024-09-20",
          "2024-09-21",
          "2024-09-22",
          "2024-09-23",
          "2024-09-24",
          "2024-09-25",
          "2024-09-26",
          "2024-09-27",
          "2024-09-28",
          "2024-09-29",
          "2024-09-30"
        ],
        "y": [
          0.12877770743579567,
          0.08101613342753444,
          0.18151626356934983,
          0.18307960674352983,
          0.13067349619044547,
          0.7189243112650305,
          0.699196462137349,
          0.6973464578462734,
          0.688085964014975,
          0.49365443964731626,
          0.2237433152284311
        ],
        "type": "scatter",
        "xaxis": "x2",
        "yaxis": "y2"
      },
      {
        "line": {
          "color": "#0D9488",
          "dash": "dash",
          "width": 2
        },
        "name": "Logistic Regression (24-h Lead)",
        "x": [
          "2024-09-20",
          "2024-09-21",
          "2024-09-22",
          "2024-09-23",
          "2024-09-24",
          "2024-09-25",
          "2024-09-26",
          "2024-09-27",
          "2024-09-28",
          "2024-09-29",
          "2024-09-30"
        ],
        "y": [
          0.44256444239491005,
          0.5871818965738996,
          0.5482082438177734,
          0.482230245274793,
          0.4786178472421361,
          0.999223142222225,
          0.9990196026074134,
          0.791027589139531,
          0.999991594100551,
          0.9999956782528417,
          0.19623798261317
        ],
        "type": "scatter",
        "xaxis": "x2",
        "yaxis": "y2"
      }
    ],
    "layout": {
      "template": {
        "data": {
          "histogram2dcontour": [
            {
              "type": "histogram2dcontour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "choropleth": [
            {
              "type": "choropleth",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "histogram2d": [
            {
              "type": "histogram2d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "heatmap": [
            {
              "type": "heatmap",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "contourcarpet": [
            {
              "type": "contourcarpet",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "contour": [
            {
              "type": "contour",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "surface": [
            {
              "type": "surface",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              },
              "colorscale": [
                [
                  0.0,
                  "#0d0887"
                ],
                [
                  0.1111111111111111,
                  "#46039f"
                ],
                [
                  0.2222222222222222,
                  "#7201a8"
                ],
                [
                  0.3333333333333333,
                  "#9c179e"
                ],
                [
                  0.4444444444444444,
                  "#bd3786"
                ],
                [
                  0.5555555555555556,
                  "#d8576b"
                ],
                [
                  0.6666666666666666,
                  "#ed7953"
                ],
                [
                  0.7777777777777778,
                  "#fb9f3a"
                ],
                [
                  0.8888888888888888,
                  "#fdca26"
                ],
                [
                  1.0,
                  "#f0f921"
                ]
              ]
            }
          ],
          "mesh3d": [
            {
              "type": "mesh3d",
              "colorbar": {
                "outlinewidth": 0,
                "ticks": ""
              }
            }
          ],
          "scatter": [
            {
              "fillpattern": {
                "fillmode": "overlay",
                "size": 10,
                "solidity": 0.2
              },
              "type": "scatter"
            }
          ],
          "parcoords": [
            {
              "type": "parcoords",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolargl": [
            {
              "type": "scatterpolargl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "bar": [
            {
              "error_x": {
                "color": "#2a3f5f"
              },
              "error_y": {
                "color": "#2a3f5f"
              },
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "bar"
            }
          ],
          "scattergeo": [
            {
              "type": "scattergeo",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterpolar": [
            {
              "type": "scatterpolar",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "histogram": [
            {
              "marker": {
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "histogram"
            }
          ],
          "scattergl": [
            {
              "type": "scattergl",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatter3d": [
            {
              "type": "scatter3d",
              "line": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              },
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattermap": [
            {
              "type": "scattermap",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scatterternary": [
            {
              "type": "scatterternary",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "scattercarpet": [
            {
              "type": "scattercarpet",
              "marker": {
                "colorbar": {
                  "outlinewidth": 0,
                  "ticks": ""
                }
              }
            }
          ],
          "carpet": [
            {
              "aaxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "baxis": {
                "endlinecolor": "#2a3f5f",
                "gridcolor": "white",
                "linecolor": "white",
                "minorgridcolor": "white",
                "startlinecolor": "#2a3f5f"
              },
              "type": "carpet"
            }
          ],
          "table": [
            {
              "cells": {
                "fill": {
                  "color": "#EBF0F8"
                },
                "line": {
                  "color": "white"
                }
              },
              "header": {
                "fill": {
                  "color": "#C8D4E3"
                },
                "line": {
                  "color": "white"
                }
              },
              "type": "table"
            }
          ],
          "barpolar": [
            {
              "marker": {
                "line": {
                  "color": "#E5ECF6",
                  "width": 0.5
                },
                "pattern": {
                  "fillmode": "overlay",
                  "size": 10,
                  "solidity": 0.2
                }
              },
              "type": "barpolar"
            }
          ],
          "pie": [
            {
              "automargin": true,
              "type": "pie"
            }
          ]
        },
        "layout": {
          "autotypenumbers": "strict",
          "colorway": [
            "#636efa",
            "#EF553B",
            "#00cc96",
            "#ab63fa",
            "#FFA15A",
            "#19d3f3",
            "#FF6692",
            "#B6E880",
            "#FF97FF",
            "#FECB52"
          ],
          "font": {
            "color": "#2a3f5f"
          },
          "hovermode": "closest",
          "hoverlabel": {
            "align": "left"
          },
          "paper_bgcolor": "white",
          "plot_bgcolor": "#E5ECF6",
          "polar": {
            "bgcolor": "#E5ECF6",
            "angularaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "radialaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "ternary": {
            "bgcolor": "#E5ECF6",
            "aaxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "baxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            },
            "caxis": {
              "gridcolor": "white",
              "linecolor": "white",
              "ticks": ""
            }
          },
          "coloraxis": {
            "colorbar": {
              "outlinewidth": 0,
              "ticks": ""
            }
          },
          "colorscale": {
            "sequential": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "sequentialminus": [
              [
                0.0,
                "#0d0887"
              ],
              [
                0.1111111111111111,
                "#46039f"
              ],
              [
                0.2222222222222222,
                "#7201a8"
              ],
              [
                0.3333333333333333,
                "#9c179e"
              ],
              [
                0.4444444444444444,
                "#bd3786"
              ],
              [
                0.5555555555555556,
                "#d8576b"
              ],
              [
                0.6666666666666666,
                "#ed7953"
              ],
              [
                0.7777777777777778,
                "#fb9f3a"
              ],
              [
                0.8888888888888888,
                "#fdca26"
              ],
              [
                1.0,
                "#f0f921"
              ]
            ],
            "diverging": [
              [
                0,
                "#8e0152"
              ],
              [
                0.1,
                "#c51b7d"
              ],
              [
                0.2,
                "#de77ae"
              ],
              [
                0.3,
                "#f1b6da"
              ],
              [
                0.4,
                "#fde0ef"
              ],
              [
                0.5,
                "#f7f7f7"
              ],
              [
                0.6,
                "#e6f5d0"
              ],
              [
                0.7,
                "#b8e186"
              ],
              [
                0.8,
                "#7fbc41"
              ],
              [
                0.9,
                "#4d9221"
              ],
              [
                1,
                "#276419"
              ]
            ]
          },
          "xaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "yaxis": {
            "gridcolor": "white",
            "linecolor": "white",
            "ticks": "",
            "title": {
              "standoff": 15
            },
            "zerolinecolor": "white",
            "automargin": true,
            "zerolinewidth": 2
          },
          "scene": {
            "xaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "yaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            },
            "zaxis": {
              "backgroundcolor": "#E5ECF6",
              "gridcolor": "white",
              "linecolor": "white",
              "showbackground": true,
              "ticks": "",
              "zerolinecolor": "white",
              "gridwidth": 2
            }
          },
          "shapedefaults": {
            "line": {
              "color": "#2a3f5f"
            }
          },
          "annotationdefaults": {
            "arrowcolor": "#2a3f5f",
            "arrowhead": 0,
            "arrowwidth": 1
          },
          "geo": {
            "bgcolor": "white",
            "landcolor": "#E5ECF6",
            "subunitcolor": "white",
            "showland": true,
            "showlakes": true,
            "lakecolor": "white"
          },
          "title": {
            "x": 0.05
          }
        }
      },
      "xaxis": {
        "anchor": "y",
        "domain": [
          0.0,
          1.0
        ],
        "matches": "x2",
        "showticklabels": false
      },
      "yaxis": {
        "anchor": "x",
        "domain": [
          0.55,
          1.0
        ],
        "title": {
          "text": "Rainfall (mm/day)"
        },
        "gridcolor": "#E2E8F0"
      },
      "xaxis2": {
        "anchor": "y2",
        "domain": [
          0.0,
          1.0
        ],
        "title": {
          "text": "Observation Date (September 2024)"
        },
        "gridcolor": "#E2E8F0"
      },
      "yaxis2": {
        "anchor": "x2",
        "domain": [
          0.0,
          0.45
        ],
        "title": {
          "text": "Alarm Probability P(Y=1)"
        },
        "range": [
          0,
          1.05
        ],
        "gridcolor": "#E2E8F0"
      },
      "annotations": [
        {
          "font": {
            "size": 16
          },
          "showarrow": false,
          "text": "MERRA-2 Daily Rainfall (mm/day)",
          "x": 0.5,
          "xanchor": "center",
          "xref": "paper",
          "y": 1.0,
          "yanchor": "bottom",
          "yref": "paper"
        },
        {
          "font": {
            "size": 16
          },
          "showarrow": false,
          "text": "Classifier Extreme Probability Warnings",
          "x": 0.5,
          "xanchor": "center",
          "xref": "paper",
          "y": 0.45,
          "yanchor": "bottom",
          "yref": "paper"
        },
        {
          "showarrow": false,
          "text": "P95 = 13.74 mm",
          "x": 1,
          "xanchor": "right",
          "xref": "x domain",
          "y": 13.74,
          "yanchor": "bottom",
          "yref": "y"
        },
        {
          "showarrow": false,
          "text": "OOF \u03c4* = 0.30",
          "x": 1,
          "xanchor": "right",
          "xref": "x2 domain",
          "y": 0.3,
          "yanchor": "bottom",
          "yref": "y2"
        }
      ],
      "shapes": [
        {
          "line": {
            "color": "#DC2626",
            "dash": "dash",
            "width": 1.5
          },
          "type": "line",
          "x0": 0,
          "x1": 1,
          "xref": "x domain",
          "y0": 13.74,
          "y1": 13.74,
          "yref": "y"
        },
        {
          "line": {
            "color": "#7C3AED",
            "dash": "dot",
            "width": 1.5
          },
          "type": "line",
          "x0": 0,
          "x1": 1,
          "xref": "x2 domain",
          "y0": 0.3,
          "y1": 0.3,
          "yref": "y2"
        }
      ],
      "title": {
        "font": {
          "size": 16,
          "color": "#0F172A"
        },
        "text": "<b>Real-World Operational Case Study: 20\u201330 September 2024 Kathmandu Extreme Flood Event</b>"
      },
      "margin": {
        "l": 60,
        "r": 60,
        "t": 80,
        "b": 60
      },
      "legend": {
        "font": {
          "size": 11
        },
        "orientation": "h",
        "yanchor": "bottom",
        "y": 1.02,
        "xanchor": "center",
        "x": 0.5
      },
      "autosize": true,
      "height": 540,
      "plot_bgcolor": "#F8FAFC",
      "paper_bgcolor": "#FFFFFF"
    }
  },
  "sensitivity_tasks": {
    "Task_A_SameDay_RF": {
      "Accuracy": 0.8270985401459854,
      "Precision": 0.2896281800391389,
      "Recall": 0.9024390243902439,
      "F1_Score": 0.43851851851851853,
      "F1_Macro": 0.6681673207313541,
      "Specificity": 0.8210059171597633,
      "ROC_AUC": 0.9349352960985232,
      "PR_AUC": 0.5516613989737256,
      "Brier_Score": 0.11539781532847312,
      "TN": 1665,
      "FP": 363,
      "FN": 16,
      "TP": 148,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Random Forest",
      "CV_F1": 0.378,
      "CV_Std": 0.0429,
      "Fit_Runtime_Sec": 1.2909,
      "Test_Inference_Sec": 0.029,
      "F1_CI_95_Block7": "[38.17%, 49.14%]",
      "F1_CI_95_IID": "[39.22%, 48.48%]",
      "F1_CI_95": "[38.17%, 49.14%]"
    },
    "Task_A_SameDay_LR": {
      "Accuracy": 0.7586678832116789,
      "Precision": 0.23201174743024963,
      "Recall": 0.9634146341463414,
      "F1_Score": 0.3739644970414201,
      "F1_Macro": 0.6122436217899951,
      "Specificity": 0.7421104536489151,
      "ROC_AUC": 0.9410809640640786,
      "PR_AUC": 0.5478239162150603,
      "Brier_Score": 0.16209497725544694,
      "TN": 1505,
      "FP": 523,
      "FN": 6,
      "TP": 158,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Logistic Regression",
      "CV_F1": 0.3172,
      "CV_Std": 0.0778,
      "Fit_Runtime_Sec": 0.0533,
      "Test_Inference_Sec": 0.0011,
      "F1_CI_95_Block7": "[31.97%, 42.63%]",
      "F1_CI_95_IID": "[33.24%, 41.59%]",
      "F1_CI_95": "[31.97%, 42.63%]"
    },
    "Task_B_24hLeadTime_LR": {
      "Accuracy": 0.7230839416058394,
      "Precision": 0.2034805890227577,
      "Recall": 0.926829268292683,
      "F1_Score": 0.3336992316136114,
      "F1_Macro": 0.579461190814004,
      "Specificity": 0.7066074950690335,
      "ROC_AUC": 0.9088101938711696,
      "PR_AUC": 0.4526081029458523,
      "Brier_Score": 0.18102312184913263,
      "TN": 1433,
      "FP": 595,
      "FN": 12,
      "TP": 152,
      "Event_Prevalence": 0.07481751824817519
    },
    "Task_B_24hLeadTime_RF": {
      "Accuracy": 0.8106751824817519,
      "Precision": 0.26716141001855287,
      "Recall": 0.8780487804878049,
      "F1_Score": 0.4096728307254623,
      "F1_Macro": 0.6484658638821552,
      "Specificity": 0.8052268244575936,
      "ROC_AUC": 0.9135397123202,
      "PR_AUC": 0.4193596032074336,
      "Brier_Score": 0.12459439478662312,
      "TN": 1633,
      "FP": 395,
      "FN": 20,
      "TP": 144,
      "Event_Prevalence": 0.07481751824817519
    },
    "Task_B_24hLeadTime_kNN": {
      "Accuracy": 0.9229014598540146,
      "Precision": 0.4603174603174603,
      "Recall": 0.17682926829268292,
      "F1_Score": 0.2555066079295154,
      "F1_Macro": 0.6074261449558571,
      "Specificity": 0.9832347140039448,
      "ROC_AUC": 0.7812139197575407,
      "PR_AUC": 0.25086372704896825,
      "Brier_Score": 0.06253649635036497,
      "TN": 1994,
      "FP": 34,
      "FN": 135,
      "TP": 29,
      "Event_Prevalence": 0.07481751824817519
    },
    "Task_C_WetDayR95p_LR": {
      "Accuracy": 0.7801094890510949,
      "Precision": 0.11439114391143912,
      "Recall": 0.96875,
      "F1_Score": 0.20462046204620463,
      "F1_Macro": 0.5385198657504713,
      "Specificity": 0.7744360902255639,
      "ROC_AUC": 0.9460908129699248,
      "PR_AUC": 0.3985176312710879,
      "Brier_Score": 0.1531874366070938,
      "TN": 1648,
      "FP": 480,
      "FN": 2,
      "TP": 62,
      "Event_Prevalence": 0.029197080291970802
    },
    "Task_C_WetDayR95p_RF": {
      "Accuracy": 0.8385036496350365,
      "Precision": 0.14108910891089108,
      "Recall": 0.890625,
      "F1_Score": 0.24358974358974358,
      "F1_Macro": 0.5765956889552395,
      "Specificity": 0.8369360902255639,
      "ROC_AUC": 0.9275728383458647,
      "PR_AUC": 0.28512326691242185,
      "Brier_Score": 0.09280844232390346,
      "TN": 1781,
      "FP": 347,
      "FN": 7,
      "TP": 57,
      "Event_Prevalence": 0.029197080291970802
    }
  },
  "pca7_ablation": {
    "LR_Full22": {
      "Accuracy": 0.7586678832116789,
      "Precision": 0.23201174743024963,
      "Recall": 0.9634146341463414,
      "F1_Score": 0.3739644970414201,
      "F1_Macro": 0.6122436217899951,
      "Specificity": 0.7421104536489151,
      "ROC_AUC": 0.9410809640640786,
      "PR_AUC": 0.5478239162150603,
      "Brier_Score": 0.16209497725544694,
      "TN": 1505,
      "FP": 523,
      "FN": 6,
      "TP": 158,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "Logistic Regression",
      "CV_F1": 0.3172,
      "CV_Std": 0.0778,
      "Fit_Runtime_Sec": 0.0533,
      "Test_Inference_Sec": 0.0011,
      "F1_CI_95_Block7": "[31.97%, 42.63%]",
      "F1_CI_95_IID": "[33.24%, 41.59%]",
      "F1_CI_95": "[31.97%, 42.63%]"
    },
    "LR_PCA7": {
      "Accuracy": 0.7477189781021898,
      "Precision": 0.22014388489208633,
      "Recall": 0.9329268292682927,
      "F1_Score": 0.3562281722933644,
      "F1_Macro": 0.5996743698346254,
      "Specificity": 0.7327416173570019,
      "ROC_AUC": 0.9287475345167653,
      "PR_AUC": 0.5239743587647404,
      "Brier_Score": 0.1704273095921748,
      "TN": 1486,
      "FP": 542,
      "FN": 11,
      "TP": 153,
      "Event_Prevalence": 0.07481751824817519
    },
    "kNN_Full22": {
      "Accuracy": 0.9315693430656934,
      "Precision": 0.5875,
      "Recall": 0.2865853658536585,
      "F1_Score": 0.38524590163934425,
      "F1_Macro": 0.6745070087906866,
      "Specificity": 0.9837278106508875,
      "ROC_AUC": 0.8218748496656564,
      "PR_AUC": 0.35466470068530975,
      "Brier_Score": 0.055967153284671535,
      "TN": 1995,
      "FP": 33,
      "FN": 117,
      "TP": 47,
      "Event_Prevalence": 0.07481751824817519,
      "Model": "k-Nearest Neighbours",
      "CV_F1": 0.2003,
      "CV_Std": 0.0844,
      "Fit_Runtime_Sec": 0.0024,
      "Test_Inference_Sec": 0.0702,
      "F1_CI_95_Block7": "[30.77%, 44.90%]",
      "F1_CI_95_IID": "[30.70%, 46.34%]",
      "F1_CI_95": "[30.77%, 44.90%]"
    },
    "kNN_PCA7": {
      "Accuracy": 0.9247262773722628,
      "Precision": 0.49382716049382713,
      "Recall": 0.24390243902439024,
      "F1_Score": 0.32653061224489793,
      "F1_Macro": 0.6433329553130748,
      "Specificity": 0.9797830374753451,
      "ROC_AUC": 0.8158629792658874,
      "PR_AUC": 0.30530284801318436,
      "Brier_Score": 0.05892335766423359,
      "TN": 1987,
      "FP": 41,
      "FN": 124,
      "TP": 40,
      "Event_Prevalence": 0.07481751824817519
    }
  },
  "unsupervised": {
    "optimal_k": 3,
    "k_range": [
      2,
      3,
      4,
      5,
      6
    ],
    "silhouette_scores": [
      0.30986688949183,
      0.31193607977295745,
      0.2856255893088157,
      0.23166349487441865,
      0.20169243449826954
    ],
    "davies_bouldin_scores": [
      1.332909072928749,
      1.1326673370709393,
      1.3468343979882393,
      1.4077814277083651,
      1.4975748386074237
    ],
    "pca_cum_var_7": 0.9146316387592532,
    "cluster_profiles": [
      {
        "cluster": 0,
        "total_days": 3395,
        "extreme_events": 14,
        "extreme_rate": 0.004123711340206186,
        "share_of_extremes": 0.03189066059225513
      },
      {
        "cluster": 1,
        "total_days": 2067,
        "extreme_events": 8,
        "extreme_rate": 0.0038703434929850023,
        "share_of_extremes": 0.018223234624145785
      },
      {
        "cluster": 2,
        "total_days": 3297,
        "extreme_events": 417,
        "extreme_rate": 0.1264786169244768,
        "share_of_extremes": 0.9498861047835991
      }
    ],
    "cluster_centers_unscaled": {
      "0": {
        "T2M": 13.902680412371133,
        "T2M_MAX": 20.16337260677467,
        "T2M_MIN": 9.87658321060383,
        "temp_diurnal_range": 10.28678939617084,
        "T2MDEW": 1.9735139911634756,
        "dew_point_depression": 11.929166421207658,
        "RH2M": 48.55707511045655,
        "QV2M": 5.566518409425626,
        "PS": 87.62944035346098,
        "pressure_tendency": 0.003275405007363738,
        "WS10M": 1.8971134020618556,
        "WS10M_MAX": 4.169643593519882,
        "ALLSKY_SFC_SW_DWN": 15.200047128129603,
        "TS": 11.470827687776142,
        "wind_calm_flag": 0.25301914580265095,
        "precip_lag1": 0.2951281296023564,
        "precip_lag2": 0.2786480117820324,
        "precip_lag3": 0.2913166421207658,
        "precip_roll3": 0.8650927835051492,
        "precip_roll7": 2.281098674521357,
        "sin_doy": -0.07588827162311622,
        "cos_doy": 0.7516044323860988
      },
      "1": {
        "T2M": 22.55528785679729,
        "T2M_MAX": 29.535989356555394,
        "T2M_MIN": 16.514716981132075,
        "temp_diurnal_range": 13.021272375423319,
        "T2MDEW": 4.069622641509434,
        "dew_point_depression": 18.48566521528786,
        "RH2M": 34.02077890662796,
        "QV2M": 6.5358345428156746,
        "PS": 87.18053217223029,
        "pressure_tendency": -0.00968553459119494,
        "WS10M": 2.7539042089985486,
        "WS10M_MAX": 5.510943396226415,
        "ALLSKY_SFC_SW_DWN": 22.820445089501693,
        "TS": 22.573754233188193,
        "wind_calm_flag": 0.21190130624092887,
        "precip_lag1": 0.5932123850991776,
        "precip_lag2": 0.6677503628447025,
        "precip_lag3": 0.7857377842283503,
        "precip_roll3": 2.046700532172219,
        "precip_roll7": 5.827005321722306,
        "sin_doy": 0.8263290614765907,
        "cos_doy": -0.26107124239900165
      },
      "2": {
        "T2M": 22.597846527145894,
        "T2M_MAX": 26.41148619957537,
        "T2M_MIN": 19.609784652714588,
        "temp_diurnal_range": 6.801701546860782,
        "T2MDEW": 18.761810737033667,
        "dew_point_depression": 3.836035790112223,
        "RH2M": 80.9160812860176,
        "QV2M": 15.851179860479222,
        "PS": 86.94614801334546,
        "pressure_tendency": 0.002681225356384606,
        "WS10M": 2.0828480436760692,
        "WS10M_MAX": 4.168061874431301,
        "ALLSKY_SFC_SW_DWN": 16.770712769184108,
        "TS": 23.079808917197454,
        "wind_calm_flag": 0.27145890203215045,
        "precip_lag1": 6.219035486806187,
        "precip_lag2": 6.189275098574462,
        "precip_lag3": 6.102308158932363,
        "precip_roll3": 18.510618744312996,
        "precip_roll7": 42.26188656354262,
        "sin_doy": -0.4400436117210832,
        "cos_doy": -0.6123877877488048
      }
    }
  },
  "top10_features": [
    {
      "Feature": "precip_lag1",
      "RF_Gini_Importance": 0.20830764780823546,
      "DT_Gini_Importance": 0.733548776011884,
      "LR_Coefficient": 0.49694129570118784,
      "RF_Permutation_AUC_Drop": 0.0720808077163613,
      "RF_Permutation_AUC_Std": 0.00698186412409475
    },
    {
      "Feature": "precip_roll3",
      "RF_Gini_Importance": 0.11553067636755612,
      "DT_Gini_Importance": 0.01085244088014998,
      "LR_Coefficient": 0.10918902479651445,
      "RF_Permutation_AUC_Drop": 0.010482813777842038,
      "RF_Permutation_AUC_Std": 0.003994632002676095
    },
    {
      "Feature": "QV2M",
      "RF_Gini_Importance": 0.10367506799051016,
      "DT_Gini_Importance": 0.0,
      "LR_Coefficient": 0.2887625428292368,
      "RF_Permutation_AUC_Drop": 0.0034375451003032078,
      "RF_Permutation_AUC_Std": 0.0017117377845818334
    },
    {
      "Feature": "T2MDEW",
      "RF_Gini_Importance": 0.09356376198949098,
      "DT_Gini_Importance": 0.0037173589148732926,
      "LR_Coefficient": 0.3057001193376479,
      "RF_Permutation_AUC_Drop": 0.0012408596719104103,
      "RF_Permutation_AUC_Std": 0.001911526119889755
    },
    {
      "Feature": "temp_diurnal_range",
      "RF_Gini_Importance": 0.07000512620143533,
      "DT_Gini_Importance": 0.04613035964833208,
      "LR_Coefficient": -0.48855265187510677,
      "RF_Permutation_AUC_Drop": 0.009876365035839819,
      "RF_Permutation_AUC_Std": 0.002419323748504362
    },
    {
      "Feature": "RH2M",
      "RF_Gini_Importance": 0.054269603115875385,
      "DT_Gini_Importance": 0.012208509183349286,
      "LR_Coefficient": 0.46794048257702975,
      "RF_Permutation_AUC_Drop": 0.006956270746139493,
      "RF_Permutation_AUC_Std": 0.001750914973527793
    },
    {
      "Feature": "precip_roll7",
      "RF_Gini_Importance": 0.052398002033154756,
      "DT_Gini_Importance": 0.0,
      "LR_Coefficient": 0.07556278619703558,
      "RF_Permutation_AUC_Drop": 0.0017964954057825722,
      "RF_Permutation_AUC_Std": 0.0019593857683761163
    },
    {
      "Feature": "dew_point_depression",
      "RF_Gini_Importance": 0.05123588770853155,
      "DT_Gini_Importance": 0.008620132084987105,
      "LR_Coefficient": -0.3168232445596982,
      "RF_Permutation_AUC_Drop": 0.0038852407754848216,
      "RF_Permutation_AUC_Std": 0.0016449675926929874
    },
    {
      "Feature": "ALLSKY_SFC_SW_DWN",
      "RF_Gini_Importance": 0.04408950642679607,
      "DT_Gini_Importance": 0.03223766703690689,
      "LR_Coefficient": -0.5355371923490717,
      "RF_Permutation_AUC_Drop": 0.020594602395728225,
      "RF_Permutation_AUC_Std": 0.002670093756951916
    },
    {
      "Feature": "T2M_MIN",
      "RF_Gini_Importance": 0.034938104336040825,
      "DT_Gini_Importance": 0.009655622807909322,
      "LR_Coefficient": 0.19999583233801543,
      "RF_Permutation_AUC_Drop": 0.00046693847115995,
      "RF_Permutation_AUC_Std": 0.0008038938941582379
    }
  ],
  "mcnemar_tests": [
    {
      "pair": "Random Forest vs. k-Nearest Neighbours",
      "b_all": 106,
      "c_all": 335,
      "chi2_all": 117.88,
      "p_all": 9.613183963674339e-29,
      "b_ext": 101,
      "c_ext": 0,
      "chi2_ext": 99.01,
      "p_ext": 7.888609052210118e-31
    },
    {
      "pair": "Logistic Regression vs. k-Nearest Neighbours",
      "b_all": 112,
      "c_all": 491,
      "chi2_all": 236.96,
      "p_all": 1.6225783296154862e-57,
      "b_ext": 111,
      "c_ext": 0,
      "chi2_ext": 109.01,
      "p_ext": 7.703719777548943e-34
    },
    {
      "pair": "Random Forest vs. Decision Tree",
      "b_all": 99,
      "c_all": 63,
      "chi2_all": 7.56,
      "p_all": 0.0057926040496869115,
      "b_ext": 13,
      "c_ext": 6,
      "chi2_ext": 1.89,
      "p_ext": 0.1670684814453125
    },
    {
      "pair": "Random Forest vs. Support Vector Machine",
      "b_all": 135,
      "c_all": 55,
      "chi2_all": 32.85,
      "p_all": 5.998182283273911e-09,
      "b_ext": 13,
      "c_ext": 9,
      "chi2_ext": 0.41,
      "p_ext": 0.5234670639038086
    },
    {
      "pair": "Logistic Regression vs. Random Forest",
      "b_all": 22,
      "c_all": 172,
      "chi2_all": 114.44,
      "p_all": 5.0504422840092926e-30,
      "b_ext": 11,
      "c_ext": 1,
      "chi2_ext": 6.75,
      "p_ext": 0.00634765625
    }
  ],
  "fig4": {
    "data": [
      {
        "type": "bar",
        "orientation": "h",
        "name": "RF Gini Importance (%)",
        "y": [
          "T2M_MIN",
          "ALLSKY_SFC_SW_DWN",
          "dew_point_depression",
          "precip_roll7",
          "RH2M",
          "temp_diurnal_range",
          "T2MDEW",
          "QV2M",
          "precip_roll3",
          "precip_lag1"
        ],
        "x": [
          3.49,
          4.41,
          5.12,
          5.24,
          5.43,
          7.0,
          9.36,
          10.37,
          11.55,
          20.83
        ],
        "xaxis": "x",
        "yaxis": "y",
        "marker": {
          "color": "#1E3A8A"
        }
      },
      {
        "type": "bar",
        "orientation": "h",
        "name": "RF Permutation ROC-AUC Drop (\u00d7100)",
        "y": [
          "T2M_MIN",
          "ALLSKY_SFC_SW_DWN",
          "dew_point_depression",
          "precip_roll7",
          "RH2M",
          "temp_diurnal_range",
          "T2MDEW",
          "QV2M",
          "precip_roll3",
          "precip_lag1"
        ],
        "x": [
          0.05,
          2.06,
          0.39,
          0.18,
          0.7,
          0.99,
          0.12,
          0.34,
          1.05,
          7.21
        ],
        "xaxis": "x",
        "yaxis": "y",
        "marker": {
          "color": "#DC2626"
        }
      },
      {
        "type": "bar",
        "orientation": "h",
        "name": "LR Standardized Coefficient (\u03b2)",
        "y": [
          "T2M_MIN",
          "ALLSKY_SFC_SW_DWN",
          "dew_point_depression",
          "precip_roll7",
          "RH2M",
          "temp_diurnal_range",
          "T2MDEW",
          "QV2M",
          "precip_roll3",
          "precip_lag1"
        ],
        "x": [
          0.2,
          -0.536,
          -0.317,
          0.076,
          0.468,
          -0.489,
          0.306,
          0.289,
          0.109,
          0.497
        ],
        "xaxis": "x2",
        "yaxis": "y2",
        "marker": {
          "color": [
            "#0D9488",
            "#D97706",
            "#D97706",
            "#0D9488",
            "#0D9488",
            "#D97706",
            "#0D9488",
            "#0D9488",
            "#0D9488",
            "#0D9488"
          ]
        }
      }
    ],
    "layout": {
      "title": {
        "text": "<b>RO2 Physical Feature Attribution: RF Impurity/Permutation vs. LR Standardized Weights</b>",
        "font": {
          "size": 15,
          "color": "#0F172A"
        }
      },
      "barmode": "group",
      "autosize": true,
      "height": 460,
      "margin": {
        "l": 150,
        "r": 40,
        "t": 75,
        "b": 55
      },
      "grid": {
        "rows": 1,
        "columns": 2,
        "pattern": "independent"
      },
      "xaxis": {
        "domain": [
          0,
          0.46
        ],
        "title": "RF Importance / AUC Drop (%)",
        "gridcolor": "#E2E8F0"
      },
      "yaxis": {
        "anchor": "x",
        "gridcolor": "#F1F5F9",
        "tickfont": {
          "size": 12
        }
      },
      "xaxis2": {
        "domain": [
          0.54,
          1.0
        ],
        "title": "LR Standardized Log-Odds Weight (\u03b2)",
        "gridcolor": "#E2E8F0",
        "zeroline": true,
        "zerolinecolor": "#94A3B8",
        "zerolinewidth": 1.5
      },
      "yaxis2": {
        "anchor": "x2",
        "matches": "y",
        "showticklabels": false,
        "gridcolor": "#F1F5F9"
      },
      "legend": {
        "orientation": "h",
        "yanchor": "bottom",
        "y": 1.02,
        "xanchor": "center",
        "x": 0.5,
        "font": {
          "size": 11
        }
      },
      "plot_bgcolor": "#F8FAFC",
      "paper_bgcolor": "#FFFFFF"
    }
  }
};
