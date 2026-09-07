import { providers, type Provider } from "../data/providers";

export type RouteRequest = {
  prompt: string;
  preferredProviderId?: string;
  userId?: string;
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

  const cheapestOnline = providers
    .filter((provider) => provider.status === "online")
    .sort((left, right) => left.costPerMillionTokens - right.costPerMillionTokens)
    .at(0);

  if (!cheapestOnline) {
    throw new Error("All providers are down. Touch grass until incident ends.");
  }

  return {
    provider: cheapestOnline,
    reason: "selected cheapest online provider",
  };
}
