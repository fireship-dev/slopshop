import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, clearRateLimits } from "../src/lib/rateLimit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    clearRateLimits();
  });

  it("allows requests under the limit", () => {
    const result = checkRateLimit("user-1", { maxRequests: 3, windowMs: 1000 });

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests over the limit", () => {
    const config = { maxRequests: 2, windowMs: 1000 };

    checkRateLimit("user-1", config);
    checkRateLimit("user-1", config);
    const result = checkRateLimit("user-1", config);

    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks users independently", () => {
    const config = { maxRequests: 1, windowMs: 1000 };

    checkRateLimit("user-1", config);
    const result = checkRateLimit("user-2", config);

    expect(result.allowed).toBe(true);
  });
});
