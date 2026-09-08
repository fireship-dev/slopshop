import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  STALE_USER_RATE_LIMIT_WINDOW_MS,
  checkRateLimit,
  clearRateLimits,
} from "../src/lib/rateLimit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    clearRateLimits();
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("validates rate-limit config values", () => {
    expect(() => checkRateLimit("user-1", { maxRequests: 0, windowMs: 1000 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
    expect(() => checkRateLimit("user-1", { maxRequests: -1, windowMs: 1000 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
    expect(() => checkRateLimit("user-1", { maxRequests: 1.5, windowMs: 1000 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
    expect(() => checkRateLimit("user-1", { maxRequests: 1, windowMs: 1.5 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
    expect(() => checkRateLimit("user-1", { maxRequests: 1, windowMs: 0 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
    expect(() => checkRateLimit("user-1", { maxRequests: Number.NaN, windowMs: 1000 })).toThrow(
      "Rate limit configuration must use positive finite values",
    );
  });

  it("supports reserved user IDs", () => {
    const config = { maxRequests: 1, windowMs: 1000 };

    expect(checkRateLimit("__proto__", config).allowed).toBe(true);
    expect(checkRateLimit("__proto__", config).allowed).toBe(false);
    expect(checkRateLimit("constructor", config).allowed).toBe(true);
    expect(checkRateLimit("toString", config).allowed).toBe(true);
  });

  it("cleans up stale users without new requests for that user", () => {
    const config = { maxRequests: 1, windowMs: 1_000 };
    const now = 2000;

    vi.setSystemTime(0);
    checkRateLimit("stale-user", config);

    vi.setSystemTime(STALE_USER_RATE_LIMIT_WINDOW_MS + now);
    checkRateLimit("active-user", { maxRequests: 1, windowMs: 1000 });

    vi.setSystemTime(STALE_USER_RATE_LIMIT_WINDOW_MS + now);
    const result = checkRateLimit("stale-user", config);

    expect(result.allowed).toBe(true);
  });
});
