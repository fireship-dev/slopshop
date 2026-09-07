import { describe, expect, it } from "vitest";
import type { Provider } from "../../src/data/providers";
import {
  cheapestOnline,
  fastestOnline,
  preferredProvider,
  rankByCost,
} from "../../src/lib/routing";

const fixtures: Provider[] = [
  { id: "a", name: "A", status: "online", latencyMs: 400, contextWindow: "8k", costPerMillionTokens: 10 },
  { id: "b", name: "B", status: "degraded", latencyMs: 100, contextWindow: "8k", costPerMillionTokens: 1 },
  { id: "c", name: "C", status: "online", latencyMs: 200, contextWindow: "8k", costPerMillionTokens: 5 },
];

describe("preferredProvider", () => {
  it("returns the preferred provider when it is online", () => {
    expect(preferredProvider(fixtures, { prompt: "", preferredProviderId: "a" })?.provider.id).toBe("a");
  });

  it("skips a degraded preferred provider", () => {
    expect(preferredProvider(fixtures, { prompt: "", preferredProviderId: "b" })).toBeUndefined();
  });
});

describe("cheapestOnline", () => {
  it("ignores degraded providers even when they are cheaper", () => {
    expect(cheapestOnline(fixtures, { prompt: "" })?.provider.id).toBe("c");
  });
});

describe("fastestOnline", () => {
  it("picks the lowest latency online provider", () => {
    expect(fastestOnline(fixtures, { prompt: "" })?.provider.id).toBe("c");
  });
});

describe("rankByCost", () => {
  it("orders providers cheapest first", () => {
    expect(rankByCost([...fixtures]).map((provider) => provider.id)).toEqual(["b", "c", "a"]);
  });
});
