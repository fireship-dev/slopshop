/**
 * Sliding-window rate limiting per user.
 *
 * Each user gets a list of request timestamps. On every request we drop the
 * timestamps that fall outside the window and compare the remainder against
 * the configured maximum.
 */

export interface RateLimitConfig {
  /** Maximum number of requests allowed inside the window. */
  maxRequests: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 60,
  windowMs: 60_000,
};

const requestLog: Record<string, number[]> = {};

export function checkRateLimit(
  userId: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT,
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const timestamps = (requestLog[userId] ?? []).filter((ts) => ts > windowStart);

  if (timestamps.length >= config.maxRequests) {
    requestLog[userId] = timestamps;
    return {
      allowed: false,
      remaining: 0,
      resetAt: timestamps[0] + config.windowMs,
    };
  }

  timestamps.push(now);
  requestLog[userId] = timestamps;

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    resetAt: timestamps[0] + config.windowMs,
  };
}

export function clearRateLimits(): void {
  for (const key of Object.keys(requestLog)) {
    delete requestLog[key];
  }
}
