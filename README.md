# Oga Plug

**Business Operating System for Africa**

A hybrid business record-keeping system where Nigerian business owners capture data through WhatsApp (voice, photo, text) and manage their business through a web dashboard.

---

## The Problem

41 million Nigerian businesses have no financial records. They cannot access credit, cannot detect theft, and cannot make data-driven decisions. Not because they are bad at business, but because no tool was built for the way they actually operate.

## The Solution

Oga Plug is designed around how these businesses already operate:
- **WhatsApp is already open** → Use it for data input
- **Receipts are already being photographed** → OCR extracts the data
- **Voice notes are already being sent** → AI transcribes and logs transactions
- **Transfer alerts are already being screenshotted** → System reads and matches payments

### Hybrid Architecture

**WhatsApp Layer** (Input & Notifications)
- Voice note sales in Pidgin or English
- Photo receipt scanning (OCR)
- Bank transfer alert reading
- Quick stock checks
- Daily sales summaries
- Debt reminders

**Web Dashboard** (Management & Reports)
- Full inventory management
- Customer debt ledger
- Financial reports (P&L, Cash Flow)
- Staff permissions
- Export capabilities

---

## MVP Scope

The MVP focuses on **three core functions** built excellently:

### 1. Smart Capture Engine
- Voice notes, photos, or text messages
- OCR for handwritten and printed receipts
- Bank transfer screenshot parsing
- **Confirmation required before every entry**

### 2. Inventory & Stock Management
- Real-time stock levels
- Low-stock WhatsApp alerts
- Stock movement history
- Expiry date tracking (pharmacy users)

### 3. Customer Debt Ledger
- Log credit sales by voice or text
- Check customer balances instantly
- Automated WhatsApp debt reminders
- Payment tracking and reconciliation

---

## Target Users (MVP)

### General Trade Owners
- **Location:** Mile 3 Port Harcourt, Ariaria Aba, New Owerri
- **Revenue:** ₦500K - ₦5M monthly
- **Pain:** Uncollected debts, unknown profit margins, manual stock tracking

### Pharmacy Owners
- **Location:** GRA Port Harcourt, Commercial areas Owerri
- **Revenue:** ₦1M - ₦10M monthly
- **Pain:** Drug expiry losses, supplier invoice entry (200+ items), NAFDAC/PCN compliance

---

## Tech Stack

### Frontend
- **Framework:** React 19 + Vite + TypeScript
- **Routing:** React Router (`src/lib/routes.ts` holds the route table; content pages are code-split)
- **Styling:** Tailwind CSS v4 (design tokens in `src/styles/globals.css`, read through `@config`)
- **Components:** shadcn/ui structure: Radix primitives in `src/components/ui`, merged with `cn()`
- **Design system:** glass morphism (`src/lib/glass-morphism.ts`) on an ink ambient background
- **Motion:** Framer Motion (`src/components/motion/reveal.tsx`)
- **Icons:** Lucide React
- **Deployment:** Netlify / Vercel: both need the SPA fallback, which is committed (`public/_redirects` for Netlify, `vercel.json` for Vercel). Without it every deep link to a legal page 404s.

### Backend (Planned)
- **API:** Python FastAPI
- **Database:** PostgreSQL (AWS RDS)
- **WhatsApp:** Meta Cloud API (WhatsApp Business)
- **OCR:** AWS Textract
- **Voice:** OpenAI Whisper API
- **AI Parsing:** Claude / GPT-4o-mini
- **Storage:** AWS S3

---

## Project Structure

```
oga-plug/
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives + the design system
│   │   │   ├── chat.tsx          # headless chat (scrolling, submit event, composer)
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── glass-card.tsx    # GlassCard / SectionHeading / SectionContainer
│   │   │   ├── menu.tsx          # UserProfileSidebar
│   │   │   └── …                 # button, input, avatar, dropdown, popover, …
│   │   ├── brand/logo.tsx        # Logo, BrandMark, BrandAvatar (from assets/logo.jpg)
│   │   ├── layout/               # shared chrome and page furniture
│   │   │   ├── site-header.tsx   # glass menubar + mobile panel
│   │   │   ├── nav-mega.tsx      # hover mega-menu (opaque overlay surface)
│   │   │   ├── site-footer.tsx   # product / company / legal columns + sitemap
│   │   │   ├── page-shell.tsx    # PageHero, PageBody, Prose, Callout, …
│   │   │   ├── legal-page.tsx    # the shared legal-document layout + contents rail
│   │   │   ├── scroll-manager.tsx# scroll and hash handling per route
│   │   │   └── section-link.tsx  # route-aware link for shared chrome
│   │   ├── sections/             # hero, features, how-it-works, industries,
│   │   │                         # pricing, testimonials, cta
│   │   ├── chat/                 # whatsapp-demo: the live, interactive demo
│   │   ├── motion/               # scroll-reveal + stagger primitives
│   │   ├── animated-counter.tsx
│   │   └── whatsapp-fab.tsx      # floating chat button
│   ├── pages/                    # one component per route (see Routes below)
│   ├── lib/
│   │   ├── utils.ts              # cn(), formatting, initials avatars
│   │   ├── routes.ts             # the route table and every nav/footer link group
│   │   ├── site.ts               # company, contact and WhatsApp details
│   │   └── glass-morphism.ts     # the frosted-surface class map
│   ├── styles/globals.css        # design tokens, ambient background, overlay surfaces
│   ├── assets/logo.jpg           # the source logo every brand asset is derived from
│   ├── App.tsx
│   └── main.tsx
├── public/                       # favicon, touch icon, OG card, manifest
├── tailwind.config.ts
├── tsconfig.app.json
├── postcss.config.js
└── README.md
```

