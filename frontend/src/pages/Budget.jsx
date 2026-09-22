import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import AddExpenseModal from '../components/AddExpenseModal';
import {
  PiggyBank,
  PlusCircle,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Calendar,
  Filter,
  PieChart
} from 'lucide-react';

export default function Budget() {
  const { trips, expenses, totalBudget, totalSpent, budgetRatio, deleteExpense } = useTrip();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Flights', 'Hotels', 'Food', 'Activities', 'Transport', 'Shopping'];

  const filteredExpenses = expenses.filter((e) =>
    selectedCategory === 'All' ? true : e.category === selectedCategory
  );

  // Dynamic threshold rules
  let thresholdColor = 'text-emerald-500';
  let thresholdBg = 'bg-emerald-500';
  let thresholdText = 'Below 70% - Excellent Budget Control';
  let statusBadge = 'Safe (<70%)';

  if (budgetRatio >= 90) {
    thresholdColor = 'text-red-500';
    thresholdBg = 'bg-red-500';
    thresholdText = 'Above 90% - Critical Threshold Warning';
    statusBadge = 'Alert (>90%)';
  } else if (budgetRatio >= 70) {
    thresholdColor = 'text-amber-500';
    thresholdBg = 'bg-amber-500';
    thresholdText = '70–90% - Approach Budget Cap';
    statusBadge = 'Caution (70-90%)';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Budget Tracker OS</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Real-time threshold color indicators and expense categorization.
          </p>
        </div>

        <button
          onClick={() => setIsAddExpenseOpen(true)}
          className="btn-primary text-sm py-2.5 px-5 shadow-md self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Log New Expense
        </button>
      </div>

      {/* Main Budget Card with Circular & Linear Progress */}
      <div className="tp-card p-8 space-y-8 bg-[var(--surface)] border border-[var(--border-color)] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[var(--border-color)] pb-8">
          
          {/* Circular Progress Meter */}
          <div className="flex items-center gap-6">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[var(--border-color)]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`transition-all duration-1000 ${thresholdColor}`}
                  strokeDasharray={`${Math.min(100, budgetRatio)}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-[var(--text-primary)]">
                  {Math.round(budgetRatio)}%
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Budget</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${thresholdColor} bg-[var(--primary-light)]`}>
                {statusBadge}
              </span>
              <h3 className="text-2xl font-extrabold text-[var(--text-primary)]">
                ${totalSpent.toLocaleString()} <span className="text-sm font-normal text-[var(--text-secondary)]">/ ${totalBudget.toLocaleString()}</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium">{thresholdText}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <span className="text-xs text-[var(--text-secondary)]">Remaining Balance</span>
              <p className="text-xl font-bold text-emerald-500">${Math.max(0, totalBudget - totalSpent).toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <span className="text-xs text-[var(--text-secondary)] font-medium">Daily Avg Target</span>
              <p className="text-xl font-bold text-[var(--text-primary)]">${Math.round(totalBudget / 14)} / day</p>
            </div>
          </div>

        </div>

        {/* Linear Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-[var(--text-secondary)]">
            <span>Overall Budget Consumption</span>
            <span>{Math.round(budgetRatio)}%</span>
          </div>
          <div className="w-full h-4 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${thresholdBg}`}
              style={{ width: `${Math.min(100, budgetRatio)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Expense Management Table */}
      <div className="tp-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-[var(--primary)]" />
            Expense Transactions Log
          </h3>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Trip</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredExpenses.map((exp) => {
                const trip = trips.find((t) => t.id === exp.tripId);
                return (
                  <tr key={exp.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="py-4 px-4 font-bold text-[var(--text-primary)]">{exp.title}</td>
                    <td className="py-4 px-4 text-[var(--text-secondary)]">{trip ? trip.title : 'General'}</td>
                    <td className="py-4 px-4">
                      <span className="badge-emerald">{exp.category}</span>
                    </td>
                    <td className="py-4 px-4 text-[var(--text-secondary)]">{exp.date}</td>
                    <td className="py-4 px-4 font-extrabold text-[var(--text-primary)]">
                      ${exp.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddExpenseModal isOpen={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} />

    </div>
  );
}