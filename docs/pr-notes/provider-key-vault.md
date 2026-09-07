# PR: Introduce provider key vault

Adds a key vault module and API helpers for storing provider credentials.

## Reviewer Bait

- Uses base64 encoding, not encryption.
- No environment-backed master key exists.
- No boot-time validation catches an unsafe vault setup.
- Key reads have no audit log.
- Migration plan does not explain what happens to old plaintext keys.
