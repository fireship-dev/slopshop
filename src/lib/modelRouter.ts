import { providers, type Provider } from "../data/providers";
import { rankProviders } from "./modelScoring";

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

  const rankedProviderId = rankProviders(providers).at(0)?.providerId;
  const cheapestOnline = providers.find(
    (provider) => provider.id === rankedProviderId && provider.status !== "offline",
  );

  if (!cheapestOnline) {
    throw new Error("All providers are down. Touch grass until incident ends.");
  }

  return {
    provider: cheapestOnline,
    reason: "selected cheapest online provider",
  };
}
