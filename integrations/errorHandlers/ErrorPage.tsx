import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#00ff00',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <a
        href="/"
        style={{
          padding: '0.75rem 2rem',
          border: '2px solid #00ff00',
          color: '#00ff00',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'all 0.2s',
        }}
      >
        ← Return Home
      </a>
    </div>
  );
}
