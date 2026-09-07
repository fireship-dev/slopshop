import type { Provider } from "../../data/providers";

export type RouteRequest = {
  prompt: string;
  preferredProviderId?: string;
};

export type RouteDecision = {
  provider: Provider;
  reason: string;
};

export type RoutingStrategy = (
  candidates: Provider[],
  request: RouteRequest,
) => RouteDecision | undefined;
