import { describe, expect, it } from "vitest";
import { projectMonthlyCost, projectedInvoiceLabel } from "../src/lib/costProjection";

describe("projectMonthlyCost", () => {
  it("multiplies daily spend by days in month", () => {
    expect(projectMonthlyCost(2.5)).toBe(75);
    expect(projectMonthlyCost(2.5, 31)).toBe(77.5);
  });
});

describe("projectedInvoiceLabel", () => {
  it("formats the projection as a monthly label", () => {
    expect(projectedInvoiceLabel(2.5)).toBe("~$75.00/mo");
  });
});
