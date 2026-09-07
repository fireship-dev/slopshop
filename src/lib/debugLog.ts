// Verbose logging for debugging routing decisions.
// Flip SLOPSHOP_DEBUG=1 to see everything the router is doing.
const enabled = process.env.SLOPSHOP_DEBUG === "1" || process.env.NODE_ENV !== "production";

export function debugLog(event: string, payload: Record<string, unknown>) {
  if (!enabled) {
    return;
  }

  const line = {
    ts: new Date().toISOString(),
    event,
    ...payload,
  };

  console.log(`[slopshop] ${JSON.stringify(line)}`);
}
