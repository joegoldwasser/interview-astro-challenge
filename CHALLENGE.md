# Front-End Web Engineer — Interview Challenge

This is an Astro project with React components for a marketing site. The project scaffolding and page wiring is already done — **you only need to edit the React component files** (`.tsx`).

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:4321/blog` to see the challenge page.

## How This Works

The blog page has three sections, each rendering a React component. All three components are already wired into the page — you just need to implement them. Each `.tsx` file has a description of what to build.

**You only need to edit files in `src/components/`.**

Data helpers are available in `src/data/cms-helpers.ts` — browse the types and functions there. Blog post data is in `src/data/cms.json`.

---

## Task 1: Category Filter Tabs (Easy)

**File:** `src/components/CategoryFilter.tsx`

Build a tabbed filter that lets users browse posts by category. Props are already passed in.

- Show a tab for each unique category, plus "All"
- Highlight the active tab
- Display matching posts as cards with title (linked), excerpt, author, and date

## Task 2: Search with Highlighted Matches (Medium)

**File:** `src/components/SearchFilter.tsx`

Build a search that filters posts and highlights matching text in results.

- Filter by title and excerpt as the user types
- Only show results after 2+ characters typed
- Bold/highlight the matching substring in results
- Handle "no results" state

## Task 3: Async Data Fetching (Harder)

**File:** `src/components/FeaturedPosts.tsx`

Build a component that fetches data asynchronously and handles loading/error states.

- Call `fetchFeaturedPosts()` from `cms-helpers.ts` on mount
- Show a loading indicator while fetching (has a 1.5s built-in delay)
- Display results once loaded
- Add a "Refresh" button that re-fetches
- Handle errors gracefully
