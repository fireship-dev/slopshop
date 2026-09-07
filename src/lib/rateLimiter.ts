export type RateLimiterOptions = {
  capacity: number;
  refillPerSecond: number;
};

type Bucket = {
  tokens: number;
  updatedAt: number;
};

const buckets = new Map<string, Bucket>();

const defaults: RateLimiterOptions = {
  capacity: 20,
  refillPerSecond: 0.5,
};

export class RateLimitError extends Error {
  constructor(public readonly userId: string, public readonly retryAfterMs: number) {
    super(`Rate limit exceeded for ${userId}, retry in ${retryAfterMs}ms`);
  }
}

export function consumeToken(
  userId: string,
  options: RateLimiterOptions = defaults,
  now = Date.now(),
) {
  const bucket = buckets.get(userId) ?? { tokens: options.capacity, updatedAt: now };
  const elapsedSeconds = (now - bucket.updatedAt) / 1000;

  bucket.tokens = Math.min(options.capacity, bucket.tokens + elapsedSeconds * options.refillPerSecond);
  bucket.updatedAt = now;

  if (bucket.tokens < 1) {
    buckets.set(userId, bucket);
    const retryAfterMs = ((1 - bucket.tokens) / options.refillPerSecond) * 1000;
    throw new RateLimitError(userId, Math.ceil(retryAfterMs));
  }

  bucket.tokens -= 1;
  buckets.set(userId, bucket);

  return bucket.tokens;
}

export function resetRateLimits() {
  buckets.clear();
}
