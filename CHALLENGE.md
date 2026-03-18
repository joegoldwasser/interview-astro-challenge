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

## Task 1: Fix the Blog Index

**File:** `src/pages/blog/index.astro`

The blog index currently renders ALL posts from the CMS, including deleted ones. This causes rendering errors.

- Filter out deleted or invalid posts so only publishable content is displayed
- Consider: what makes a post "valid" enough to display?

## Task 2: Fix Internal Links & Handle Edge Cases

**File:** `src/pages/blog/[slug].astro`

There are several problems with the blog post detail page:

1. **Internal reference links are broken.** When a blog post links to another post via `reference` ID, it currently renders the raw ID as the href (e.g., `<a href="post-003">`). Resolve these to actual blog post URLs.

2. **Deleted posts generate pages.** The `getStaticPaths` function generates a page for every post, including deleted ones. Fix this.

3. **No structured data.** Add a JSON-LD `BlogPosting` script tag to the page head for SEO. Use the post's data to populate it.

## Task 3: Add the Interactive Search Island

**Files:** `src/components/SearchFilter.tsx` and `src/pages/blog/index.astro`

A React search/filter component exists but is incomplete and not wired up:

1. Complete the `SearchFilter` React component so it filters posts by title and excerpt as the user types
2. Add it to the blog index page as an **interactive island** (hint: Astro's `client:` directives)
3. Show filtered results within the component, or hide/show the existing post list — your choice on approach

## Bonus: Discussion

If time allows, we'll discuss:

- How would you validate that external links to `app.boldin.com` are still valid?
- What would change if this data came from a real CMS API instead of a JSON file?
- How would you handle a blog post slug change without breaking existing Google rankings?
