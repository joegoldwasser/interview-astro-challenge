# Interview Challenge Implementation Plan

> **For agentic workers:** Implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 4 React components (broken, improvable, extendable, empty) plus data helpers, CHALLENGE.md, an Astro page wiring them up, and a private answer key repo — all for a 45-min live coding interview.

**Architecture:** Astro + React project. Candidate only edits `.tsx` files. All components are pre-wired into a single Astro page with `client:load`. Data comes from mock CMS helpers.

**Tech Stack:** Astro 6, React 18, TypeScript

---

## File Map

### Files to create (candidate repo)
- `src/components/PostCard.tsx` — Task 1: buggy card component
- `src/components/NewsletterSignup.tsx` — Task 2: working but poor quality form
- `src/components/PostList.tsx` — Task 3: partially wired post list with tabs
- `src/components/RelatedPosts.tsx` — Task 4: empty shell with props interface
- `CHALLENGE.md` — Candidate-facing instructions

### Files to modify (candidate repo)
- `src/data/cms.json` — Add more blog posts (need overlapping categories for Tasks 3 & 4)
- `src/data/cms-helpers.ts` — Add `submitNewsletter()` mock function
- `src/pages/blog/index.astro` — Rewire to use 4 new components

### Files to delete (candidate repo)
- `src/components/CategoryFilter.tsx` — Old task, replaced
- `src/components/FeaturedPosts.tsx` — Old task, replaced
- `src/components/SearchFilter.tsx` — Old task, replaced
- `src/components/BlogPostCard.astro` — No longer needed

### Files to create (answer key repo)
- `src/components/PostCard.tsx` — Fixed version with annotations
- `src/components/NewsletterSignup.tsx` — Improved version with annotations
- `src/components/PostList.tsx` — Completed version with annotations
- `src/components/RelatedPosts.tsx` — Built version with annotations

---

### Task 1: Update data layer

**Files:**
- Modify: `src/data/cms.json`
- Modify: `src/data/cms-helpers.ts`

- [ ] **Step 1: Add more blog posts to cms.json**

The current data has only 3 posts, each in a unique category. Tasks 3 and 4 need multiple posts per category to be meaningful. Add 5 more posts so the distribution is:
- Social Security: 3 posts
- Tax Planning: 2 posts
- Budgeting: 2 posts
- Estate Planning: 1 post

This gives Task 3 (category filtering) interesting results per tab, and Task 4 (RelatedPosts: "show posts in the same category") will actually return results.

New posts only need `id`, `slug`, `title`, `author`, `publishedAt`, `category`, `excerpt`, and `seo`. Body content is optional (can be null or minimal) since only the summary fields are used by the challenge components.

- [ ] **Step 2: Add `submitNewsletter()` mock function to cms-helpers.ts**

Add to the end of `cms-helpers.ts`:

```typescript
/**
 * Simulates a newsletter signup API call.
 * Returns after a 1 second delay.
 */
export function submitNewsletter(email: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
```

- [ ] **Step 3: Verify build**

Run: `cd ~/code/personal/interview-astro-challenge && npm run build`
Expected: Builds successfully

---

### Task 2: Create PostCard.tsx (Task 1 — buggy component)

**Files:**
- Create: `src/components/PostCard.tsx`

The component must:
- Have its own `PostCardProps` interface (not BlogPostSummary) with `postSlug`, `title`, `excerpt`, `author`, `publishedAt`, `isNew`
- Bug 1a: Use `slug` (wrong) instead of `postSlug` (correct) in the link href. Since `slug` is not a declared prop, TypeScript would error. To avoid compile-time errors, destructure props with `...rest` or access via `(props as any).slug` — OR simpler: just use a template literal with a typo like `` `/blog/${title}` `` instead of `` `/blog/${postSlug}` `` so it renders `/blog/How to Maximize...` which is obviously wrong but compiles.
- Bug 1b: Format the date incorrectly. Since `publishedAt` is a `string`, calling `.toLocaleDateString()` won't compile. Instead, use `new Date(publishedAt + 'Z')` which produces the wrong date (off by a day due to timezone), or simpler: format using a bad format string or just display the raw ISO string `publishedAt` without formatting. **Simplest approach:** render `new Date(publishedAt).toLocaleDateString()` and the bug is that it shows the date one day off (timezone issue with date-only strings). Or just use `publishedAt.split('-').join('/')` which outputs "2026/01/15" instead of a nice format.
- Bug 1c: Render `<span>NEW</span>` unconditionally instead of checking `isNew`
- Have full styling that looks polished aside from the bugs
- Have hint comments near each bug
- Have a clear header comment explaining the task

**Important:** All bugs must compile without TypeScript errors. They should be runtime/visual bugs the candidate can see in the browser.

- [ ] **Step 1: Write PostCard.tsx with intentional bugs**

Write the component with all three bugs, hint comments, and styling. Verify all bugs are visual/runtime only — no compile errors.

- [ ] **Step 2: Verify it compiles and renders**

Run build to confirm no TypeScript errors. Check browser to confirm all three bugs are visible.

---

### Task 3: Create NewsletterSignup.tsx (Task 2 — improvable component)

**Files:**
- Create: `src/components/NewsletterSignup.tsx`

