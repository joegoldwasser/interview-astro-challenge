/**
 * Task 4: Build This Component (stretch goal)
 *
 * Build a "Related Posts" widget that shows other posts in the same category
 * as the current post.
 *
 * 4a: Filter allPosts to show up to 3 posts in the same category,
 *     excluding the current post. Render them as linked cards.
 *
 * 4b: What should happen if there are no related posts?
 */
import type { BlogPostSummary } from '../data/cms-helpers';

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: BlogPostSummary[];
}

export default function RelatedPosts({ currentSlug, currentCategory, allPosts }: RelatedPostsProps) {
  // TODO (4a): Filter allPosts to find posts in the same category, excluding the current post.
  //   Show at most 3 results.

  // TODO (4b): What should happen if there are no related posts?

  return (
    <div>
      <p style={{ color: '#6b7280' }}>Build the related posts component here.</p>
    </div>
  );
}
