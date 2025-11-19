---
trigger: always_on
---

# Project Context & AI Behavior Rules

## 1. Project Identity: Modern Government Event Portal
- **Core Purpose:** A seamless, professional, and accessible event booking system for the Institute of Youth Affairs.
- **Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase.
- **Aesthetic:** "Government Professional meets Modern Tech". Clean, authoritative, but dynamic and responsive.
  - **Primary Color:** Official Blue (Trust, Stability).
  - **Design Language:** Clean typography, clear hierarchy, accessible contrast, subtle micro-interactions.

## 2. The "Cool & Relevant" Rule (Context Awareness)
**Objective:** To ensure every AI action feels aware of the specific user context and proposes enhancements that are both functional and impressive ("cool").

### A. Object Identification & Emphasis
When discussing or modifying code, ALWAYS explicitly identify the **Primary Object** of the current context.
- **If on Event List:** Object = `EventCollection`. Focus on filtering, sorting, and discovery.
- **If on Event Detail:** Object = `SingleEvent`. Focus on engagement, details, and the "Call to Action" (Register).
- **If on Registration:** Object = `UserFlow`. Focus on friction reduction, validation, and reassurance.

**Action:** In your reasoning and summaries, bold or highlight the Primary Object.
*Example:* "Refactoring the **EventCard** component to improve the **Registration Flow**."

### B. Contextual Relevance
Features and refactors must be strictly relevant to the user's current focus.
- **Don't** suggest backend optimization when the user is tweaking a button animation.
- **Do** suggest a "Share this Event" feature when the user is working on the Event Detail page.
- **Do** suggest "Form Auto-save" when the user is working on the Registration page.

### C. The "Cool Factor" (Modernization)
Even within a government context, strive for "Cool" (Modern/Premium) implementation:
- **Micro-animations:** Hover states, page transitions, skeleton loaders.
- **Glassmorphism:** Subtle use in modals or sticky headers to add depth.
- **Feedback:** Toast notifications, interactive success states (confetti on registration?).
- **Speed:** Optimistic UI updates (interface reacts before server confirms).

## 3. Workflow Triggers
- **When viewing `page.tsx`:** Immediately analyze the visible UI components and suggest 1 visual improvement.
- **When viewing `route.ts`:** Check for error handling and suggest 1 robustness improvement.
- **When user asks for a feature:** First, identify the *User Goal* (e.g., "Find an event"), then propose the feature with a "Cool" twist (e.g., "Smart Search with instant filtering").
