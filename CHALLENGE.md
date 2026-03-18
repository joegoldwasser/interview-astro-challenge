# Front-End Web Engineer — Interview Challenge

This is a small Astro project simulating a marketing site powered by a headless CMS. The CMS data is mocked in `src/data/cms.json` and accessed through helper functions in `src/data/cms-helpers.ts`.

The site is partially built. Your job is to identify and fix issues, then extend it.

## Setup

```bash
git clone https://github.com/joegoldwasser/interview-astro-challenge.git
cd interview-astro-challenge
npm install
npm run dev
```

The site runs at `http://localhost:4321`. Navigate to `/blog` to see the current state.

## Context

- This site links to an external **Rails/React application** at `app.boldin.com`
- Blog posts can link to other blog posts via **reference IDs** (not URLs)
- Blog posts can also link to external pages via **direct URLs**
- Some CMS content may be deleted or incomplete
- **New to Astro?** That's okay. Astro is similar to Next.js or other component frameworks. Files in `src/pages/` are routes, `.astro` files are templates with a frontmatter block (`---`) for server-side logic. The key difference: React components render as static HTML by default. To make a component interactive in the browser, look up Astro's `client:` directives in the [docs](https://docs.astro.build/en/guides/framework-components/#hydrating-interactive-components).

---

## Task 1: Add the Interactive Search Island

**Files:** `src/components/SearchFilter.tsx` and `src/pages/blog/index.astro`

Navigate to `/blog`. There's a React search/filter component (`SearchFilter.tsx`) that exists but is incomplete and not wired up to the page.

1. Add the `SearchFilter` component to the blog index page so it renders and is interactive in the browser
2. Pass it the blog post data it needs (hint: `postSummaries` is already computed in the page's frontmatter)
3. Complete the component so it filters posts by title and excerpt as the user types
4. Display filtered results — your choice on approach

Once you have data flowing through the component, you may notice some issues with the CMS data. That leads to Task 2.

## Task 2: Fix the Blog Data

**Files:** `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro`

You've probably noticed a broken card on the blog index — a post with no title, no author, and a date of December 31, 1969. The CMS data includes deleted and incomplete content that shouldn't be rendered.

1. **Filter out invalid posts.** Only publishable content should display on the blog index and flow into the search component. Consider: what makes a post "valid" enough to display?

2. **Fix internal reference links.** Click into any blog post and look at the links in the body. When one post links to another via a `reference` ID, the current code renders the raw ID as the href (e.g., `<a href="post-003">`). Resolve these to actual blog post URLs using the helpers in `src/data/cms-helpers.ts`.

3. **Handle missing references gracefully.** What should happen if a referenced post has been deleted? The link shouldn't crash the page or point to a dead URL.

## Task 3: Add Structured Data (if time allows)

**File:** `src/pages/blog/[slug].astro`

Add a JSON-LD `BlogPosting` script tag to the blog post page for SEO. Use the post's data (title, author, date, description) to populate it.

## Bonus: Discussion

If time allows, we'll discuss:

- How would you validate that external links to `app.boldin.com` are still valid?
- What would change if this data came from a real CMS API instead of a JSON file?
- How would you handle a blog post slug change without breaking existing Google rankings?
