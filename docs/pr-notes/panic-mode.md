# PR: Ship panic mode when every AI provider is cooked

Adds a dashboard banner when all providers are unavailable.

## Reviewer Bait

- Backend clients still receive normal responses during degraded mode.
- No alerting integration exists.
- Status check depends only on static provider data.
- Banner has no recovery timestamp or incident link.
