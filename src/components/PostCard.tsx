/**
 * Task 1: Fix the Bugs
 *
 * This component displays a blog post card. It has 3 bugs — you can see
 * them in the browser. Find and fix each one.
 */

interface PostCardProps {
  postSlug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  isNew: boolean;
}

export default function PostCard({ postSlug, title, excerpt, author, publishedAt, isNew }: PostCardProps) {
  return (
    <div style={styles.card}>
      {/* Bug 1c */}
      <span style={styles.badge}>NEW</span>

      <h3 style={styles.title}>
        {/* Bug 1a */}
        <a href={`/blog/${title}`} style={styles.link}>
          {title}
        </a>
      </h3>

      <p style={styles.excerpt}>{excerpt}</p>

      <div style={styles.meta}>
        <span>By {author}</span>
        <span>&middot;</span>
        {/* Bug 1b */}
        <span>{publishedAt}</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  title: {
    margin: '0 0 0.5rem',
    fontSize: '1.1rem',
    paddingRight: '3rem',
  },
  link: {
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  excerpt: {
    color: '#4b5563',
    margin: '0.5rem 0',
    fontSize: '0.95rem',
  },
  meta: {
    fontSize: '0.85rem',
    color: '#6b7280',
    display: 'flex',
    gap: '0.5rem',
  },
};
