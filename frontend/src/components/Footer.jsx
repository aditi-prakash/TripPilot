import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Send, Heart, Shield, Globe, Compass, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border-color)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-color)]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md">
                <Plane className="w-6 h-6 transform -rotate-45" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-[var(--text-primary)]">
                TripPilot
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Your calm, intelligent travel OS. Plan itineraries, track budgets in real-time, monitor destination weather, and discover nature’s finest wonders.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-[var(--primary)]">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" /> Global FX & Weather Sync
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Offline Ready
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/dashboard" className="hover:text-[var(--primary)] transition-colors">Dashboard</Link></li>
              <li><Link to="/budget" className="hover:text-[var(--primary)] transition-colors">Budget OS</Link></li>
              <li><Link to="/weather" className="hover:text-[var(--primary)] transition-colors">Weather Widget</Link></li>
              <li><Link to="/currency" className="hover:text-[var(--primary)] transition-colors">Currency Exchange</Link></li>
              <li><Link to="/saved-places" className="hover:text-[var(--primary)] transition-colors">Saved Destinations</Link></li>
            </ul>
          </div>

          {/* Company / Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Design Specs</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Airbnb & Notion Style</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Emerald & Mint Palette</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Frosted Glass Cards</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Framer Motion</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> 8px Spacing System</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Travel Digest</h4>
            <p className="text-xs text-[var(--text-secondary)]">Get monthly curated trip plans and budget hacks.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full text-xs py-2.5 pl-3 pr-9 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)]"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-[var(--primary)] hover:scale-110 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} TripPilot Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for mindful travelers worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
