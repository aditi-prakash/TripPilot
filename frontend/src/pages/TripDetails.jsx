import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import AddExpenseModal from '../components/AddExpenseModal';
import {
  Calendar,
  MapPin,
  DollarSign,
  PlusCircle,
  ArrowLeft,
  CheckSquare,
  Clock,
  Compass,
  PiggyBank,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, expenses, deleteExpense, deleteTrip } = useTrip();

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newItineraryDay, setNewItineraryDay] = useState('');
  const [newItineraryTitle, setNewItineraryTitle] = useState('');
  const [newItineraryDetails, setNewItineraryDetails] = useState('');

  const trip = trips.find((t) => t.id === id) || trips[0];

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Trip Not Found</h2>
        <Link to="/dashboard" className="btn-primary inline-flex">Return to Dashboard</Link>
      </div>
    );
  }

  const tripExpenses = expenses.filter((e) => e.tripId === trip.id);
  const ratio = trip.budget > 0 ? (trip.spent / trip.budget) * 100 : 0;

  let thresholdColor = 'text-emerald-500';
  let thresholdBg = 'bg-emerald-500';
  if (ratio >= 90) {
    thresholdColor = 'text-red-500';
    thresholdBg = 'bg-red-500';
  } else if (ratio >= 70) {
    thresholdColor = 'text-amber-500';
    thresholdBg = 'bg-amber-500';
  }

  const handleAddItinerary = (e) => {
    e.preventDefault();
    if (!newItineraryTitle) return;
    
    trip.itinerary = trip.itinerary || [];
    trip.itinerary.push({
      day: Number(newItineraryDay) || trip.itinerary.length + 1,
      title: newItineraryTitle,
      details: newItineraryDetails
    });

    setNewItineraryDay('');
    setNewItineraryTitle('');
    setNewItineraryDetails('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Navigation */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      {/* Hero Visual Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)] h-80 group">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              {trip.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{trip.title}</h1>
            <p className="text-sm text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--primary)]" />
              {trip.city}, {trip.destination} • {trip.startDate} to {trip.endDate}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="btn-primary text-xs py-2.5 px-4"
            >
              <DollarSign className="w-4 h-4" /> Log Expense
            </button>
            <button
              onClick={() => {
                deleteTrip(trip.id);
                navigate('/dashboard');
              }}
              className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md transition-colors"
              title="Delete Trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout: Timeline & Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Itinerary Timeline */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="tp-card space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--primary)]" />
                Day-by-Day Itinerary Timeline
              </h2>
              <span className="badge-emerald">{trip.itinerary?.length || 0} Schedule Items</span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--border-color)]">
              {(trip.itinerary || []).map((item, idx) => (
                <div key={idx} className="relative pl-9 space-y-1">
                  <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[var(--primary)] text-white font-bold text-xs flex items-center justify-center ring-4 ring-[var(--surface)]">
                    {item.day}
                  </div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>

            {/* Add Itinerary Item Form */}
            <form onSubmit={handleAddItinerary} className="pt-6 border-t border-[var(--border-color)] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Add Itinerary Stop</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="number"
                  placeholder="Day #"
                  value={newItineraryDay}
                  onChange={(e) => setNewItineraryDay(e.target.value)}
                  className="tp-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Activity Title"
                  value={newItineraryTitle}
                  onChange={(e) => setNewItineraryTitle(e.target.value)}
                  className="tp-input text-xs sm:col-span-3"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Details or notes..."
                value={newItineraryDetails}
                onChange={(e) => setNewItineraryDetails(e.target.value)}
                className="tp-input text-xs"
              />
              <button type="submit" className="btn-secondary text-xs py-2 px-4">
                <PlusCircle className="w-3.5 h-3.5" /> Add Stop
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Trip Budget & Expense Log */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Trip Budget Allocation */}
          <div className="tp-card space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[var(--primary)]" />
              Trip Budget Status
            </h3>

            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--text-secondary)] font-semibold">Spent vs Budget</span>
                <span className={`text-xs font-bold ${thresholdColor}`}>
                  {Math.round(ratio)}% Used
                </span>
              </div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">
                ${trip.spent.toLocaleString()} <span className="text-xs font-normal text-[var(--text-secondary)]">/ ${trip.budget.toLocaleString()}</span>
              </p>
              <div className="w-full h-3 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${thresholdBg}`}
                  style={{ width: `${Math.min(100, ratio)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Logged Expenses List */}
          <div className="tp-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Trip Expenses</h3>
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="text-xs font-bold text-[var(--primary)] hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="space-y-3">
              {tripExpenses.length === 0 ? (
                <p className="text-xs text-[var(--text-secondary)] italic">No expenses logged for this trip yet.</p>
              ) : (
                tripExpenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs"
                  >
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{exp.title}</p>
                      <span className="text-[10px] text-[var(--text-secondary)]">{exp.category} • {exp.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[var(--text-primary)]">${exp.amount}</span>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        defaultTripId={trip.id}
      />

    </div>
  );
}