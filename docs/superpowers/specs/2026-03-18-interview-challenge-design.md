# Frontend Engineer Interview Challenge — Design Spec

## Overview

A 45-minute live coding interview for a Frontend Web Engineer role at Boldin. The candidate works in an Astro + React project, editing only `.tsx` files. Tasks progress from bug fixing to building from scratch, with built-in sub-steps so interviewers can control pacing.

## Context

- **Role:** React engineer building components inside an Astro marketing site. Astro scaffolding and CMS integration already handled by another team member.
- **Candidate profile:** Jess Wayde, 15 years experience, mostly Drupal agencies. React listed as a skill but depth is unknown.
- **Key signals:** Reading unfamiliar code (A), state management instincts (E), edge case handling (F), communication while coding (H), ability to spot when AI-generated code isn't clean.
- **Platform:** StackBlitz (primary), local clone as fallback.

## Interview Flow

| Time | Activity |
|---|---|
| -15 min | Send candidate StackBlitz link |
| 0-5 min | Intro, open project, read CHALLENGE.md together |
| 5-35 min | Coding tasks (interviewer controls pace) |
| 35-45 min | Discussion / candidate questions |

## Project Structure

The candidate sees a `/blog` page with four sections, each rendering a React component. All components are pre-wired into the Astro page with `client:load`. The candidate only edits files in `src/components/`.

### Data Layer (provided, not edited by candidate)

- `src/data/cms.json` — Mock CMS content (blog posts with titles, excerpts, authors, dates, categories, body content blocks)
- `src/data/cms-helpers.ts` — Typed helper functions: `getPublishedPostSummaries()`, `submitNewsletter()`, `fetchFeaturedPosts()`, etc.
- `BlogPostSummary` interface with: `slug`, `title`, `excerpt`, `category`, `author`, `publishedAt`

### Astro Page (provided, not edited by candidate)

- `src/pages/blog/index.astro` — Imports all four components, passes props, uses `client:load` on each

---

## Task 1: Fix the Bugs (~5 min)

**File:** `src/components/PostCard.tsx`

**Starting state:** A blog post card component with full styling. Renders but has three visible bugs. Props interface and types are correct — the bugs are in the rendering logic.

### Bugs (ordered easiest to hardest)

**1a: Broken link**
- Title link href is `/blog/undefined`
- Cause: Component uses `slug` but the prop is named `postSlug`
- Hint in code: Comment near the `<a>` tag says `// Hint: check the prop names above`

**1b: Invalid date**
- Date displays "Invalid Date"
- Cause: `publishedAt` (a string) is passed directly to `.toLocaleDateString()` without `new Date()` wrapper
- Hint in code: Comment says `// Hint: publishedAt is a string, not a Date object`

**1c: Null rendering**
- Shows "By null" for author and empty space for excerpt when fields are missing
- Cause: No conditional rendering for nullable fields
- Hint in code: Comment says `// Hint: not all posts have an author or excerpt`

### Evaluation criteria
- Can they read existing code and trace the bug
- Do they check prop names / types
- How they communicate their debugging process

### Stopping points
- After 1a: minimal signal but shows they can read code
- After 1a + 1b: good warmup complete
- All three: strong start, move on

---

## Task 2: Improve Existing Code (~10 min)

**File:** `src/components/NewsletterSignup.tsx`

**Starting state:** A fully functional email signup form. Input field, submit button, calls `submitNewsletter(email)` (mock async function with 1s delay). It works — but the code quality is poor.

### Sub-tasks (layered)

**2a: Add validation**
- Currently submits empty strings and "asdf" to the API
- Candidate adds basic check: `if (!email || !email.includes('@'))`
- Show an error message below the input
- Comment header says: "Basic validation is fine — no need for a full email regex"
- An `error` state variable is already declared but unused
- Hint: `// TODO (2a): Validate the email before submitting. Set error state if invalid.`

**2b: Wire up loading/success/error feedback**
- Status state is already declared: `const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')`
- But never used — button always says "Subscribe", no loading indicator, no success message
- Candidate wires `setStatus` calls into the handler and renders different UI per status
- Hint: `// TODO (2b): Use the status state to show loading/success/error feedback`
- Below the form, a commented-out section shows the UI structure:
  ```
  // When loading: disable button, show "Subscribing..."
  // When success: show "Thanks for subscribing!"
  // When error: show "Something went wrong. Try again."
  ```

**2c: Spot the unnecessary useEffect**
- Component has:
  ```tsx
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(email.includes('@'));
  }, [email]);
  ```
