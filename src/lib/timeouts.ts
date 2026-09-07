import { providers } from "../data/providers";

export const DEFAULT_TIMEOUT_MS = 30_000;

// Per-provider overrides. Anything not listed here gets the default.
export const providerTimeouts: Record<string, number> = {
  claude: 45_000,
  gpt: 30_000,
  gemini: 60_000,
  "brads-macbook": 120_000,
};

export type TimeoutOptions = {
  providerId: string;
  overrideMs?: number;
};

export function resolveTimeout({ providerId, overrideMs }: TimeoutOptions) {
  if (overrideMs !== undefined) {
    return overrideMs;
  }

  const known = providers.some((provider) => provider.id === providerId);
  if (!known) {
    return DEFAULT_TIMEOUT_MS;
  }

  return providerTimeouts[providerId] ?? DEFAULT_TIMEOUT_MS;
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Provider timed out after ${ms}ms`));
    }, ms);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}
