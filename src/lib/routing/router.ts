import { providers as defaultProviders, type Provider } from "../../data/providers";
import { cheapestOnline, preferredProvider } from "./strategies";
import type { RouteDecision, RouteRequest, RoutingStrategy } from "./types";

export const defaultStrategies: RoutingStrategy[] = [preferredProvider, cheapestOnline];

export type RouterOptions = {
  providers?: Provider[];
  strategies?: RoutingStrategy[];
};

export function createRouter(options: RouterOptions = {}) {
  const candidates = options.providers ?? defaultProviders;
  const strategies = options.strategies ?? defaultStrategies;

  return function route(request: RouteRequest): RouteDecision {
    for (const strategy of strategies) {
      const decision = strategy(candidates, request);

      if (decision) {
        return decision;
      }
    }

    throw new Error("All providers are down. Touch grass until incident ends.");
  };
}

export const chooseProvider = createRouter();
