import { providers } from "../data/providers";

export type PanicModeState = {
  active: boolean;
  message: string;
  providerCount: number;
};

export function getPanicModeState(): PanicModeState {
  const providerCount = providers.length;
  const active = providers.every((provider) => provider.status !== "online");

  return {
    active,
    providerCount,
    message: active
      ? "Every AI provider is cooked. Please return to hand-written code."
      : "At least one model is still pretending to be reliable.",
  };
}