---

## Routes

| Path | Page | Source |
|------|------|--------|
| `/` | Marketing home | n/a |
| `/about` | About Us | the About Us copy |
| `/contact` | Contact Us | the Contact Us copy |
| `/privacy-policy` | Privacy Policy (NDPA 2023) | the Privacy Policy copy |
| `/terms-of-use` | Terms of Use | the Terms of Use copy |
| `/terms-and-conditions` | Terms and Conditions, including the plan table | the Terms and Conditions copy |
| `*` | 404 | n/a |

Every one of them is linked from the footer's Company and Legal columns and its
sitemap row. The anchors the marketing page is built from are addressed from
other routes as `/#features` and friends, so `src/lib/routes.ts` is the only
place those strings appear.

### Brand assets

Everything derives from `src/assets/logo.jpg`: a black mark on an opaque white
square, which cannot be used as a favicon as it stands. The mark is knocked out
of its white ground (per-pixel alpha from luminance; the source is pure
greyscale, so nothing is lost), cropped tight, and set on a brand ink tile:

| File | Size | Use |
|------|------|-----|
| `public/favicon-48.png` | 48² | browser tab |
| `public/apple-touch-icon.png` | 180² | iOS home screen |
| `public/icon-512.png` | 512² | PWA / manifest |
| `public/brand-mark.png` | 512² | transparent mark for avatars |
| `public/og-image.png` | 1200×630 | link previews |

The original JPEG is used unmodified for the header and footer lockup, on a
white tile so it looks as drawn.

### Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev server on `http://127.0.0.1:5173` |
| `npm run build` | Type-checks (`tsc -b`) then builds to `dist/` |
| `npm run typecheck` | Types only |
| `npm run lint` | ESLint |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/izzychils/oga-plug.git
cd oga-plug

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Subscription Plans

| Plan | Price | Target User |
|------|-------|-------------|
| **Free** | ₦0 | Trial users - 50 products, 100 transactions/month |
| **Trader** | ₦3,500/month | Single-location shops and market traders |
| **Business** | ₦8,500/month | Growing businesses with staff and multiple locations |
| **Pharmacy** | ₦15,000/month | Registered pharmacies with expiry tracking & compliance |

---

## Phase Roadmap

### Phase 1 - MVP (Current)
- ✅ Smart Capture Engine
- ✅ Inventory Management
- ✅ Customer Debt Ledger
- ✅ WhatsApp + Web Dashboard
- ✅ Port Harcourt & Owerri launch

### Phase 2 - Expansion (Q3 2026)
- Full financial statements (P&L, Balance Sheet, Cash Flow)
- NAFDAC and PCN compliance module (pharmacy)
- Supplier linking and shared waybills
- Agriculture vertical
- Multi-business management
- Expand to Aba, Lagos, Abuja

### Phase 3 - Platform (Q1 2027)
- B2B wholesale marketplace
- Market price intelligence board
- In-app payments and escrow
- Loan origination with MFB partners
- FMCG data product
- USSD layer for feature phones
- National expansion

---

## Development Timeline

**16-week MVP build** (2-developer team)

- **Weeks 1-2:** Infrastructure setup, WhatsApp API echo-bot, PostgreSQL provisioning
- **Weeks 3-4:** Business registration, product catalogue CRUD
- **Weeks 5-6:** Voice note & text transaction logging with Whisper
- **Weeks 7-8:** Receipt photo OCR flow with AWS Textract
- **Weeks 9-10:** Inventory management and low-stock alerts
- **Weeks 11-12:** Customer debt ledger and automated reminders
- **Weeks 13-14:** Transfer alert parsing, payment matching
- **Weeks 15-16:** Daily summaries, pharmacy expiry layer, full integration testing

---

## Key Technical Decisions

### Why Hybrid (WhatsApp + Web Dashboard)?

WhatsApp alone is insufficient for complex business management. The hybrid approach gives:
- **WhatsApp:** Fast input, notifications, quick checks (under 30 seconds)
- **Web Dashboard:** Reports, analytics, management tasks (requires navigation)

Both layers access the same database. Interface adapts to the task.

### Why Confirmation Before Logging?

OCR accuracy on handwritten receipts: 15-30% error rate at launch. Voice transcription in Pidgin has ambiguity. **Every extraction requires user confirmation** before data is committed. This prevents the system from corrupting business records.

### Why Port Harcourt & Owerri First?

- Highest density of target users
- SchoolPaddi existing presence (Lightway Model School, Davfai International School)
- Pharmacy association access (PSN Rivers State chapter)
- Market agent network already established

---

## Contributing

This is a pre-launch product. Contributions are welcome from developers, designers, and Nigerian business operators who understand the problem space.

### Areas Where Help is Needed

1. **Frontend:** Accessibility improvements, mobile optimization
2. **Backend:** WhatsApp Business API integration, OCR pipeline
3. **UX Research:** User testing with Port Harcourt market traders
4. **Content:** Nigerian business scenarios, Pidgin voice command testing

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

Proprietary - Oga Plug © 2026

---

## Contact

**Oga Plug**
- Website: [https://oga-plug.com](https://oga-plug.com)
- Email: user@ogaplug.com
- WhatsApp: +234 XXX XXX XXXX (coming soon)

---

## Acknowledgments

Built for Nigerian businesses who have been ignored by every existing business tool. This is for the market trader in Mile 3, the pharmacy owner in GRA, the woman selling tomatoes in New Owerri Market. You run real businesses. You deserve real tools.

---

**Version:** 2.0 (PRD-aligned)  
**Status:** Pre-Development  
**Last Updated:** April 2026
