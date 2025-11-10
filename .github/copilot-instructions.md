# GitHub Copilot Instructions

## Project Overview
Next.js 16 government portal for the Institute of Youth Affairs (UX4G-compliant design system). TypeScript + Supabase backend with AI chatbot integration.

## Architecture

### Route Groups & Layouts
- **`app/(public)/`** — Public pages with Navigation/Footer/Chatbot (see `app/(public)/layout.tsx`)
- **`app/admin/`** — Admin dashboard (separate layout, protected by middleware)
- **`app/layout.tsx`** — Root layout only contains global providers (Analytics, Toaster, fonts)
- **Rule:** Never add Navigation/Footer to individual pages; they're inherited from group layouts

### Database Architecture
- **Backend:** Supabase PostgreSQL with Row Level Security (RLS)
- **Client:** `lib/db.ts` exports singleton `supabase` client using service role key
- **Schema scripts:** `scripts/001-init-schema.sql` through `005-analytics-functions-indexes.sql`
- **Key tables:** `events`, `news`, `gallery`, `programs`, `users`, `event_registrations`, `faq`, `site_settings`
- **Analytics:** Use DB functions `get_monthly_registrations()` and `get_weekly_activity()` for dashboard stats

### API Routes Pattern
All API routes follow consistent structure (see `app/api/events/route.ts`):
```typescript
import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  // Query params extraction
  const { data, error } = await supabase.from("table").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
```
- Always use `NextRequest`/`NextResponse` from Next.js
- Handle errors with proper status codes (500 for DB errors, 400 for validation, 404 for not found)
- Use query params for filtering (status, category, limit)

## Development Workflow

### Commands (PowerShell)
```powershell
pnpm install          # Install dependencies
pnpm dev             # Start dev server (http://localhost:3000)
pnpm build           # Production build
pnpm exec tsc --noEmit  # Type checking only
```

### Environment Variables Required
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=  # For chatbot (gemini-2.5-flash)
```

### Database Setup
1. Run SQL scripts in order (001 → 005) via Supabase Dashboard SQL Editor
2. Scripts are idempotent with `IF NOT EXISTS` checks
3. `005-analytics-functions-indexes.sql` adds performance indexes + analytics functions

## Component Patterns

### UI Components (`components/ui/`)
- **Shadcn/ui** components with class-variance-authority (CVA)
- Use `cn()` utility from `lib/utils.ts` for className merging
- Button variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- All components support `className` override

### Client Components
- **ALL page components** use `"use client"` directive (App Router requirement for interactivity)
- Interactive components (Navigation, Chatbot, forms) require `"use client"`
- API routes are server-only by default

### Styling Conventions
- **Tailwind CSS 4.x** with utility classes
- **UX4G Government Design System** colors:
  - Primary: `#0b663b` (green), `text-primary`, `bg-primary`
  - Use `primary-900` for dark green top bar
  - Government-style two-tier navigation (top bar + main nav)
- **Responsive breakpoints:** `sm:`, `md:`, `lg:` (mobile-first)
- Prefer utility classes over custom CSS

## Key Integration Points

### AI Chatbot (`/api/chat`)
- **Model:** Google Gemini 2.5 Flash via `@ai-sdk/google`
- **Function:** `generateText()` from `ai` package (NOT `maxTokens` param — use model defaults)
- **Context:** System prompt includes FAQ context (see `app/api/chat/route.ts`)
- Returns JSON: `{ id, role: "assistant", content: string }`

### Middleware (`middleware.ts`)
- Protects `/admin/*` routes with cookie-based auth (`admin_auth`)
- Redirects: unauthenticated → `/admin/login`, authenticated login page → `/admin`
- Uses Next.js middleware matcher: `["/admin/:path*"]`

### Multilingual Support (`lib/i18n.ts`)
- Static translations object: `i18n.translations.en` / `.hi` (Hindi)
- Use `i18n.t(key, lang)` for translations
- Currently used in Navigation top bar (language toggle)

## Common Pitfalls & Fixes

### TypeScript Errors
- **Analytics state:** Always type analytics objects explicitly (see `app/admin/page.tsx` fix)
```typescript
const [analytics, setAnalytics] = useState<{
  totalUsers: number;
  totalEvents: number;
  // ...
} | null>(null)
```
- **AI SDK:** Don't pass `maxTokens` to `generateText()` — not supported in current SDK version

### Build Configuration
- `next.config.mjs` has `ignoreBuildErrors: true` — use for rapid iteration but fix types before production
- Images are `unoptimized: true` (no Next.js Image Optimization)

### Known Issues
- See `API_TEST_REPORT.md` for full API testing status
- `.env` file required for runtime (not in repo)
- Admin auth is cookie-based, not production-ready (implement proper auth provider)

## File References
- **Architecture docs:** `README.md`, `EVENT_BOOKING_SYSTEM.md`, `API_TEST_REPORT.md`
- **Database schema:** `scripts/001-init-schema.sql`
- **Example patterns:** `app/api/events/route.ts`, `components/navigation.tsx`, `app/(public)/layout.tsx`
