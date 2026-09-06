import { providers } from "../data/providers";

export type ProviderHealth = {
  ok: boolean;
  latencyMs: number;
  checkedAt: string;
};

const healthCache = new Map<string, ProviderHealth>();

export async function getProviderHealth(providerId: string): Promise<ProviderHealth> {
  const cached = healthCache.get(providerId);

  if (cached) {
    return cached;
  }

  const provider = providers.find((candidate) => candidate.id === providerId);
  const health = {
    ok: provider?.status === "online",
    latencyMs: provider?.latencyMs ?? 9999,
    checkedAt: new Date().toISOString(),
  };

  healthCache.set(providerId, health);

  return health;
}

export function clearProviderHealthCache() {
  healthCache.clear();
}
