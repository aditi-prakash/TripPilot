import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTrip } from '../context/TripContext';
import MapWidget from '../components/MapWidget';
import CreateTripModal from '../components/CreateTripModal';
import {
  Bookmark,
  Star,
  MapPin,
  Compass,
  Filter,
  Layers,
  Map as MapIcon,
  Sparkles,
  Search
} from 'lucide-react';

export default function SavedPlaces() {
  const { destinations, toggleSaveDestination } = useTrip();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

  const categories = ['All', 'Beach', 'Culture', 'Mountains', 'Adventure'];

  const filtered = destinations.filter((dest) => {
    const matchesCat = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesSaved = showSavedOnly ? dest.isSaved : true;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSaved && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Explore & Saved Places</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Discover curated bucket-list destinations and save them directly to your itinerary.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-[var(--surface)] p-1.5 rounded-2xl border border-[var(--border-color)] self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--text-primary)] hover:bg-[var(--primary-light)]'
            }`}
          >
            <Layers className="w-4 h-4" /> Grid View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--text-primary)] hover:bg-[var(--primary-light)]'
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map View
          </button>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations (e.g., Kyoto, Beach, Lake)..."
            className="tp-input pl-10 pr-4 text-xs py-2.5"
          />
        </div>

        {/* Category Pills & Saved Toggle */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              showSavedOnly
                ? 'bg-[var(--accent)] text-slate-900 border-[var(--accent)] shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent)]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 inline mr-1 fill-current" />
            {showSavedOnly ? 'Showing Saved' : 'Saved Only'}
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--primary-light)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Content Display: Grid or Map */}
      {viewMode === 'map' ? (
        <MapWidget height="600px" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="tp-card overflow-hidden p-0 border border-[var(--border-color)] group flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
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
                  title={dest.isSaved ? 'Remove from Saved' : 'Save Destination'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1">{dest.description}</p>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">Average Spend</span>
                    <p className="text-base font-extrabold text-[var(--primary)]">${dest.pricePerDay} <span className="text-xs font-normal text-[var(--text-secondary)]">/ day</span></p>
                  </div>
                  <button
                    onClick={() => setIsCreateTripOpen(true)}
                    className="btn-primary py-2 px-4 text-xs"
                  >
                    Create Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CreateTripModal isOpen={isCreateTripOpen} onClose={() => setIsCreateTripOpen(false)} />

    </div>
  );
}