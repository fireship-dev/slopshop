export type TokenUsage = {
  inputTokens: number;
  outputTokens: number;
  costPerMillionTokens: number;
};

export function estimateCost(usage: TokenUsage) {
  const totalTokens = usage.inputTokens + usage.outputTokens;

  return (totalTokens / 1_000_000) * usage.costPerMillionTokens;
}

export function formatCost(usd: number) {
  if (usd < 0.01) return `<$0.01`;
  return `$${usd.toFixed(2)}`;
}
