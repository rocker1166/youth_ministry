# Institute of Youth Affairs — Website

This repository contains the front-end web application for the Institute of Youth Affairs website. It's a Next.js (App Router) + TypeScript project with a set of UI components and APIs.

## Quick summary
- Framework: Next.js (App Router)
- Language: TypeScript
- Package manager: pnpm
- Styling: Tailwind CSS (utility classes present in code)

## What I changed recently
- **Fixed duplicate headers/footers** on all pages except the homepage. The site uses a root layout (`app/layout.tsx`) that renders the global `Navigation` and `Footer` components once for all pages. I removed the duplicate `Navigation` and `Footer` from:
  - `app/about/page.tsx`
  - `app/programs/page.tsx`
  - `app/news/page.tsx`
  - `app/contact/page.tsx`
  - `app/resources/page.tsx`
- **Connected chatbot to API**: The chatbot component now makes real API calls to `/api/chat` endpoint using Google Gemini AI for intelligent responses.
- **Fixed TypeScript errors**: Resolved type issues in `app/admin/page.tsx` (analytics state) and `app/api/chat/route.ts` (removed unsupported parameters).

Files changed:
- `app/page.tsx` — removed `Navigation` and `Footer` imports and JSX (layout provides them)
- `app/about/page.tsx` — removed duplicate header/footer
- `app/programs/page.tsx` — removed duplicate header/footer
- `app/news/page.tsx` — removed duplicate header/footer  
- `app/contact/page.tsx` — removed duplicate header/footer
- `app/resources/page.tsx` — removed duplicate header/footer
- `components/chatbot.tsx` — connected to `/api/chat` API with real AI responses
- `app/api/chat/route.ts` — switched to Google Gemini model

## Prerequisites
- Node.js (LTS recommended, >=16)
- pnpm installed globally (or use `npm i -g pnpm`)

## Install
Open a PowerShell terminal in the project root and run:

```powershell
cd "c:\Users\Suman Jana\Desktop\code"
pnpm install
```

## Development
Start the Next.js development server:

```powershell
pnpm dev
```

Open http://localhost:3000 in your browser.

## Type checking
To run a TypeScript-only check (no emit):

```powershell
pnpm exec tsc --noEmit
```

Note: a `tsc` run in this workspace currently surfaces a couple of unrelated TypeScript issues (see "Known issues").

## Build / Production
To create a production build and run it (if you have scripts configured):

```powershell
pnpm build
pnpm start
```

If your `package.json` uses different script names, use those instead.

## How to verify the header duplication fix
1. Start the dev server (`pnpm dev`).
2. Visit the site root (`/`) and inspect the header. It should appear only once.
3. The layout (`app/layout.tsx`) is the single source of truth for `Navigation` and `Footer`.

## Known issues / TypeScript errors
When running `tsc --noEmit` I observed unrelated TypeScript issues that you may want to address separately:

- `app/admin/page.tsx` — some `analytics` properties are being inferred as `never` when referenced (e.g. `analytics.totalUsers`, `analytics.totalEvents`, etc.). This likely needs a proper type annotation for `analytics` or a safe access pattern.
- `app/api/chat/route.ts` — a property `maxTokens` is passed to a settings object but the current library typings don't expect it; either remove/rename the option or adjust typings.

I did not change those files while fixing the duplicated header; if you'd like I can fix them next (I can open those files and propose minimal, safe type fixes).

## Project structure (high level)
- `app/` — Next.js app router pages and layout
- `components/` — React components and UI pieces
- `components/ui/` — shared UI building blocks
- `lib/` — helpers, db connectors, utilities
- `scripts/` — DB or migration SQL scripts
- `public/` — static assets

## Next steps / Recommendations
- If you rely on `tsc` for CI checks, we should fix the TypeScript issues listed above.
- Add a short visual regression or end-to-end smoke test for the landing page to ensure header/footer appear once.
- Consider adding a CONTRIBUTING.md and CODE_OF_CONDUCT if others will collaborate.

---

If you want, I can now:
- Fix the two `tsc` errors shown by running `pnpm exec tsc --noEmit` (I can propose and apply fixes), or
- Start the dev server so you can visually confirm the fix.

Tell me which you'd like me to do next.