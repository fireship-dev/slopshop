import { describe, expect, it } from "vitest";
import { estimateCost } from "../src/lib/costTracker";

describe("estimateCost", () => {
  it("estimates provider cost from token usage", () => {
    expect(
      estimateCost({
        inputTokens: 500,
        outputTokens: 500,
        costPerMillionTokens: 10,
      }),
    ).toBe(0.01);
  });
});

import { formatCost } from "../src/lib/costTracker";

describe("formatCost", () => {
  it("rounds to cents", () => {
    expect(formatCost(1.2345)).toBe("$1.23");
  });

  it("floors tiny amounts", () => {
    expect(formatCost(0.0004)).toBe("<$0.01");
  });
});
