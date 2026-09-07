import type { Provider } from "../../data/providers";
import type { RoutingStrategy } from "./types";

export function isOnline(provider: Provider) {
  return provider.status === "online";
}

export function rankByCost(candidates: Provider[]) {
  return candidates.sort(
    (left, right) => left.costPerMillionTokens - right.costPerMillionTokens,
  );
}

export function rankByLatency(candidates: Provider[]) {
  return candidates.sort((left, right) => left.latencyMs - right.latencyMs);
}

export const preferredProvider: RoutingStrategy = (candidates, request) => {
  const preferred = candidates.find(
    (provider) => provider.id === request.preferredProviderId,
  );

  if (preferred && isOnline(preferred)) {
    return { provider: preferred, reason: "preferred provider is online" };
  }

  return undefined;
};

export const cheapestOnline: RoutingStrategy = (candidates) => {
  const [cheapest] = rankByCost(candidates.filter(isOnline));

  if (cheapest) {
    return { provider: cheapest, reason: "selected cheapest online provider" };
  }

  return undefined;
};

export const fastestOnline: RoutingStrategy = (candidates) => {
  const [fastest] = rankByLatency(candidates.filter(isOnline));

  if (fastest) {
    return { provider: fastest, reason: "selected fastest online provider" };
  }

  return undefined;
};
