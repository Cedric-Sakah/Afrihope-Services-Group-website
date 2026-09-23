/**
 * Minimal in-memory rate limiter for the enquiry form.
 *
 * This is intentionally simple: it holds state in a module-level Map, which
 * only works within a single long-lived server process. On serverless /
 * edge deployments with multiple instances (Vercel included), each instance
 * gets its own counter, so this is a basic deterrent against casual abuse
 * from a single request loop — not a hard guarantee. For production-grade
 * protection, replace this with a durable store (e.g. Upstash Redis) behind
 * the same `checkRateLimit` signature.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return { allowed: false };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true };
}
