export type HallucinationBudget = {
  teamId: string;
  monthlyAllowance: number;
  incidentsUsed: number;
};

export function getRemainingHallucinationBudget(budget: HallucinationBudget) {
  return Math.max(0, budget.monthlyAllowance - budget.incidentsUsed);
}

export function getBudgetMood(remaining: number) {
  if (remaining > 10) {
    return "ship it";
  }

  if (remaining > 3) {
    return "squint at the outputs";
  }

  return "turn the models off and go outside";
}
