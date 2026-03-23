# Database Schema Reference

> This file is loaded on-demand. Referenced from CLAUDE.md.

## Core Tables

```
app_users           - Admin/authenticated users
brand_config        - Site branding (name, colors, logo)
property_config     - Site-level settings (single row)
page_display_config - Tab visibility per section
people              - Contact records
media               - Uploaded files and images
```

## Email Tables

```
email_templates     - Reusable email templates (subject, body, variables)
inbound_emails      - Received emails (via Resend webhook)
```

## Other Tables

```
thoughts            - AI-generated content / notes
```

## Common Patterns

- All tables use UUID primary keys
- All tables have `created_at` and `updated_at` timestamps
- RLS is enabled on all tables
- `is_archived` flag for soft deletes (filter client-side)
