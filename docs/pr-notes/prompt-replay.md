# PR: Add prompt replay page for failed generations

Adds a replay UI where developers can inspect failed generations and retry them when the provider stops having a moment.

## Reviewer Bait

- Raw prompts are available to anyone who can load the page.
- Retry button has no loading state or double-submit guard.
- Failed prompt list is not paginated.
- No audit trail records who replayed a prompt.
