# WedCheese Blog Content Plan

Website: https://www.wedcheese.com/  
Last updated: June 2026

## Positioning

WedCheese is the AI wedding planner that turns your real wedding details into an organised plan: checklist, budget, guests, RSVP, decor, vendors, and notes in one calm app.

**Tone:** Helpful, practical, warm, modern. British English default. AI as admin assistant—not a replacement for human planners or emotional decisions.

## SEO clusters

| Cluster | Primary keywords | Hub articles |
|--------|------------------|--------------|
| AI Wedding Planner | AI wedding planner, AI wedding planning app, ChatGPT wedding planning | `best-ai-wedding-planner-apps-2026`, `ai-wedding-planner-vs-chatgpt`, `ai-wedding-admin` |
| Checklist & Timeline | wedding checklist, 12/6 month wedding checklist, wedding day timeline | `12-month-wedding-planning-checklist`, `6-month-wedding-planning-checklist`, `wedding-day-timeline-template` |
| Budget & Costs | wedding budget tracker, wedding budget calculator, hidden wedding costs | `average-uk-wedding-cost-2026`, `wedding-budget-calculator`, `15000-wedding-budget-uk`, `hidden-wedding-costs` |
| Guest List & RSVP | online wedding RSVP, wedding guest list template, dietary requirements | `online-wedding-rsvp-guide`, `wedding-guest-list-template`, `wedding-dietary-requirements` |
| Decor & Style | wedding decor checklist, wedding colour palette, DIY wedding decor | `wedding-decor-checklist`, `wedding-colour-palette-guide`, `diy-wedding-decor-worth-it` |
| Vendors | wedding vendor checklist, compare vendor quotes, venue questions | `wedding-vendor-checklist`, `compare-wedding-vendor-quotes`, `questions-to-ask-wedding-venue` |
| Etiquette & Messages | adults only wording, RSVP reminder, no plus-one wording | `adults-only-wedding-wording`, `wedding-rsvp-reminder-wording`, `no-plus-one-wedding-wording` |

## Priority articles (30)

All 30 priority articles are published. Source content lives in `marketing/blog/_content/*.html`; metadata in `manifest.json`.

| P | Slug | Primary keyword | Category |
|---|------|-----------------|----------|
| 1 | best-ai-wedding-planner-apps-2026 | best AI wedding planner apps | AI |
| 2 | ai-wedding-planner-vs-chatgpt | AI wedding planner vs ChatGPT | AI |
| 3 | 12-month-wedding-planning-checklist | 12 month wedding checklist | Checklist |
| 4 | 6-month-wedding-planning-checklist | 6 month wedding checklist | Checklist |
| 5 | average-uk-wedding-cost-2026 | average UK wedding cost 2026 | Budget |
| 6 | wedding-budget-calculator | wedding budget calculator | Budget |
| 7 | 15000-wedding-budget-uk | £15,000 wedding budget UK | Budget |
| 8 | online-wedding-rsvp-guide | online wedding RSVP | RSVP |
| 9 | wedding-guest-list-template | wedding guest list template | RSVP |
| 10 | wedding-decor-checklist | wedding decor checklist | Decor |
| 11 | wedding-colour-palette-guide | wedding colour palette | Decor |
| 12 | wedding-vendor-checklist | wedding vendor checklist | Vendors |
| 13 | questions-to-ask-wedding-venue | questions to ask wedding venue | Vendors |
| 14 | wedding-day-timeline-template | wedding day timeline template | Checklist |
| 15 | hidden-wedding-costs | hidden wedding costs | Budget |
| 16 | wedding-guest-count-budget | wedding cost per guest | Budget |
| 17 | wedding-rsvp-reminder-wording | wedding RSVP reminder wording | Etiquette |
| 18 | adults-only-wedding-wording | adults only wedding wording | Etiquette |
| 19 | no-plus-one-wedding-wording | no plus one wedding wording | Etiquette |
| 20 | diy-wedding-decor-worth-it | DIY wedding decor | Decor |
| 21 | compare-wedding-vendor-quotes | compare wedding vendor quotes | Vendors |
| 22 | wedding-deposit-tracker | wedding deposit tracker | Budget |
| 23 | what-to-do-after-getting-engaged | what to do after getting engaged | Checklist |
| 24 | wedding-week-checklist | wedding week checklist | Checklist |
| 25 | wedding-vendor-shortlist | wedding vendor shortlist | Vendors |
| 26 | wedding-dietary-requirements | wedding dietary requirements | RSVP |
| 27 | wedding-table-decor-ideas-budget | wedding table decor ideas | Decor |
| 28 | ai-wedding-admin | AI wedding admin | AI |
| 29 | wedding-budget-spreadsheet-vs-app | wedding budget spreadsheet | Budget |
| 30 | plan-wedding-without-a-planner | plan wedding without a planner | Checklist |

## Legacy URL redirects

Old slugs redirect to canonical SEO slugs (meta refresh + canonical):

- `chatgpt-vs-ai-wedding-planner` → `ai-wedding-planner-vs-chatgpt`
- `12-month-wedding-checklist` → `12-month-wedding-planning-checklist`
- `6-month-wedding-checklist` → `6-month-wedding-planning-checklist`
- `wedding-budget-breakdown` → `15000-wedding-budget-uk`
- `hidden-wedding-costs-tracker` → `hidden-wedding-costs`
- `wedding-day-timeline-schedule` → `wedding-day-timeline-template`
- `adults-only-wedding-guests` → `adults-only-wedding-wording`
- `traditional-paper-rsvps-dead` → `online-wedding-rsvp-guide`
- `digital-guest-list-manager-rsvp-links` → `online-wedding-rsvp-guide`

## Internal linking map

- **AI cluster** links to: vs ChatGPT, best apps, AI admin, 12-month checklist, budget calculator
- **Checklist cluster** links to: 12-month, 6-month, wedding week, day timeline, after engaged
- **Budget cluster** links to: average cost, calculator, £15k, hidden costs, deposit tracker, guest count
- **RSVP cluster** links to: online RSVP, guest list template, reminder wording, dietary, adults-only, no plus-one
- **Decor cluster** links to: decor checklist, colour palette, DIY decor, table decor by budget
- **Vendor cluster** links to: vendor checklist, venue questions, compare quotes, shortlist, deposit tracker

## CTA strategy

| Variant | Use when |
|---------|----------|
| `general` | Default end-of-article |
| `ai` | AI comparison, admin, planner articles |
| `budget` | Budget, cost, deposit articles |
| `rsvp` | Guest list, RSVP, dietary articles |
| `checklist` | Timeline, checklist, wedding week |
| `decor` | Decor, palette, table styling |
| `vendor` | Vendor search, quotes, venue |

Each article includes mid-article + end CTA blocks. Blog index has hub CTA.

## Build workflow

```bash
# Edit body: marketing/blog/_content/{slug}.html
# Edit metadata: marketing/blog/_content/manifest.json
node marketing/scripts/render-blog-post.mjs --all
node marketing/scripts/generate-blog-index.mjs
```

Deploy: sync `marketing/` to `OrienjoJi/wedcheese-site` (GitHub Pages → www.wedcheese.com).

## Future content ideas

- 3 month wedding checklist
- £10,000 / £20,000 UK budget guides
- Wedding photographer questions
- Wedding catering questions
- Ceremony decor checklist (standalone)
- Pinterest wedding ideas → decor workflow
