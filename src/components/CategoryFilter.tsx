/**
 * Task 1: Category Filter Tabs
 *
 * Build a tab bar that filters blog posts by category.
 * When a category is selected, only posts in that category should appear.
 * Include an "All" option that shows everything.
 *
 * Requirements:
 * - Show a clickable tab for each unique category, plus "All"
 * - Highlight the active tab
 * - Render matching posts as cards (title, excerpt, author, date)
 * - Each card's title should link to /blog/{slug}
 *
 * The data is already passed in as props — no fetching needed.
 */
import type { BlogPostSummary } from '../data/cms-helpers';

interface CategoryFilterProps {
  posts: BlogPostSummary[];
}

export default function CategoryFilter({ posts }: CategoryFilterProps) {
  // TODO: Implement category filter tabs
  return <div>Task 1: Build the category filter here</div>;
}
