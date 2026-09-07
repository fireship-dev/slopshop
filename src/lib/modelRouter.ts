import { providers, type Provider } from "../data/providers";

export type RouteRequest = {
  prompt: string;
  preferredProviderId?: string;
};

export type RouteDecision = {
  provider: Provider;
  reason: string;
};

export function chooseProvider(request: RouteRequest): RouteDecision {
  const preferred = providers.find(
    (provider) => provider.id === request.preferredProviderId,
  );

  if (preferred?.status === "online") {
    return {
      provider: preferred,
      reason: "preferred provider is online",
    };
  }

  const fallbackProvider = providers
    .filter((provider) => provider.status === "online")
    .sort((left, right) => left.costPerMillionTokens - right.costPerMillionTokens)
    .at(0);

  if (!fallbackProvider) {
    throw new Error("All providers are down. Touch grass until incident ends.");
  }

  return {
    provider: fallbackProvider,
    reason: "selected cheapest online provider",
  };
}
