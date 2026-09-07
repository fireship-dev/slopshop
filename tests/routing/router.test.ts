import { describe, expect, it } from "vitest";
import type { Provider } from "../../src/data/providers";
import { createRouter, fastestOnline } from "../../src/lib/routing";

const offline: Provider[] = [
  { id: "a", name: "A", status: "offline", latencyMs: 1, contextWindow: "8k", costPerMillionTokens: 1 },
];

describe("createRouter", () => {
  it("throws when no strategy can pick a provider", () => {
    const route = createRouter({ providers: offline });

    expect(() => route({ prompt: "hello" })).toThrow("All providers are down");
  });

  it("accepts custom strategies", () => {
    const route = createRouter({ strategies: [fastestOnline] });

    expect(route({ prompt: "hello" }).reason).toBe("selected fastest online provider");
  });
});
