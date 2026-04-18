import pandas as pd
import matplotlib.pyplot as plt

# =========================
# 1. DATASET
# =========================
apps = pd.DataFrame({
    "Application": [
        "Satellite image analysis",
        "Aircraft fault detection",
        "Weather forecasting",
        "Autonomous navigation",
        "Space mission planning"
    ],
    "ImpactScore": [9, 8, 9, 8, 7],
    "RiskScore": [4, 5, 4, 7, 6],
    "ComplexityScore": [7, 8, 8, 9, 8],
    "FeasibilityScore": [8, 7, 7, 5, 6],
    "CostScore": [6, 7, 6, 8, 7],
    "DataAvailabilityScore": [9, 7, 8, 6, 5]
})

# =========================
# 2. USER-CHOSEN WEIGHTS
# =========================
print("Enter weights for each category.")
print("Higher weight = more importance in the final ranking.\n")

impact_weight = float(input("Impact weight (recommended 2.0): "))
risk_weight = float(input("Risk weight (recommended 1.2): "))
complexity_weight = float(input("Complexity weight (recommended 0.8): "))
feasibility_weight = float(input("Feasibility weight (recommended 1.5): "))
cost_weight = float(input("Cost weight (recommended 0.5): "))
data_weight = float(input("Data availability weight (recommended 1.0): "))

# =========================
# 3. FINAL SCORE FORMULA
# =========================
apps["FinalScore"] = (
    apps["ImpactScore"] * impact_weight
    - apps["RiskScore"] * risk_weight
    - apps["ComplexityScore"] * complexity_weight
    + apps["FeasibilityScore"] * feasibility_weight
    - apps["CostScore"] * cost_weight
    + apps["DataAvailabilityScore"] * data_weight
)

# =========================
# 4. SORT RESULTS
# =========================
apps = apps.sort_values("FinalScore", ascending=False).reset_index(drop=True)

# =========================
# 5. DISPLAY TABLE
# =========================
print("\nRanked Aerospace AI Applications:\n")
print(apps[[
    "Application",
    "ImpactScore",
    "RiskScore",
    "ComplexityScore",
    "FeasibilityScore",
    "CostScore",
    "DataAvailabilityScore",
    "FinalScore"
]])

# =========================
# 6. RECOMMENDATION OUTPUT
# =========================
best_app = apps.iloc[0]

print("\nRecommended Aerospace AI Focus Area:")
print(best_app["Application"])

print("\nReason:")
print(
    f"{best_app['Application']} ranked highest based on the chosen balance of "
    f"impact, risk, complexity, feasibility, cost, and data availability."
)

# =========================
# 7. BAR CHART OF FINAL SCORES
# =========================
plt.figure(figsize=(9, 5))
plt.bar(apps["Application"], apps["FinalScore"])
plt.xticks(rotation=30, ha="right")
plt.title("Ranked Aerospace AI Applications")
plt.ylabel("Final Score")
plt.tight_layout()
plt.show()

# =========================
# 8. SCATTER PLOT: RISK VS IMPACT
# =========================
plt.figure(figsize=(8, 5))
plt.scatter(apps["RiskScore"], apps["ImpactScore"], s=200)

for i, row in apps.iterrows():
    plt.text(
        row["RiskScore"] + 0.05,
        row["ImpactScore"] + 0.05,
        row["Application"],
        fontsize=8
    )

plt.xlabel("Risk Score")
plt.ylabel("Impact Score")
plt.title("Risk vs Impact of Aerospace AI Applications")
plt.tight_layout()
plt.show()

# =========================
# 9. SCENARIO COMPARISONS
# =========================
scenarios = {
    "Safety-Focused": {
        "impact": 1.5,
        "risk": 2.0,
        "complexity": 1.0,
        "feasibility": 1.2,
        "cost": 0.5,
        "data": 0.8
    },
    "Cost-Focused": {
        "impact": 1.5,
        "risk": 1.0,
        "complexity": 0.8,
        "feasibility": 1.2,
        "cost": 2.0,
        "data": 0.8
    },
    "Innovation-Focused": {
        "impact": 2.5,
        "risk": 0.8,
        "complexity": 0.5,
        "feasibility": 1.0,
        "cost": 0.3,
        "data": 1.2
    }
}

print("\nScenario Comparisons:\n")

for scenario_name, weights in scenarios.items():
    scenario_scores = (
        apps["ImpactScore"] * weights["impact"]
        - apps["RiskScore"] * weights["risk"]
        - apps["ComplexityScore"] * weights["complexity"]
        + apps["FeasibilityScore"] * weights["feasibility"]
        - apps["CostScore"] * weights["cost"]
        + apps["DataAvailabilityScore"] * weights["data"]
    )

    scenario_apps = apps.copy()
    scenario_apps["ScenarioScore"] = scenario_scores
    scenario_apps = scenario_apps.sort_values("ScenarioScore", ascending=False)

    top_choice = scenario_apps.iloc[0]["Application"]
    print(f"{scenario_name}: {top_choice}")

# =========================
# 10. OPTIONAL: SAVE RESULTS
# =========================
apps.to_csv("aerospace_ai_rankings.csv", index=False)
print("\nResults saved to aerospace_ai_rankings.csv")

Impact weight: 2.0
Risk weight: 1.2
Complexity weight: 0.8
Feasibility weight: 1.5
Cost weight: 0.5
Data availability weight: 1.0