The component must:
- Be a fully functional form (input + button + submit handler calling `submitNewsletter`)
- Have `email` state and `setEmail` wired to input
- Have `error` state declared but NOT used (candidate adds validation in 2a)
- Have `status` state declared as `'idle' | 'loading' | 'success' | 'error'` but NOT used (candidate wires in 2b)
- Have the unnecessary `useEffect` antipattern for `isValid` (candidate spots in 2c)
- Have clear TODO comments for 2a and 2b with hints
- Have subtle comment for 2c: `// 2c: Anything you'd change about how isValid is computed?`
- Have commented-out UI guide showing expected loading/success/error rendering
- Import `submitNewsletter` from cms-helpers
- Have full styling

- [ ] **Step 1: Write NewsletterSignup.tsx**

Write the complete component with all the deliberate issues and hints.

- [ ] **Step 2: Verify it renders and the form submits**

---

### Task 4: Create PostList.tsx (Task 3 — extendable component)

**Files:**
- Create: `src/components/PostList.tsx`

The component must:
- Accept `posts: BlogPostSummary[]` as props
- Derive unique categories from posts using `new Set()`, prepend "All"
- Render tab buttons for each category (already built, visible)
- Render post cards below (already built, visible)
- Have `activeCategory` state declared and initialized to `'All'` but NOT wired to onClick or filtering
- Have `searchQuery` state declared but NOT used
- Have a `styles` object with `tab` and `activeTab` styles defined
- Tabs currently all use `styles.tab` (none highlighted)
- All posts always show (no filtering)
- Have TODO comments at exact edit locations for 3a, 3b, 3c
- Have full styling for cards, tabs, and layout

- [ ] **Step 1: Write PostList.tsx**

Write the complete component with tabs and cards rendering but not wired up.

- [ ] **Step 2: Verify tabs and cards render correctly**

---

### Task 5: Create RelatedPosts.tsx (Task 4 — build from scratch)

**Files:**
- Create: `src/components/RelatedPosts.tsx`

The component must:
- Have `RelatedPostsProps` interface with `currentSlug`, `currentCategory`, `allPosts`
- Have a placeholder `<div>` with task description
- Have TODO comments for 4a and 4b
- Import `BlogPostSummary` type

- [ ] **Step 1: Write RelatedPosts.tsx shell**

Write the minimal component with props interface and placeholder.

---

### Task 6: Wire up Astro page

**Files:**
- Modify: `src/pages/blog/index.astro`

- [ ] **Step 1: Rewrite blog index page**

Import all 4 new components. Render them in sections with `client:load`. Pass appropriate props:
- PostCard: Map BlogPostSummary fields to PostCardProps. Specifically: `postSlug={post.slug}` (NOT `slug`), `title`, `excerpt`, `author`, `publishedAt`, `isNew={true}` for first card, `isNew={false}` for second. This mapping is critical — Bug 1a depends on `postSlug` being the correct prop name.
- NewsletterSignup: No props needed
- PostList: Pass `posts={postSummaries}`
- RelatedPosts: Pass `currentSlug={firstPost.slug}`, `currentCategory={firstPost.category}`, `allPosts={postSummaries}`

- [ ] **Step 2: Delete old component files**

Remove: `CategoryFilter.tsx`, `FeaturedPosts.tsx`, `SearchFilter.tsx`, `BlogPostCard.astro`

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Builds with no errors, renders all 4 sections on `/blog`

---

### Task 7: Write CHALLENGE.md

**Files:**
- Create: `CHALLENGE.md` (root)

- [ ] **Step 1: Write candidate-facing instructions**

Include:
- Setup instructions (npm install, npm run dev)
- Context section (Astro hint for non-Astro candidates, "you only edit .tsx files")
- Key files table
- Task 1-4 descriptions matching the spec
- Each task lists the file, what to do, and sub-steps

---

### Task 8: Build answer key components

**Files (in answer key repo):**
- Create/update: All 4 component files + cms-helpers.ts + blog/index.astro + CHALLENGE.md

- [ ] **Step 1: Copy scaffolding files from challenge repo**

Copy `cms-helpers.ts`, `cms.json`, `blog/index.astro`, `CHALLENGE.md`, `BaseLayout.astro`, `package.json` to answer key repo.

- [ ] **Step 2: Write PostCard.tsx answer**

Fixed version with `// FIX` annotations on each bug fix.

- [ ] **Step 3: Write NewsletterSignup.tsx answer**

Improved version with validation, status wiring, useEffect removed. `// FIX` annotations.

- [ ] **Step 4: Write PostList.tsx answer**

Completed version with filtering, search, empty state wired. `// FIX` annotations.

- [ ] **Step 5: Write RelatedPosts.tsx answer**

Built version with filtering, edge case handling. `// FIX` annotations.

- [ ] **Step 6: Build and verify answer key**

Run: `npm run build` in answer key repo.

---

### Task 9: Final cleanup — squash, rename, push

- [ ] **Step 1: Squash challenge repo to single commit**

Use soft reset (not interactive rebase): `git reset --soft $(git rev-list --max-parents=0 HEAD) && git commit -m "chore: interview frontend challenge"`

- [ ] **Step 2: Squash answer key repo to single commit**

Use soft reset: `git reset --soft $(git rev-list --max-parents=0 HEAD) && git commit -m "chore: interview frontend challenge — answer key"`

- [ ] **Step 3: Rename repos**

```
gh repo rename interview-frontend-challenge --repo joegoldwasser/interview-astro-challenge
gh repo rename interview-frontend-answer-key --repo joegoldwasser/interview-astro-answer-key
```

- [ ] **Step 4: Force push both repos**

- [ ] **Step 5: Verify StackBlitz loads**

Open `https://stackblitz.com/github/joegoldwasser/interview-frontend-challenge` and verify it works.
