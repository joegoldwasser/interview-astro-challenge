/**
 * An interactive search/filter component for blog posts.
 * This is a React "island" — it ships JavaScript to the browser.
 *
 * CANDIDATE TASK: This component is incomplete. See CHALLENGE.md Task 1.
 * - Add filtering logic to filter posts by title and excerpt
 * - Display the filtered results below the search input
 */
import { useState } from 'react';
import type { BlogPostSummary } from '../data/cms-helpers';

interface SearchFilterProps {
  posts: BlogPostSummary[];
}

export default function SearchFilter({ posts }: SearchFilterProps) {
  const [query, setQuery] = useState('');

  const filtered = posts.filter((post) => {
    const search = query.toLowerCase();
    return post.title.toLowerCase().includes(search) ||
           post.excerpt.toLowerCase().includes(search);
  });

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
      {query && (
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          {filtered.map((post) => (
            <li key={post.slug} style={{ marginBottom: '0.75rem' }}>
              <a href={`/blog/${post.slug}`} style={{ color: '#2563eb', fontWeight: 600 }}>
                {post.title}
              </a>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>
                {post.excerpt}
              </p>
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ color: '#6b7280' }}>No posts found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
