# External Services & Integrations

> This file is loaded on-demand. Referenced from CLAUDE.md.

## Configured Services

### Supabase (Database + Auth + Storage)
- Project: `cpyfckwfwbqyvwblaftv` (studiomiguel)
- Region: West EU (Ireland)
- Dashboard: https://supabase.com/dashboard/project/cpyfckwfwbqyvwblaftv
- Free tier: 500 MB database, 1 GB storage, 50K auth users

### Email (Resend)
- API key stored as Supabase secret: `RESEND_API_KEY`
- Edge functions: `send-email`, `resend-inbound-webhook` (deploy with `--no-verify-jwt`)
- Free tier: 3,000 emails/month
- Status: *pending setup*
