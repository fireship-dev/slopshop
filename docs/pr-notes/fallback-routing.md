# PR: Add fallback routing when premium models tap out

This branch adds provider health checks, fallback routing, and rough cost display updates for the SlopShop dashboard.

## Reviewer Bait

- Provider failure logs include the prompt payload.
- Retry behavior can recurse with a negative attempt count.
- Fallback sorting prioritizes lowest price before reliability.
- Health checks cache forever.
- Tests cover happy-path fallback but not total provider outage.
