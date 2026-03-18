# Frontend Engineer — Interview Challenge

## How This Works

The page has four sections, each with a React component that needs work. **You only need to edit files in `src/components/`** — everything else is already wired up.

Each component file has a comment at the top explaining what to do, and TODO comments at the specific spots where code needs to change.

**New to Astro?** That's fine. Astro is the page framework — think of it like Next.js. You're only editing React `.tsx` files, so you don't need to know Astro.

## Key Files

| File | What it does |
|---|---|
| `src/components/PostCard.tsx` | Task 1 — blog post card with bugs to fix |
| `src/components/NewsletterSignup.tsx` | Task 2 — working form with quality issues to improve |
| `src/components/PostList.tsx` | Task 3 — post list with tabs to wire up |
| `src/components/RelatedPosts.tsx` | Task 4 — empty component to build (stretch) |
| `src/data/cms-helpers.ts` | Data helpers and types (read-only reference) |

---

## Task 1: Fix the Bugs (~5 min)

**File:** `src/components/PostCard.tsx`

This card component has 3 visible bugs. Look at the cards on the page, then find and fix each bug in the code.

- **1a:** The title link points to the wrong URL
- **1b:** The date isn't formatted nicely
- **1c:** The "NEW" badge shows on every card, even when it shouldn't

## Task 2: Improve This Component (~10 min)

**File:** `src/components/NewsletterSignup.tsx`

This form works but has quality issues. Fix them in order:

- **2a:** Add email validation — it currently submits empty/invalid emails
- **2b:** Wire up loading/success/error feedback — the status state exists but isn't used
- **2c:** Look at how `isValid` is computed — anything you'd change?

## Task 3: Extend This Component (~10 min)

**File:** `src/components/PostList.tsx`

The tabs and cards render, but nothing is wired together. Connect them:

- **3a:** Make the category tabs filter posts when clicked
- **3b:** Wire up the search input to filter by title and excerpt
- **3c:** Show "No posts found" when nothing matches

## Task 4: Build from Scratch (~5 min, stretch)

**File:** `src/components/RelatedPosts.tsx`

Build a related posts widget. The props and types are defined — implement the logic:

- **4a:** Show up to 3 posts in the same category, excluding the current post
- **4b:** Handle the case where there are no related posts

---

## Local Setup (if not using StackBlitz)

```bash
git clone https://github.com/joegoldwasser/interview-astro-challenge.git
cd interview-astro-challenge
npm install
npm run dev
```

Open `http://localhost:4321/blog`
