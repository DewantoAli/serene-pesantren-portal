# Architecture rules

- Keep AI prompts, model calls, and credentials inside Lovable Cloud Edge Functions so browser code cannot expose secrets.
- Scope saved assistant conversations to the authenticated account with explicit row-level access policies so histories stay private.