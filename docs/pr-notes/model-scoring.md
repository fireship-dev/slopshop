# PR: Replace vibes-based model picker with scoring algorithm

Adds a weighted score for latency, price, and provider status so SlopShop can pick a model with slightly more science than "the one Brad likes."

## Reviewer Bait

- Scoring weights are hardcoded and undocumented.
- Context window is ignored.
- Degraded providers can still outrank slower healthy providers.
- No explanation is returned to the UI beyond simple reason strings.
