import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Calendar, DollarSign, MapPin, Tag, Sparkles, PlusCircle } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function CreateTripModal({ isOpen, onClose }) {
  const { addTrip } = useTrip();

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('Culture & Nature');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !city || !startDate || !endDate || !budget) {
      setError('Please fill in all required fields.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date.');
      return;
    }

    addTrip({
      title,
      city,
      destination: destination || city,
      startDate,
      endDate,
      budget: Number(budget),
      category
    });

    // Reset & Close
    setTitle('');
    setCity('');
    setDestination('');
    setStartDate('');
    setEndDate('');
    setBudget('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Plan New Trip</h3>
                <p className="text-xs text-[var(--text-secondary)]">Organize your next itinerary and set budget thresholds</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="tp-label">Trip Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autumn in Kyoto & Osaka"
                className="tp-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="tp-label">City / Region</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kyoto"
                    className="tp-input pl-9"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="tp-label">Country</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Japan"
                  className="tp-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="tp-label">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="tp-input"
                  required
                />
              </div>
              <div>
                <label className="tp-label">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="tp-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="tp-label">Target Budget ($ USD)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="2500"
                    className="tp-input pl-9"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="tp-label">Travel Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="tp-input"
                >
                  <option value="Culture & Nature">Culture & Nature</option>
                  <option value="Beach & Coastal">Beach & Coastal</option>
                  <option value="Mountains & Hiking">Mountains & Hiking</option>
                  <option value="City Exploration">City Exploration</option>
                  <option value="Luxury & Relaxation">Luxury & Relaxation</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border-color)]">
              <button type="button" onClick={onClose} className="btn-secondary py-2.5 px-5">
                Cancel
              </button>
              <button type="submit" className="btn-primary py-2.5 px-6">
                <PlusCircle className="w-4 h-4" />
                Create Trip
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