- This should just be `const isValid = email.includes('@');`
- No hint for this one — it's the "sniff test." Comment just says `// 2c: Anything you'd change about how isValid is computed?`

### Mock API function (in cms-helpers.ts)

```typescript
export function submitNewsletter(email: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
```

### Evaluation criteria
- Do they validate input before API calls (baseline)
- How they structure multiple states — do they think about all the states or just happy path (E)
- Do they notice the useEffect antipattern without being told (AI review instinct)
- Edge case awareness: double-click, error recovery (F)

### Stopping points
- After 2a: basic form handling confirmed
- After 2b: good state management understanding
- 2c spotted: excellent React instincts

---

## Task 3: Extend a Component (~10 min)

**File:** `src/components/PostList.tsx`

**Starting state:** A working component that renders:
- A row of category tab buttons (already derived from data using `new Set()`, including "All")
- All post cards below (title linked, excerpt, author, date)
- `useState` for `activeCategory` is already declared and initialized to `'All'`
- Active tab styling is defined in a `styles` object — `styles.activeTab` and `styles.tab` exist
- But tabs don't respond to clicks and posts aren't filtered

### Sub-tasks (layered)

**3a: Wire the category filter**
- Add `onClick` to tab buttons that calls `setActiveCategory(category)`
- Filter the posts array based on `activeCategory` (show all when "All")
- Apply `styles.activeTab` vs `styles.tab` based on `activeCategory`
- Hints:
  - `// TODO (3a): Add onClick to set the active category`
  - `// TODO (3a): Filter posts based on activeCategory`
  - `// TODO (3a): Apply styles.activeTab when this category is active`

**3b: Add text search**
- Add a search input above the tabs
- Filter posts by title and excerpt, combined with the active category
- Hint: `// TODO (3b): Add a search input and filter posts by title/excerpt`
- `useState` for `searchQuery` is already declared

**3c: Empty state**
- When category + search combination matches nothing, show "No posts found"
- Hint: `// TODO (3c): Show a message when no posts match the current filters`

### Evaluation criteria
- Do they understand how state drives rendering (E)
- Can they work within existing code and follow its patterns (A)
- Multiple interacting filters — do they compose them correctly
- Do they think about the empty case (F)

### Stopping points
- After 3a: they understand React state/rendering fundamentals
- After 3b: can manage multiple interacting states
- 3c: quick addition, shows attention to detail

---

## Task 4: Build from Scratch (Stretch, ~5 min)

**File:** `src/components/RelatedPosts.tsx`

**Starting state:** Empty component with props interface defined and a placeholder `<div>`. Comment explains the requirement.

### Props interface (provided)

```typescript
interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: BlogPostSummary[];
}
```

### Sub-tasks

**4a: Filter and render related posts**
- Show up to 3 posts that share the same category as the current post
- Exclude the current post (by slug)
- Render as simple linked cards
- Hint: `// TODO (4a): Filter allPosts to show posts in the same category, excluding the current post`

**4b: Handle edge cases**
- If the current post is the only one in its category, show "No related posts" or hide the section
- Hint: `// TODO (4b): What should happen if there are no related posts?`

### Evaluation criteria
- Can they build a component from nothing
- Do they handle the filtering correctly (exclude self, match category)
- Edge case handling without prompting

---

## Discussion Questions (if time allows)

Fallback if coding wraps early or as a natural conversation after:

1. "How would you catch broken links if another team changes a URL in our Rails/React app?"
2. "What do you look for when reviewing AI-generated React code?"
3. "How would you approach performance if a page had 50+ interactive React components?"

---

## Repos

| Repo | Visibility | Purpose |
|---|---|---|
| `joegoldwasser/interview-astro-challenge` | Public | Candidate-facing — broken/incomplete components |
| `joegoldwasser/interview-astro-answer-key` | Private | Complete solutions with annotations for interviewer |

## Fallback Plan

If StackBlitz fails:
1. Candidate clones repo locally: `git clone https://github.com/joegoldwasser/interview-astro-challenge.git`
2. `cd interview-astro-challenge && npm install && npm run dev`
3. Opens `http://localhost:4321/blog`
4. Uses their own editor

## Guiding Principles

- **Clear comments:** Every component has a header explaining the task and what "done" looks like
- **Inline hints:** TODO markers at exact locations where code needs to change, with gentle nudges
- **Types provided:** All interfaces and state types pre-declared so candidates aren't guessing
- **No Astro knowledge needed:** All work happens in `.tsx` files
- **Interviewer controls pace:** Each task has natural stopping points — say "great, let's move on" at any time
