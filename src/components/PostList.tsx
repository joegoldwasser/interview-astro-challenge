/**
 * Task 3: Extend This Component
 *
 * This component renders category tabs and blog post cards, but they're
 * not connected. The tabs don't filter anything and the search doesn't exist yet.
 * Wire them up in order:
 *
 * 3a: Make the category tabs work — click a tab, filter the posts
 * 3b: Add a search input that filters by title and excerpt
 * 3c: Show "No posts found" when filters match nothing
 */
import { useState } from 'react';
import type { BlogPostSummary } from '../data/cms-helpers';

interface PostListProps {
  posts: BlogPostSummary[];
}

export default function PostList({ posts }: PostListProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derive unique categories from the data
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  // TODO (3a): Filter posts based on activeCategory.
  //   When "All" is selected, show all posts.
  //   Otherwise, show only posts matching the active category.
  const filteredPosts = posts;

  return (
    <div>
      {/* TODO (3b): Add a search input here that updates searchQuery */}

      {/* Category tabs */}
      <div style={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category}
            // TODO (3a): Add onClick to set the active category
            // TODO (3a): Apply styles.activeTab when this category is active, styles.tab otherwise
            style={styles.tab}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Post cards */}
      {/* TODO (3c): Show "No posts found" when filteredPosts is empty */}
      <div>
        {filteredPosts.map((post) => (
          <div key={post.slug} style={styles.card}>
            <span style={styles.category}>{post.category}</span>
            <h3 style={styles.cardTitle}>
              <a href={`/blog/${post.slug}`} style={styles.cardLink}>
                {post.title}
              </a>
            </h3>
            <p style={styles.cardExcerpt}>{post.excerpt}</p>
            <div style={styles.cardMeta}>
              {post.author} &middot;{' '}
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 400,
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
  },
  activeTab: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 700,
    backgroundColor: '#2563eb',
    color: '#fff',
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#2563eb',
    letterSpacing: '0.05em',
  },
  cardTitle: {
    margin: '0.5rem 0',
    fontSize: '1.1rem',
  },
  cardLink: {
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  cardExcerpt: {
    color: '#4b5563',
    margin: '0.5rem 0',
    fontSize: '0.95rem',
  },
  cardMeta: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
  empty: {
    color: '#6b7280',
    textAlign: 'center',
    padding: '2rem 0',
  },
};
