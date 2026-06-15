# AICode2WP — Convert AI Websites to WordPress Themes

A SaaS application that uses Claude AI to convert AI-generated websites (from Lovable, v0.dev, Cursor, Bolt.new, etc.) into fully functional WordPress themes.

## Features

- Upload any `.zip` export from any AI site builder
- Free preview: see file structure and conversion summary instantly
- AI-powered conversion using Claude API
- Generates `index.php`, `header.php`, `footer.php`, `functions.php`, `style.css`
- Stripe payments: one-time ($19) or subscription (Pro $49/mo, Agency $249/mo)
- SQLite database via Prisma (easily swap to Postgres)

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS**
- **Prisma + SQLite**
- **Stripe** (payments)
- **Anthropic Claude API** (AI conversion)
- **JSZip** (zip processing)
- **React Dropzone** (file upload UI)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/wasifpr/ai-code-to-wordpress
cd ai-code-to-wordpress
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | From [console.anthropic.com](https://console.anthropic.com) |
| `STRIPE_SECRET_KEY` | From Stripe dashboard |
| `STRIPE_PUBLISHABLE_KEY` | From Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook settings |
| `STRIPE_STARTER_PRICE_ID` | Create a $19 one-time price in Stripe |
| `STRIPE_PRO_PRICE_ID` | Create a $49/mo recurring price in Stripe |
| `STRIPE_AGENCY_PRICE_ID` | Create a $249/mo recurring price in Stripe |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | `file:./dev.db` for SQLite |

### 3. Database setup

```bash
npm run db:push
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Stripe webhook (local dev)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Monetization Model

| Plan | Price | Conversions |
|---|---|---|
| Starter | $19 one-time | 1 |
| Pro | $49/month | 20/month |
| Agency | $249/month | Unlimited |

Users get a **free preview** (file list + structure) before paying. Download requires payment.

## Deployment

Deploy to [Vercel](https://vercel.com) — zero config for Next.js.

1. Push to GitHub
2. Import repo in Vercel
3. Add all env variables in Vercel dashboard
4. For production database, swap SQLite for Postgres (update `prisma/schema.prisma` provider)
5. Set up Stripe webhook pointing to `https://yourdomain.com/api/stripe/webhook`

## Project Structure

```
/app
  page.tsx                    # Landing page
  /convert
    page.tsx                  # Upload & conversion UI
    /success/page.tsx         # Post-payment success
  /api
    /upload/route.ts          # Handle zip upload & preview
    /convert/route.ts         # Full conversion (post-payment)
    /stripe
      /checkout/route.ts      # Create Stripe checkout session
      /webhook/route.ts       # Handle Stripe webhooks
/components
  Navbar.tsx
  Hero.tsx
  HowItWorks.tsx
  Features.tsx
  Pricing.tsx
  Testimonials.tsx
  FAQ.tsx
  Footer.tsx
/lib
  converter.ts               # Core WordPress conversion logic
  anthropic.ts               # Claude AI client
  stripe.ts                  # Stripe client & plan config
  prisma.ts                  # Prisma client singleton
/prisma
  schema.prisma              # DB schema (Conversion + Payment models)
```
