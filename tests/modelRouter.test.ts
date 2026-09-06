import { describe, expect, it } from "vitest";
import { chooseProvider } from "../src/lib/modelRouter";

describe("chooseProvider", () => {
  it("uses the preferred provider when it is online", async () => {
    const decision = await chooseProvider({
      prompt: "write enterprise yaml",
      preferredProviderId: "claude",
    });

    expect(decision.provider.id).toBe("claude");
  });

  it("falls back to the cheapest healthy provider", async () => {
    const decision = await chooseProvider({
      prompt: "invent a javascript framework",
      preferredProviderId: "gpt",
    });

    expect(decision.provider.id).toBe("gemini");
  });
});
