import React from 'react';
import { useTrip } from '../context/TripContext';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Globe,
  PiggyBank,
  Shield,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  Compass
} from 'lucide-react';

export default function Profile() {
  const { user, trips, destinations, logoutUser } = useTrip();
  const { theme, toggleTheme } = useTheme();

  const savedCount = destinations.filter((d) => d.isSaved).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header Banner */}
      <div className="tp-card p-8 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)] to-[var(--primary-light)] border border-[var(--border-color)] shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[var(--primary)] shadow-lg"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">{user.name}</h1>
                <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
              </div>
              <span className="badge-emerald self-center sm:self-auto text-xs py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 inline mr-1 text-[var(--accent)]" /> Verified Explorer
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Member since 2025 • Passionate about nature & culture</p>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="tp-card text-center space-y-2">
          <Globe className="w-7 h-7 text-[var(--primary)] mx-auto" />
          <p className="text-3xl font-extrabold text-[var(--text-primary)]">{trips.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Planned Itineraries</p>
        </div>

        <div className="tp-card text-center space-y-2">
          <Compass className="w-7 h-7 text-[var(--accent)] mx-auto" />
          <p className="text-3xl font-extrabold text-[var(--text-primary)]">{savedCount}</p>
          <p className="text-xs text-[var(--text-secondary)]">Saved Bucket-List Spots</p>
        </div>

        <div className="tp-card text-center space-y-2">
          <PiggyBank className="w-7 h-7 text-emerald-500 mx-auto" />
          <p className="text-3xl font-extrabold text-[var(--text-primary)]">$4,250</p>
          <p className="text-xs text-[var(--text-secondary)]">Estimated Travel Savings</p>
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="tp-card space-y-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
          App Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">Theme Preference</p>
              <p className="text-xs text-[var(--text-secondary)]">Switch between Fresh Light and Premium Dark mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="btn-secondary text-xs py-2 px-4"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 mr-1" /> : <Sun className="w-4 h-4 mr-1 text-amber-400" />}
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">Account Session</p>
              <p className="text-xs text-[var(--text-secondary)]">Log out of your current TripPilot session</p>
            </div>
            <button
              onClick={logoutUser}
              className="btn-danger text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}