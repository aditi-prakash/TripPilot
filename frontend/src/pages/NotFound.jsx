import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto shadow-lg">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">404 - Off the Map</h1>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        The destination you are looking for doesn't exist or has moved to a new route. Let's guide you back on track.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        <Home className="w-4 h-4" /> Return to Home
      </Link>
    </div>
  );
}