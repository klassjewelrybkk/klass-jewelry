# Klass Jewelry — E-Commerce Website

> Handcrafted since 1992 · Built with Next.js 14, Supabase, Stripe

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth/Storage | Supabase |
| Payments | Stripe Checkout |
| Deployment | Vercel |

---

## Project Structure

```
klass-jewelry/
├── app/
│   ├── (store)/          ← Public store pages
│   │   ├── page.tsx      ← Home
│   │   ├── shop/         ← Shop listing
│   │   ├── product/[id]/ ← Product detail
│   │   ├── cart/         ← Cart
│   │   ├── checkout/     ← Checkout
│   │   └── success/      ← Order confirmed
│   ├── admin/            ← Admin dashboard
│   └── api/
│       ├── products/     ← GET /api/products
│       ├── checkout/     ← POST /api/checkout
│       ├── orders/       ← GET /api/orders
│       │   └── [id]/     ← PATCH /api/orders/:id
│       └── webhooks/
│           └── stripe/   ← Stripe webhook
├── components/
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── supabase.ts       ← Supabase client
│   ├── stripe.ts         ← Stripe client
│   ├── products.ts       ← Product data + types
│   └── cart-context.tsx  ← Global cart state
├── styles/
│   └── globals.css
├── public/
│   └── logo.png          ← ← ← PUT YOUR LOGO HERE
├── supabase-schema.sql   ← Run in Supabase SQL Editor
└── .env.example          ← Copy to .env.local
```

---

## Setup Guide (Step by Step)

### Step 1 — Install Dependencies

```bash
npm install
```

### Step 2 — Add Your Logo

Place your `logo.png` file inside the `/public` folder.

```
public/
  logo.png   ← your Klass logo here
```

### Step 3 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your actual values in `.env.local`:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks |

### Step 4 — Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** → **New Query**
4. Paste the contents of `supabase-schema.sql`
5. Click **Run**

### Step 5 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Klass Jewelry"
git remote add origin https://github.com/YOUR_USERNAME/klass-jewelry.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → Import your GitHub repo
3. Go to **Settings → Environment Variables**
4. Add all variables from your `.env.local`
5. Click **Deploy**

### Step 3 — Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers → Webhooks**
2. Click **Add endpoint**
3. URL: `https://your-site.vercel.app/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret** → add as `STRIPE_WEBHOOK_SECRET` in Vercel

---

## API Reference

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products?category=Rings` | Filter by category |
| `POST` | `/api/checkout` | Create Stripe session |
| `GET` | `/api/orders` | List all orders (admin) |
| `GET` | `/api/orders/:id` | Get single order |
| `PATCH` | `/api/orders/:id` | Update order status |
| `POST` | `/api/webhooks/stripe` | Stripe webhook handler |

---

## Payment Flow

```
Customer → Cart → Checkout Form
  → POST /api/checkout
    → Create order (status: pending) in Supabase
    → Create Stripe Checkout Session
    → Redirect to Stripe
Customer pays on Stripe
  → Stripe fires webhook → POST /api/webhooks/stripe
    → Verify signature
    → Update order status to "paid" in Supabase
    → Redirect to /success
```

---

## Customization

### Adding Real Product Photos

Replace emoji placeholders with actual images:

1. Upload photos to Supabase Storage or any CDN
2. Update `image` field in the products table
3. In `ProductCard.tsx`, replace the emoji div with:
```tsx
import Image from 'next/image'
<Image src={product.image} alt={product.name} fill className="object-cover" />
```

### Adding More Products

Add entries to the `PRODUCTS` array in `lib/products.ts`, or insert rows into the Supabase `products` table.

---

## License

© 2025 Klass Jewelry. All rights reserved.
