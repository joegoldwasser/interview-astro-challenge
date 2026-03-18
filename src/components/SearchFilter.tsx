/**
 * Interactive search/filter for blog posts.
 * This is a React "island" — it ships JavaScript to the browser.
 *
 * Task 1: This component is incomplete.
 * - Add filtering logic to filter posts by title and excerpt as the user types
 * - Display the filtered results below the search input
 */
import { useState } from 'react';
import type { BlogPostSummary } from '../data/cms-helpers';

interface SearchFilterProps {
  posts: BlogPostSummary[];
}

export default function SearchFilter({ posts }: SearchFilterProps) {
  const [query, setQuery] = useState('');

  // TODO: Add filtering logic here

  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
        }}
      />
      {/* TODO: Display filtered results here */}
    </div>
  );
}
