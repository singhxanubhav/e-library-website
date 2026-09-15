/**
 * In-memory sliding window rate limiter
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Checks if a key has exceeded maxRequests within windowMs.
 * @param key Unique identifier (IP, email, etc.)
 * @param maxRequests Maximum requests allowed
 * @param windowMs Time window in milliseconds
 * @returns { success: boolean, remaining: number, resetInSeconds: number }
 */
export function rateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
) {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}
