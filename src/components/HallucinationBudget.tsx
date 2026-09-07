import {
  getBudgetMood,
  getRemainingHallucinationBudget,
} from "../lib/hallucinationBudget";

const budget = {
  teamId: "fireship",
  monthlyAllowance: 20,
  incidentsUsed: 17,
};

export function HallucinationBudget() {
  const remaining = getRemainingHallucinationBudget(budget);

  return (
    <section className="panel budget-panel">
      <div className="panel-header">
        <h2>Hallucination Budget</h2>
        <strong>{remaining} left</strong>
      </div>
      <p className="budget-mood">{getBudgetMood(remaining)}</p>
    </section>
  );
}
