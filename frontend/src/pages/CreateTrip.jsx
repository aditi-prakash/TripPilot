import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Plane, Calendar, DollarSign, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTrip();

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('Culture & Nature');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !city || !startDate || !endDate || !budget) {
      setError('Please fill in all required fields.');
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

    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="tp-card p-8 space-y-8 bg-[var(--surface)] border border-[var(--border-color)] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Create New Itinerary</h1>
            <p className="text-xs text-[var(--text-secondary)]">Set dates, budget caps, and travel preferences</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="tp-label">Trip Name / Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Vacation in Amalfi Coast"
              className="tp-input"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="tp-label">City / Destination</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Positano"
                className="tp-input"
                required
              />
            </div>
            <div>
              <label className="tp-label">Country</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Italy"
                className="tp-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="tp-label">Budget Limit ($ USD)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="3500"
                className="tp-input"
                required
              />
            </div>
            <div>
              <label className="tp-label">Style / Category</label>
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
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary py-3 px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary py-3 px-8 text-base shadow-lg"
            >
              Save Itinerary <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}