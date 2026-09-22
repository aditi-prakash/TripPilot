import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  MapPin,
  Calendar,
  CloudSun,
  DollarSign,
  ArrowRight,
  Sparkles,
  Plane,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function HeroSection({ onOpenCreateTrip }) {
  const navigate = useNavigate();
  const { trips, totalBudget, totalSpent, budgetRatio } = useTrip();
  const upcomingTrip = trips.length > 0 ? trips[0] : null;

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[var(--primary-light)] rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--accent-light)] rounded-full blur-3xl -z-10 opacity-50" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-8"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full frosted-glass border border-[var(--glass-border)] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--primary)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              Smart Travel Planner & Budget OS
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Every Journey <br />
            Begins with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-emerald-500 to-[var(--accent)]">Plan.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl">
            Organize trips, manage budgets, discover destinations, and travel smarter—all in one calm, nature-inspired space.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenCreateTrip}
              className="btn-primary text-base px-7 py-3.5 shadow-lg group"
            >
              <Plane className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              Start Planning
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/saved-places')}
              className="btn-secondary text-base px-7 py-3.5"
            >
              <Compass className="w-5 h-5" />
              Explore Destinations
            </button>
          </div>

          {/* Trust Metrics Pill Bar */}
          <div className="pt-6 border-t border-[var(--border-color)] flex items-center gap-8 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
              <span>Offline Persistence</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
              <span>Realtime Weather & FX</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column Visual Banner & Floating Glass Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Main Scenic Hero Image Frame */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[var(--surface)] group">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
              alt="Scenic Mountain Lake Travel Destination"
              className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Moraine Lake, Alberta
              </div>
              <h3 className="text-2xl font-bold">Discover Nature’s Masterpieces</h3>
              <p className="text-xs text-slate-200 mt-1">Curated itineraries tailored to your pace.</p>
            </div>
          </div>

          {/* Floating Card 1: Live Weather */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-6 hidden sm:flex items-center gap-4 p-4 rounded-2xl frosted-glass shadow-xl border border-[var(--glass-border)] z-20 max-w-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center shrink-0">
              <CloudSun className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-[var(--text-primary)]">Kyoto, Japan</span>
                <span className="text-xs text-[var(--primary)] font-semibold">Sunny</span>
              </div>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">22°C</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Humidity: 58% • Wind: 12 km/h</p>
            </div>
          </motion.div>

          {/* Floating Card 2: Budget Progress */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-8 -right-6 hidden sm:flex items-center gap-4 p-4 rounded-2xl frosted-glass shadow-xl border border-[var(--glass-border)] z-20"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-sm">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">Trip Budget Remaining</span>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  ${(totalBudget - totalSpent).toLocaleString()}
                </p>
                <span className="badge-emerald">{Math.round(100 - budgetRatio)}% left</span>
              </div>
              {/* Progress bar */}
              <div className="w-36 h-2 bg-[var(--border-color)] rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] rounded-full"
                  style={{ width: `${Math.min(100, budgetRatio)}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Card 3: Upcoming Trip */}
          {upcomingTrip && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-8 -translate-y-1/2 hidden md:flex items-center gap-3 p-3.5 rounded-2xl frosted-glass shadow-xl border border-[var(--glass-border)] z-20"
            >
              <img
                src={upcomingTrip.image}
                alt={upcomingTrip.title}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">Next Adventure</span>
                <p className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[140px]">{upcomingTrip.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <Calendar className="w-3 h-3 text-[var(--primary)]" />
                  <span>In {upcomingTrip.daysLeft} days</span>
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
