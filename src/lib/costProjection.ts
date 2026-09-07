import { formatCost } from "./costTracker";

export function projectMonthlyCost(dailyUsd: number, daysInMonth = 30) {
  return dailyUsd * daysInMonth;
}

export function projectedInvoiceLabel(dailyUsd: number) {
  return `~${formatCost(projectMonthlyCost(dailyUsd))}/mo`;
}
