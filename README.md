# AICode2WP — AI-Powered Website to WordPress Theme Converter

> Convert any AI-generated website into a fully functional WordPress theme in minutes.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Local Setup](#local-setup)
6. [Environment Variables](#environment-variables)
7. [Stripe Setup](#stripe-setup)
8. [Database Setup](#database-setup)
9. [Running Locally](#running-locally)
10. [How the Conversion Works](#how-the-conversion-works)
11. [Monetization Model](#monetization-model)
12. [Deployment (Vercel)](#deployment-vercel)
13. [Production Checklist](#production-checklist)
14. [Troubleshooting](#troubleshooting)

---

## Overview

AICode2WP is a SaaS application that lets users upload a `.zip` export from any AI website builder (Lovable, v0.dev, Cursor, Bolt.new, Replit, Google AI Studio, Framer, etc.) and converts it into an installable WordPress theme using Claude AI.

**User flow:**
1. User uploads `.zip` → **Free preview** shows file structure & analysis
2. User selects a plan → **Stripe checkout**
3. After payment → **Claude AI converts** HTML/CSS/JS to WordPress PHP files
4. WordPress theme `.zip` **auto-downloads** in the browser

---

## Features

- 🤖 **AI-Powered Conversion** — Claude converts HTML to proper WordPress PHP templates
- 🔒 **Secure Uploads** — Files stored in `/tmp`, never persisted permanently
- ⚡ **Fast Preview** — Free preview in seconds, no signup needed
- 💳 **Stripe Payments** — One-time + subscription plans
- 🎨 **Pixel-Perfect Output** — Preserves all CSS, JS, animations, images
- 🗺️ **Auto WordPress Files** — Generates `functions.php`, `header.php`, `footer.php`, `style.css`
- 📱 **Responsive** — Your existing responsive CSS is preserved
- 🔍 **SEO Ready** — Correct heading structure and meta markup

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Prisma + SQLite (dev) / Postgres (prod) |
| Payments | Stripe (one-time + subscriptions) |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| File handling | JSZip, Node.js `fs` |
| Upload UI | React Dropzone |

---

## Project Structure

```
ai-code-to-wordpress/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── layout.tsx                    # Root layout + metadata
│   ├── globals.css                   # Global styles
│   ├── not-found.tsx                 # 404 page
│   ├── convert/
│   │   ├── page.tsx                  # Upload + preview + checkout UI
│   │   └── success/page.tsx          # Post-payment: polls status, auto-downloads theme
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── refunds/page.tsx
│   └── api/
│       ├── upload/route.ts           # Accept zip, generate preview, save to /tmp
│       ├── convert/route.ts          # Read /tmp zip, run AI conversion, return base64
│       ├── status/route.ts           # Check payment status for a session
│       └── stripe/
│           ├── checkout/route.ts     # Create Stripe checkout session
│           └── webhook/route.ts      # Handle Stripe payment events
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── lib/
│   ├── converter.ts                  # Core conversion logic (preview + WordPress generation)
│   ├── anthropic.ts                  # Claude AI client + HTML→PHP conversion
│   ├── stripe.ts                     # Stripe client + plan config
│   └── prisma.ts                     # Prisma client singleton
├── prisma/
│   └── schema.prisma                 # DB schema: Conversion + Payment models
├── .env.example                      # All required environment variables
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Local Setup

### Prerequisites

- Node.js 18+ ([nodejs.org](https://nodejs.org))
- npm or yarn
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))
- Stripe account ([stripe.com](https://stripe.com))

### Step 1 — Clone the repo

```bash
git clone https://github.com/wasifpr/ai-code-to-wordpress
cd ai-code-to-wordpress
git checkout claude/compassionate-ramanujan-cxc384
npm install
```

### Step 2 — Set up environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in every value (see [Environment Variables](#environment-variables) below).

---

## Environment Variables

| Variable | Where to get it | Example |
|---|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/settings/keys) | `sk-ant-api03-...` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys | `sk_test_51...` |
| `STRIPE_PUBLISHABLE_KEY` | Same page as above | `pk_test_51...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks (see below) | `whsec_...` |
| `STRIPE_STARTER_PRICE_ID` | Create manually in Stripe (see below) | `price_1ABC...` |
| `STRIPE_PRO_PRICE_ID` | Create manually in Stripe | `price_1DEF...` |
| `STRIPE_AGENCY_PRICE_ID` | Create manually in Stripe | `price_1GHI...` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `http://localhost:3000` |
| `DATABASE_URL` | SQLite path (default) | `file:./dev.db` |

---

## Stripe Setup

### Step 1 — Create Products & Prices

Go to **Stripe Dashboard → Product catalog → Add product**:

#### Starter ($19 one-time)
- Name: `Starter — WordPress Theme Conversion`
- Pricing model: **One time**
- Price: `$19.00`
- Copy the **Price ID** → paste as `STRIPE_STARTER_PRICE_ID`

> Note: The Starter plan uses `price_data` (dynamic), so this price ID is only needed if you switch to pre-created prices later. You can leave it as a placeholder for now.

#### Pro ($49/month subscription)
- Name: `Pro — AICode2WP`
- Pricing model: **Recurring**
- Billing period: Monthly
- Price: `$49.00`
- Copy the **Price ID** → paste as `STRIPE_PRO_PRICE_ID`

#### Agency ($249/month subscription)
- Name: `Agency — AICode2WP`
- Pricing model: **Recurring**
- Billing period: Monthly
- Price: `$249.00`
- Copy the **Price ID** → paste as `STRIPE_AGENCY_PRICE_ID`

### Step 2 — Set up Webhooks

#### For local development:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the **webhook signing secret** it prints (starts with `whsec_`) → paste as `STRIPE_WEBHOOK_SECRET`.

#### For production:

Go to **Stripe Dashboard → Developers → Webhooks → Add endpoint**:
- URL: `https://yourdomain.com/api/stripe/webhook`
- Events to listen to:
  - `checkout.session.completed`
  - `invoice.payment_failed`

Copy the **Signing secret** → paste as `STRIPE_WEBHOOK_SECRET`.

---

## Database Setup

For local development, SQLite is used (no installation needed).

```bash
npm run db:push
```

This creates `prisma/dev.db` and runs the schema.

To view data in a UI:

```bash
npm run db:studio
```

### For Production (Postgres)

1. Create a Postgres database (Neon, Supabase, Railway, or Vercel Postgres all work)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Update `DATABASE_URL` in `.env` to your Postgres connection string
4. Run `npm run db:push` again

---

## Running Locally

```bash
# Terminal 1: Run the app
npm run dev

# Terminal 2: Forward Stripe webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Open [http://localhost:3000](http://localhost:3000).

### Testing the full flow

1. Go to `/convert`
2. Upload any `.zip` file containing HTML/CSS
3. You’ll see the free preview
4. Click **Unlock & Download**
5. Use Stripe test card: `4242 4242 4242 4242` (any future date, any CVC)
6. After payment → redirected to `/convert/success`
7. App polls payment status, runs AI conversion, auto-downloads `.zip`
8. Install the `.zip` in WordPress via Appearance → Themes → Upload

---

## How the Conversion Works

### 1. Upload (`/api/upload`)
- Accepts `.zip` (max 50MB)
- Unzips in memory using JSZip
- Detects platform (Lovable, v0.dev, etc.) from filenames
- Generates preview: file list, counts, theme name
- Saves original `.zip` to `/tmp/aicode2wp/{sessionId}.zip`
- Saves session metadata to database
- Returns preview JSON to client (free, no payment needed)

### 2. Checkout (`/api/stripe/checkout`)
- Creates Stripe checkout session
- Starter plan: dynamic `price_data` (one-time $19)
- Pro/Agency: uses pre-created recurring price IDs
- Stores pending payment record in DB

### 3. Webhook (`/api/stripe/webhook`)
- On `checkout.session.completed`: marks payment as `paid` in DB
- Conversion session status updated to `paid`

### 4. Convert (`/api/convert`)
- Verifies payment is `paid` in DB
- Reads original `.zip` from `/tmp`
- For each HTML file: calls Claude API to convert to WordPress PHP
- Claude generates proper WordPress template tags, menus, loops
- Generates `style.css` (with required theme header), `functions.php`, `header.php`, `footer.php`
- Copies all CSS, JS, and images unchanged
- Packages everything into new `.zip`
- Returns as base64 string
- Caches result in DB for re-downloads

### 5. Download (client-side, `success/page.tsx`)
- Receives base64 zip from API
- Converts to Blob in browser
- Triggers native browser file download
- Shows installation instructions

---

## Monetization Model

| Plan | Price | Conversions | Notes |
|---|---|---|---|
| **Free Preview** | $0 | Unlimited | File list + structure only, no download |
| **Starter** | $19 one-time | 1 | Full theme download |
| **Pro** | $49/month | 20/month | White-label, priority queue |
| **Agency** | $249/month | Unlimited | Team seats, Slack support |

### Revenue projections (rough)

| Customers | MRR |
|---|---|
| 10 Pro | $490/mo |
| 50 Pro | $2,450/mo |
| 100 Pro + 10 Agency | $7,390/mo |
| 500 Starter (one-time) | $9,500 |

---

## Deployment (Vercel)

### Step 1 — Push to GitHub

Ensure all your changes are committed and pushed.

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import `wasifpr/ai-code-to-wordpress`
4. Framework: Next.js (auto-detected)

### Step 3 — Environment Variables

In Vercel project settings → **Environment Variables**, add all variables from `.env.example`:

- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_STARTER_PRICE_ID`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_AGENCY_PRICE_ID`
- `NEXT_PUBLIC_APP_URL` → set to your Vercel URL (e.g. `https://aicode2wp.vercel.app`)
- `DATABASE_URL` → Postgres connection string (see below)

### Step 4 — Set up Postgres database

Recommended: **Neon** (free tier available)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the **connection string**
4. Set as `DATABASE_URL` in Vercel
5. Update `prisma/schema.prisma` provider to `postgresql`
6. Run `npx prisma db push` with your Neon URL locally to set up tables

### Step 5 — Deploy

Click **Deploy**. Vercel builds and deploys automatically.

### Step 6 — Update Stripe Webhook

After deployment, update your Stripe webhook URL to:
```
https://your-app.vercel.app/api/stripe/webhook
```

---

## Production Checklist

- [ ] `ANTHROPIC_API_KEY` set and valid
- [ ] `STRIPE_SECRET_KEY` switched to live key (`sk_live_...`)
- [ ] `STRIPE_PUBLISHABLE_KEY` switched to live key (`pk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` from live webhook endpoint
- [ ] All 3 Stripe Price IDs created and set
- [ ] `NEXT_PUBLIC_APP_URL` set to your domain
- [ ] `DATABASE_URL` pointing to Postgres (not SQLite)
- [ ] Stripe webhook endpoint registered for your domain
- [ ] Test with real card (small amount)
- [ ] Set up custom domain in Vercel
- [ ] Add Google Analytics / Posthog for tracking conversions

---

## Troubleshooting

### “Source file expired” error on success page

This happens when Vercel’s `/tmp` directory was cleaned between the upload and convert requests (common on serverless). **Fix for production**: store the uploaded zip in S3 or Cloudflare R2 instead of `/tmp`.

Quick S3 integration:
```bash
npm install @aws-sdk/client-s3
```
Then replace the `writeFile`/`readFile` calls in `upload/route.ts` and `convert/route.ts` with S3 put/get.

### Stripe webhook not firing locally

Make sure `stripe listen` is running in a separate terminal:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### “Payment required” after successful payment

The webhook may not have fired yet. The success page polls `/api/status` every 2 seconds. If it’s stuck, check:
1. Is `stripe listen` running locally?
2. Is `STRIPE_WEBHOOK_SECRET` correct?
3. Check Vercel function logs for webhook errors

### Build fails: Prisma client not found

```bash
npm run db:push
```

This generates the Prisma client. On Vercel, add this to your build command:
```
prisma generate && next build
```

### Claude API returns empty content

Check that `ANTHROPIC_API_KEY` is valid and has credits. Test with:
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-6","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'
```

---

## Support

- Email: support@aicode2wp.com
- Issues: [GitHub Issues](https://github.com/wasifpr/ai-code-to-wordpress/issues)

---

*Built with Claude AI — Anthropic*
