/**
 * Task 2: Improve This Component
 *
 * This newsletter signup form works — you can type an email and click Subscribe.
 * But the code has quality issues. Fix them in order:
 *
 * 2a: Add email validation before submitting (basic is fine — no regex needed)
 * 2b: Wire up the loading/success/error states so the user gets feedback
 * 2c: Look at how isValid is computed — anything you'd change?
 */
import { useState, useEffect } from 'react';
import { submitNewsletter } from '../data/cms-helpers';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 2c: Anything you'd change about how isValid is computed?
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(email.includes('@'));
  }, [email]);

  const handleSubmit = async () => {
    // TODO (2a): Validate the email before submitting. Set error state if invalid.
    //   Basic validation is fine — no need for a full email regex.
    //   The error state variable above is ready to use.

    // TODO (2b): Use the status state to show loading/success/error feedback.
    //   Status is already declared above with types: 'idle' | 'loading' | 'success' | 'error'
    //   Update it at the right points in this function.
    await submitNewsletter(email);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Stay up to date</h3>
      <p style={styles.description}>Get retirement planning tips delivered to your inbox.</p>

      <div style={styles.form}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Subscribe
        </button>
      </div>

      {/* Error message (for 2a) */}
      {error && <p style={styles.error}>{error}</p>}

      {/*
        TODO (2b): Show feedback based on the status state.
        When loading: disable the button, show "Subscribing..."
        When success: show "Thanks for subscribing!"
        When error: show "Something went wrong. Try again."
      */}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
  },
  heading: {
    margin: '0 0 0.25rem',
    fontSize: '1.1rem',
  },
  description: {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: '0 0 1rem',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.65rem 1rem',
    fontSize: '0.95rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
  },
  button: {
    padding: '0.65rem 1.25rem',
    fontSize: '0.95rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.85rem',
    marginTop: '0.5rem',
  },
  success: {
    color: '#16a34a',
    fontSize: '0.85rem',
    marginTop: '0.5rem',
  },
};
