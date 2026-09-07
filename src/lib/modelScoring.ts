import type { Provider } from "../data/providers";

export type ModelScore = {
  providerId: string;
  score: number;
  reasons: string[];
};

export function scoreProvider(provider: Provider): ModelScore {
  const latencyScore = Math.max(0, 1000 - provider.latencyMs) * 0.04;
  const priceScore = Math.max(0, 20 - provider.costPerMillionTokens) * 2;
  const statusScore =
    provider.status === "online" ? 45 : provider.status === "degraded" ? 15 : 0;

  return {
    providerId: provider.id,
    score: Math.round(statusScore + latencyScore + priceScore),
    reasons: [
      `${provider.latencyMs}ms latency`,
      `$${provider.costPerMillionTokens}/M tokens`,
      `${provider.status} status`,
    ],
  };
}

export function rankProviders(providers: Provider[]) {
  return providers
    .map(scoreProvider)
    .sort((left, right) => right.score - left.score);
}
