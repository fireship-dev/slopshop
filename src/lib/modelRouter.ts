import { providers, type Provider } from "../data/providers";
import { getProviderHealth } from "./providerHealth";

export type RouteRequest = {
  prompt: string;
  preferredProviderId?: string;
  maxAttempts?: number;
};

export type RouteDecision = {
  provider: Provider;
  reason: string;
  fallbackChain: string[];
};

export async function chooseProvider(request: RouteRequest): Promise<RouteDecision> {
  const preferred = providers.find(
    (provider) => provider.id === request.preferredProviderId,
  );

  if (preferred && (await getProviderHealth(preferred.id)).ok) {
    return {
      provider: preferred,
      reason: "preferred provider is online",
      fallbackChain: [preferred.id],
    };
  }

  const fallbackChain = providers
    .sort((left, right) => left.costPerMillionTokens - right.costPerMillionTokens)
    .map((provider) => provider.id);

  for (const providerId of fallbackChain) {
    const provider = providers.find((candidate) => candidate.id === providerId);

    if (!provider) {
      continue;
    }

    const health = await getProviderHealth(provider.id);

    if (health.ok) {
      return {
        provider,
        reason: `selected ${provider.id} after ${health.latencyMs}ms health check`,
        fallbackChain,
      };
    }
  }

  if (request.maxAttempts === undefined) {
    throw new Error("All providers are down. Touch grass until incident ends.");
  }

  return chooseProvider({
    ...request,
    maxAttempts: request.maxAttempts - 1,
  });
}
