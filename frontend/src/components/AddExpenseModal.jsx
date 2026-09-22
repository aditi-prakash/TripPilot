import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PiggyBank, DollarSign, Calendar, Tag, PlusCircle } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function AddExpenseModal({ isOpen, onClose, defaultTripId = '' }) {
  const { trips, addExpense } = useTrip();

  const [tripId, setTripId] = useState(defaultTripId || (trips[0]?.id || ''));
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !tripId) {
      setError('Please fill in all required fields.');
      return;
    }

    addExpense({
      tripId,
      title,
      category,
      amount: Number(amount),
      date
    });

    setTitle('');
    setAmount('');
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
          className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl shadow-2xl p-8 overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Log Expense</h3>
                <p className="text-xs text-[var(--text-secondary)]">Track trip expenditures in real-time</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="tp-label">Select Trip</label>
              <select
                value={tripId}
                onChange={(e) => setTripId(e.target.value)}
                className="tp-input"
                required
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.city})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="tp-label">Expense Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bullet Train Ticket or Hotel Room"
                className="tp-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="tp-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="tp-input"
                >
                  <option value="Flights">Flights</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Food">Food</option>
                  <option value="Activities">Activities</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                </select>
              </div>

              <div>
                <label className="tp-label">Amount ($ USD)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="120"
                    className="tp-input pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="tp-label">Expense Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="tp-input"
                required
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border-color)]">
              <button type="button" onClick={onClose} className="btn-secondary py-2.5 px-5">
                Cancel
              </button>
              <button type="submit" className="btn-primary py-2.5 px-6">
                <PlusCircle className="w-4 h-4" />
                Add Expense
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
