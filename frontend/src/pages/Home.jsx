import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import MapWidget from '../components/MapWidget';
import CreateTripModal from '../components/CreateTripModal';
import { useTrip } from '../context/TripContext';
import {
  Compass,
  PiggyBank,
  CloudSun,
  Coins,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { destinations, toggleSaveDestination } = useTrip();
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

  const featuredDestinations = destinations.slice(0, 3);

  const features = [
    {
      icon: PiggyBank,
      title: 'Smart Budget OS',
      description: 'Track flights, hotels, and meals with dynamic threshold color gauges (<70% green, 70-90% gold, >90% red).'
    },
    {
      icon: CloudSun,
      title: 'Real-Time Weather Widget',
      description: 'Monitor live forecasts, wind speeds, and UV metrics for your destination before packing.'
    },
    {
      icon: Coins,
      title: 'Live FX Converter',
      description: 'Convert travel currencies instantly with real-time exchange rates and historical trend visualizer.'
    },
    {
      icon: Compass,
      title: 'Interactive Leaflet Maps',
      description: 'Explore destinations on a responsive, rounded Leaflet canvas with custom pin markers and popups.'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* Hero Section */}
      <HeroSection onOpenCreateTrip={() => setIsCreateTripOpen(true)} />

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
          <span className="badge-emerald inline-block">Designed for Mindful Explorers</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Everything You Need for Seamless Travel
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Inspired by Linear, Notion, and Apple design principles. Calm, intuitive, and blisteringly fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="tp-card tp-card-hover group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Map Discovery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-gold mb-2 inline-block">Interactive Map View</span>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Explore Places Around the Globe</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Click map pins to inspect pricing, reviews, and save locations to your itinerary.
            </p>
          </div>
          <Link to="/saved-places" className="btn-secondary text-sm self-start md:self-auto">
            View All Saved Places
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <MapWidget height="500px" />
      </section>

      {/* Popular Destinations Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Popular Destinations</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Handpicked bucket-list experiences with high ratings</p>
          </div>
          <Link to="/saved-places" className="text-sm font-semibold text-[var(--primary)] hover:underline flex items-center gap-1">
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="tp-card overflow-hidden p-0 border border-[var(--border-color)] group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[var(--surface)]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--text-primary)] shadow-sm">
                  {dest.badge}
                </div>
                <button
                  onClick={() => toggleSaveDestination(dest.id)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    dest.isSaved
                      ? 'bg-[var(--accent)] text-slate-900 shadow-md'
                      : 'bg-black/40 text-white backdrop-blur-md hover:bg-black/60'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{dest.description}</p>

                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[var(--text-secondary)]">Avg. Expense</span>
                    <p className="text-base font-extrabold text-[var(--primary)]">${dest.pricePerDay} <span className="text-xs font-normal text-[var(--text-secondary)]">/ day</span></p>
                  </div>
                  <button
                    onClick={() => setIsCreateTripOpen(true)}
                    className="btn-primary py-2 px-4 text-xs"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 lg:p-16 overflow-hidden bg-gradient-to-r from-[var(--primary)] to-emerald-700 text-white shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" /> Start Free Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Ready to Craft Your Next Unforgettable Adventure?
            </h2>
            <p className="text-emerald-100 text-base sm:text-lg">
              Join thousands of travelers who rely on TripPilot to organize budgets, map itineraries, and discover nature stress-free.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setIsCreateTripOpen(true)}
                className="bg-white text-[var(--primary)] font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2"
              >
                Start Planning Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Create Trip Modal */}
      <CreateTripModal
        isOpen={isCreateTripOpen}
        onClose={() => setIsCreateTripOpen(false)}
      />

    </div>
  );
}