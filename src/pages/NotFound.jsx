import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', color: 'var(--accent-red)', marginBottom: '1rem' }}>404</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The page you are seeking does not exist in our boutique collection.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
