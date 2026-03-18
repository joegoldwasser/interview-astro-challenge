/**
 * Task 2: Search with Highlighted Matches
 *
 * Build a search component that filters posts and highlights the matching
 * text in the results.
 *
 * Requirements:
 * - Text input that filters posts by title and excerpt as the user types
 * - Only show results when the user has typed 2+ characters
 * - In the results, highlight (bold) the matching substring within the title and excerpt
 * - Show "No results found" when nothing matches
 * - Each result's title should link to /blog/{slug}
 *
 * The data is already passed in as props — no fetching needed.
 */
import type { BlogPostSummary } from '../data/cms-helpers';

interface SearchFilterProps {
  posts: BlogPostSummary[];
}

export default function SearchFilter({ posts }: SearchFilterProps) {
  // TODO: Implement search with highlighted matches
  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
        }}
      />
      {/* TODO: Filtered results with highlighted matches */}
    </div>
  );
}
