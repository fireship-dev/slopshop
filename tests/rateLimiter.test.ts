import { beforeEach, describe, expect, it } from "vitest";
import { consumeToken, RateLimitError, resetRateLimits } from "../src/lib/rateLimiter";

describe("consumeToken", () => {
  beforeEach(() => resetRateLimits());

  it("allows requests while the bucket has tokens", () => {
    const options = { capacity: 2, refillPerSecond: 1 };

    expect(consumeToken("brad", options, 0)).toBe(1);
    expect(consumeToken("brad", options, 0)).toBe(0);
  });

  it("rejects once the bucket is empty", () => {
    const options = { capacity: 1, refillPerSecond: 1 };

    consumeToken("brad", options, 0);
    expect(() => consumeToken("brad", options, 0)).toThrow(RateLimitError);
  });

  it("refills over time", () => {
    const options = { capacity: 1, refillPerSecond: 1 };

    consumeToken("brad", options, 0);
    expect(consumeToken("brad", options, 1000)).toBe(0);
  });
});
