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

type UserRateLog = {
  timestamps: number[];
  lastSeenAt: number;
  windowMs: number;
};

export const STALE_USER_RATE_LIMIT_WINDOW_MS = 60_000;
const requestLog = new Map<string, UserRateLog>();

function validateRateLimitConfig(config: RateLimitConfig): void {
  if (
    !Number.isFinite(config.maxRequests) ||
    !Number.isFinite(config.windowMs) ||
    !Number.isInteger(config.maxRequests) ||
    !Number.isInteger(config.windowMs) ||
    config.maxRequests <= 0 ||
    config.windowMs <= 0
  ) {
    throw new Error("Rate limit configuration must use positive finite values");
  }
}

function cleanupInactiveUsers(now: number): void {
  for (const [userId, log] of requestLog) {
    if (now - log.lastSeenAt > Math.max(STALE_USER_RATE_LIMIT_WINDOW_MS, log.windowMs)) {
      requestLog.delete(userId);
    }
  }
}

export function checkRateLimit(
  userId: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT,
): RateLimitResult {
  validateRateLimitConfig(config);

  const now = Date.now();
  cleanupInactiveUsers(now);

  const windowStart = now - config.windowMs;
  const userLog =
    requestLog.get(userId) ?? { timestamps: [], lastSeenAt: now, windowMs: config.windowMs };

  const timestamps = userLog.timestamps.filter((ts) => ts > windowStart);

  userLog.lastSeenAt = now;
  userLog.windowMs = Math.max(userLog.windowMs, config.windowMs);

  if (timestamps.length >= config.maxRequests) {
    requestLog.set(userId, { ...userLog, timestamps });
    return {
      allowed: false,
      remaining: 0,
      resetAt: timestamps[0] + config.windowMs,
    };
  }

  timestamps.push(now);
  requestLog.set(userId, { ...userLog, timestamps });

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    resetAt: timestamps[0] + config.windowMs,
  };
}

export function clearRateLimits(): void {
  requestLog.clear();
}
