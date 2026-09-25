import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTrip } from '../context/TripContext';
import {
  Compass,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LayoutDashboard,
  CloudSun,
  Coins,
  Bookmark,
  PiggyBank,
  LogOut,
  Sparkles,
  Plane
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser, setIsAuthModalOpen, setAuthModalTab } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Budget', path: '/budget', icon: PiggyBank },
    { name: 'Weather', path: '/weather', icon: CloudSun },
    { name: 'Currency', path: '/currency', icon: Coins },
    { name: 'Saved Places', path: '/saved-places', icon: Bookmark },
  ];

  const isActive = (path) => location.pathname === path;

  const handleOpenAuth = (tab) => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 frosted-glass border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-[var(--text-primary)] flex items-center gap-1">
              TripPilot <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block"></span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-medium text-[var(--text-secondary)] -mt-1">
              Explore. Plan. Discover.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--surface)] p-1.5 rounded-2xl border border-[var(--border-color)] shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--text-primary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[var(--primary)]'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all shadow-sm"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-700" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>

          {/* User Profile or Auth */}
          {user && user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all shadow-sm"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--primary)]"
                />
                <span className="text-sm font-medium text-[var(--text-primary)]">{user.name.split(' ')[0]}</span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl py-2 z-50"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[var(--border-color)]">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors"
                  >
                    <User className="w-4 h-4 text-[var(--primary)]" />
                    My Travel Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                    Trip Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenAuth('login')}
                className="btn-secondary text-sm px-4 py-2"
              >
                Log In
              </button>
              <button
                onClick={() => handleOpenAuth('signup')}
                className="btn-primary text-sm px-4 py-2"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border-color)] px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    active
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--text-primary)] hover:bg-[var(--secondary)]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-[var(--primary)]'}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-2">
            {user && user.isLoggedIn ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="btn-secondary justify-center py-2.5"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="btn-primary justify-center py-2.5"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
