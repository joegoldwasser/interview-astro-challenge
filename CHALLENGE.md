# Front-End Web Engineer — Interview Challenge

This is a small Astro project simulating a marketing site powered by a headless CMS. The CMS data is mocked in `src/data/cms.json` and accessed through helper functions in `src/data/cms-helpers.ts`.

The site is partially built. Your job is to identify and fix issues, then extend it.

## Setup

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Context

- This site links to an external **Rails/React application** at `app.boldin.com`
- Blog posts can link to other blog posts via **reference IDs** (not URLs)
- Blog posts can also link to external pages via **direct URLs**
- Some CMS content may be deleted or incomplete

---

## Task 1: Fix the Blog

Navigate to `/blog`. You'll notice a broken card at the bottom of the list.

**Files:** `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro`

1. **Filter out invalid posts.** The blog index renders all posts from the CMS, including deleted ones. Filter them so only publishable content is displayed. Consider: what makes a post "valid" enough to display?

2. **Fix internal reference links.** Click into any blog post and look at the links in the body. When one post links to another via a `reference` ID, the current code renders the raw ID as the href (e.g., `<a href="post-003">`). Resolve these to actual blog post URLs using the helpers in `src/data/cms-helpers.ts`.

3. **Handle missing references gracefully.** What should happen if a referenced post has been deleted? The link shouldn't crash the page or point to a dead URL.

## Task 2: Add the Interactive Search Island

**Files:** `src/components/SearchFilter.tsx` and `src/pages/blog/index.astro`

A React search/filter component exists but is incomplete and not wired up:

1. Complete the `SearchFilter` React component so it filters posts by title and excerpt as the user types
2. Add it to the blog index page as an **interactive island** (hint: Astro's `client:` directives)
3. Show filtered results within the component, or hide/show the existing post list — your choice on approach

## Task 3: Add Structured Data (if time allows)

**File:** `src/pages/blog/[slug].astro`

Add a JSON-LD `BlogPosting` script tag to the blog post page for SEO. Use the post's data (title, author, date, description) to populate it.

## Bonus: Discussion

If time allows, we'll discuss:

- How would you validate that external links to `app.boldin.com` are still valid?
- What would change if this data came from a real CMS API instead of a JSON file?
- How would you handle a blog post slug change without breaking existing Google rankings?
