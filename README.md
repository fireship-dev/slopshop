# SlopShop

One cursed API for routing prompts through whichever AI model is currently cheapest, fastest, or least emotionally unavailable.

SlopShop is a fake internal developer tool used for demoing PR review workflows. It tracks AI providers, routes prompt requests, estimates cost, and lets the team inspect provider health before the monthly invoice starts asking questions.

## Demo PRs

This repo intentionally includes a handful of branches that look like pull requests:

- `pr/fallback-routing`
- `pr/model-scoring`
- `pr/prompt-replay`
- `pr/provider-key-vault`
- `pr/panic-mode`
- `pr/hallucination-budget`

The hero branch is `pr/fallback-routing`.

## Product Vibe

- register AI providers and models (Claude, GPT, Gemini, Mistral, DeepSeek, and whatever Brad is running)
- route prompts through a fallback chain
- track latency, cost, and recent failures
- inspect failed generations
- panic politely when every provider is down
