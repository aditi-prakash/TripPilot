import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrip } from '../context/TripContext';
import { X, Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab, loginUser } = useTrip();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || (authModalTab === 'signup' && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSuccess(authModalTab === 'login' ? 'Successfully logged in!' : 'Account created successfully!');
    setTimeout(() => {
      loginUser(email, name || 'Alex Rivera');
      setEmail('');
      setPassword('');
      setName('');
      setSuccess('');
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl shadow-2xl p-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {authModalTab === 'login' ? 'Welcome Back to TripPilot' : 'Start Your Journey'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {authModalTab === 'login'
                ? 'Sign in to access your planned trips and itineraries.'
                : 'Create an account to save destinations and track budgets.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[var(--bg-main)] p-1 rounded-2xl border border-[var(--border-color)] mb-6">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                authModalTab === 'login'
                  ? 'bg-[var(--surface)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('signup');
                setError('');
              }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                authModalTab === 'signup'
                  ? 'bg-[var(--surface)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error / Success Notifications */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-3.5 mb-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-3.5 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalTab === 'signup' && (
              <div>
                <label className="tp-label">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="tp-input pl-11"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="tp-label">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  className="tp-input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="tp-label">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="tp-input pl-11"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base mt-2 shadow-lg">
              {authModalTab === 'login' ? 'Sign In to TripPilot' : 'Create Free Account'}
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
