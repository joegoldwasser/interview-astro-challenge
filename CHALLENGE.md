# Front-End Web Engineer — Interview Challenge

This is a small Astro project simulating a marketing site powered by a headless CMS.

The CMS data is mocked in `src/data/cms.json` and accessed via helper functions in `src/data/cms-helpers.ts`. The site is partially built — your job is to fix issues and extend it.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:4321/blog` to see the current state.

## Context

- This marketing site links to an external **Rails/React application** at `app.boldin.com`
- Blog posts can link to **other blog posts** via reference IDs (not URLs)
- Blog posts can link to **external pages** via direct URLs
- Some CMS content may be deleted or incomplete
- **New to Astro?** That's fine — Astro works like Next.js. Files in `src/pages/` are routes. `.astro` files have a frontmatter block (`---`) for server-side logic and HTML below it. The key difference from a normal React app: **React components render as static HTML by default**. To make one interactive in the browser, you need Astro's `client:` directives — see the [docs](https://docs.astro.build/en/guides/framework-components/#hydrating-interactive-components).

## Key files

| File | What it does |
|---|---|
| `src/data/cms.json` | Mock CMS content (blog posts, landing pages) |
| `src/data/cms-helpers.ts` | Helper functions to query the CMS data |
| `src/pages/blog/index.astro` | Blog listing page |
| `src/pages/blog/[slug].astro` | Individual blog post page (one per post) |
| `src/components/SearchFilter.tsx` | React search component (incomplete) |

---

## Task 1: Add the Interactive Search

**Files:** `src/components/SearchFilter.tsx` and `src/pages/blog/index.astro`

A React search component exists at `SearchFilter.tsx` but is incomplete and not connected to the page.

1. Add `SearchFilter` to the blog index page so it renders **and is interactive** in the browser
2. Pass it the blog post data — `postSummaries` is already computed in the page frontmatter
3. Complete the component: filter posts by title and excerpt as the user types
4. Display the filtered results below the search input

## Task 2: Fix the Blog Data

**Files:** `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro`

Look at the blog index — there's a broken card at the bottom (no title, "December 31, 1969"). Click into any post and check the links in the body.

1. **Filter out deleted/invalid posts** from the blog index card list
2. **Fix internal reference links** — they currently render the raw reference ID as the href (e.g. `<a href="post-003">`). Resolve them to real URLs like `/blog/roth-conversion-guide` using the helpers in `cms-helpers.ts`
3. **Handle missing references** — if a referenced post was deleted, the link shouldn't crash or point to a dead URL

## Task 3: Add Structured Data (if time allows)

**File:** `src/pages/blog/[slug].astro`

Add a JSON-LD `BlogPosting` script tag to the page for SEO, using the post's title, author, date, and description.

## Discussion (if time allows)

- How would you catch broken links if an engineering team changes a URL in the Rails/React app?
- What would change if this data came from a real CMS API instead of a JSON file?
- How would you handle a slug change without breaking Google rankings?
