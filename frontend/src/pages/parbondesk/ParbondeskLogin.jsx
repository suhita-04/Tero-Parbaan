import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ParbondeskLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAdminToken } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.ok && data.token) {
        setAdminToken(data.token);
        navigate('/parbondesk', { replace: true });
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Connection error. Please check your network and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12">
      {/* Back link — no mention of admin or parbondesk in public areas */}
      <div className="w-full max-w-sm mb-6 flex items-center justify-between text-xs font-sans text-brand-stone">
        <Link to="/" className="hover:text-brand-crimson transition-colors flex items-center gap-1.5">
          <span>&larr;</span>
          <span>Return to Storefront</span>
        </Link>
        <span className="text-[10px] tracking-widest uppercase bg-white border border-brand-border px-2 py-0.5">
          Restricted Access
        </span>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-sm bg-white border border-brand-border p-8 shadow-sm">
        {/* Top crimson hairline */}
        <div className="h-0.5 bg-brand-crimson -mx-8 -mt-8 mb-8" />

        <div className="text-center pb-6 mb-6 border-b border-brand-border">
          <img
            src="/Tero-Parbaan_logo.png"
            alt="Tero Parbaan"
            className="h-14 w-14 rounded-full object-cover mx-auto mb-3 border border-brand-border shadow-sm"
          />
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-stone font-sans block mb-1">
            Boutique Atelier
          </span>
          <h1 className="font-serif text-2xl text-brand-black font-medium tracking-wide">
            Tero Parbaan
          </h1>
          <p className="text-xs uppercase tracking-widest text-brand-crimson font-sans mt-1">
            Operations Console
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-brand-red-light border border-brand-red/25 text-brand-red-hover text-xs font-sans rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-brand-black font-sans font-medium mb-1.5">
              Access Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-brand-border text-sm text-brand-black focus:outline-none focus:border-brand-crimson transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand-crimson hover:bg-brand-crimson-hover disabled:opacity-70 text-white border border-brand-crimson text-xs uppercase tracking-widest font-sans font-medium transition-all duration-200"
          >
            {isLoading ? 'Verifying...' : 'Enter Console'}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-brand-stone font-sans">
          Default: <code className="bg-[#FAF8F5] px-1.5 py-0.5 border border-brand-border">parbon2026</code>
          &nbsp;(set <code>ADMIN_PASSWORD</code> in Vercel env)
        </p>
      </div>

      <p className="mt-8 text-center text-[11px] text-brand-stone font-sans">
        Encrypted session &bull; Tero Parbaan &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
