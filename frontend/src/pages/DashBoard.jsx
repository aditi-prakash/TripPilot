import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrip } from '../context/TripContext';
import CreateTripModal from '../components/CreateTripModal';
import AddExpenseModal from '../components/AddExpenseModal';
import {
  Calendar,
  PiggyBank,
  CloudSun,
  DollarSign,
  Bookmark,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Trash2,
  AlertTriangle,
  CheckCircle,
  PieChart as PieIcon,
  BarChart3,
  MapPin
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    trips,
    expenses,
    destinations,
    totalBudget,
    totalSpent,
    budgetRatio,
    deleteTrip
  } = useTrip();

  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Category expense calculations for Pie Chart
  const categories = ['Flights', 'Hotels', 'Food', 'Activities', 'Transport', 'Shopping'];
  const categoryTotals = categories.map((cat) => ({
    name: cat,
    total: expenses.filter((e) => e.category === cat).reduce((sum, item) => sum + item.amount, 0)
  }));

  const categoryColors = {
    Flights: '#3B82F6',
    Hotels: '#8B5CF6',
    Food: '#EC4899',
    Activities: '#F59E0B',
    Transport: '#10B981',
    Shopping: '#6366F1'
  };

  const totalCatExpenses = categoryTotals.reduce((a, b) => a + b.total, 0) || 1;

  // Threshold status & color
  let thresholdColor = 'text-emerald-500';
  let thresholdBg = 'bg-emerald-500';
  let statusBadge = 'Under Budget (<70%)';

  if (budgetRatio >= 90) {
    thresholdColor = 'text-red-500';
    thresholdBg = 'bg-red-500';
    statusBadge = 'Budget Exceeded (>90%)';
  } else if (budgetRatio >= 70) {
    thresholdColor = 'text-amber-500';
    thresholdBg = 'bg-amber-500';
    statusBadge = 'Near Budget Limit (70–90%)';
  }

  const savedCount = destinations.filter((d) => d.isSaved).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Quick Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Travel Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Overview of your active trips, expenses, budget allocation, and weather summaries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="btn-secondary text-sm py-2.5 px-4"
          >
            <DollarSign className="w-4 h-4" />
            Log Expense
          </button>

          <button
            onClick={() => setIsCreateTripOpen(true)}
            className="btn-primary text-sm py-2.5 px-5 shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            New Trip
          </button>
        </div>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1: Upcoming Trips */}
        <div className="tp-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Upcoming Trips</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">{trips.length}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">Active itineraries</p>
        </div>

        {/* Card 2: Budget Remaining */}
        <div className="tp-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Remaining Budget</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">
            ${Math.max(0, totalBudget - totalSpent).toLocaleString()}
          </p>
          <p className={`text-[11px] font-bold ${thresholdColor}`}>
            {statusBadge}
          </p>
        </div>

        {/* Card 3: Weather Overview */}
        <div
          onClick={() => navigate('/weather')}
          className="tp-card tp-card-hover space-y-3 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Kyoto Weather</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">22°C</p>
          <p className="text-[11px] text-[var(--text-secondary)]">Sunny • Click for 5-day</p>
        </div>

        {/* Card 4: Total Expenses */}
        <div className="tp-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Logged Expenses</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">
            ${totalSpent.toLocaleString()}
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">{expenses.length} transaction items</p>
        </div>

        {/* Card 5: Saved Places */}
        <div
          onClick={() => navigate('/saved-places')}
          className="tp-card tp-card-hover space-y-3 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Saved Places</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-primary)]">{savedCount}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">Bucket-list spots</p>
        </div>

      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Budget Progress Gauge & Bar Chart */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Budget Threshold Progress Card */}
          <div className="tp-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-[var(--primary)]" />
                  Budget Threshold Allocation
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Green (&lt;70%), Gold (70-90%), Red (&gt;90%)
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${thresholdColor} bg-[var(--primary-light)]`}>
                {Math.round(budgetRatio)}% Used
              </span>
            </div>

            {/* Circular SVG Gauge & Numbers */}
            <div className="flex flex-col sm:flex-row items-center gap-8 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[var(--border-color)]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`transition-all duration-1000 ease-out ${thresholdColor}`}
                    strokeDasharray={`${Math.min(100, budgetRatio)}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-[var(--text-primary)]">
                    {Math.round(budgetRatio)}%
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-medium">Used</span>
                </div>
              </div>

              {/* Linear Breakdown Stats */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[var(--text-secondary)]">Spent so far</span>
                    <span className="text-[var(--text-primary)]">${totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${thresholdBg}`}
                      style={{ width: `${Math.min(100, budgetRatio)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <span className="text-[var(--text-secondary)]">Total Trip Budget</span>
                    <p className="font-bold text-[var(--text-primary)] text-sm">${totalBudget.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">Available Balance</span>
                    <p className="font-bold text-emerald-500 text-sm">
                      ${Math.max(0, totalBudget - totalSpent).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bar Chart: Expenses per Trip */}
          <div className="tp-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
                Budget vs. Spent per Trip
              </h3>
              <span className="text-xs text-[var(--text-secondary)]">USD ($)</span>
            </div>

            <div className="space-y-4 pt-2">
              {trips.map((t) => {
                const ratio = t.budget > 0 ? (t.spent / t.budget) * 100 : 0;
                let colorClass = 'bg-emerald-500';
                if (ratio >= 90) colorClass = 'bg-red-500';
                else if (ratio >= 70) colorClass = 'bg-amber-500';

                return (
                  <div key={t.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[var(--text-primary)] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                        {t.title}
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        ${t.spent.toLocaleString()} / ${t.budget.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
                        style={{ width: `${Math.min(100, ratio)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Pie Chart Expense Breakdown & Trip List */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Pie Chart Expense Category Breakdown */}
          <div className="tp-card space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-[var(--primary)]" />
              Category Expenses
            </h3>

            {/* Custom Interactive Legend List */}
            <div className="space-y-3 pt-2">
              {categoryTotals.map((cat) => {
                const pct = Math.round((cat.total / totalCatExpenses) * 100);
                return (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: categoryColors[cat.name] }}
                      />
                      <span className="font-semibold text-[var(--text-primary)]">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[var(--text-primary)]">${cat.total.toLocaleString()}</span>
                      <span className="w-10 text-right text-[var(--text-secondary)]">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Trips List */}
          <div className="tp-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Upcoming Trips</h3>
              <button
                onClick={() => setIsCreateTripOpen(true)}
                className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                        {trip.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">{trip.city}, {trip.destination}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="badge-emerald text-[10px]">In {trip.daysLeft} days</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrip(trip.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modals */}
      <CreateTripModal isOpen={isCreateTripOpen} onClose={() => setIsCreateTripOpen(false)} />
      <AddExpenseModal isOpen={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} />

    </div>
  );
}