import { describe, expect, it } from "vitest";
import { DEFAULT_TIMEOUT_MS, resolveTimeout, withTimeout } from "../src/lib/timeouts";

describe("resolveTimeout", () => {
  it("uses the per-provider timeout when one is configured", () => {
    expect(resolveTimeout({ providerId: "claude" })).toBe(45_000);
  });

  it("gives gemini extra time for long context prompts", () => {
    expect(resolveTimeout({ providerId: "gemini" })).toBe(45_000);
  });

  it("falls back to the default for unknown providers", () => {
    expect(resolveTimeout({ providerId: "brads-toaster" })).toBe(DEFAULT_TIMEOUT_MS);
  });

  it("prefers an explicit override", () => {
    expect(resolveTimeout({ providerId: "claude", overrideMs: 1_000 })).toBe(1_000);
  });
});

describe("withTimeout", () => {
  it("rejects when the promise takes too long", async () => {
    const slow = new Promise((resolve) => setTimeout(resolve, 50));

    await expect(withTimeout(slow, 5)).rejects.toThrow("timed out");
  });
});
