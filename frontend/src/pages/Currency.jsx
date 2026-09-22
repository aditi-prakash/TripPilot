import React, { useState } from 'react';
import { Coins, ArrowRightLeft, TrendingUp, Sparkles, DollarSign, Euro, PoundSterling, JapaneseYen } from 'lucide-react';

const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154.5,
  INR: 83.4,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.89
};

const CURRENCY_NAMES = {
  USD: 'US Dollar ($)',
  EUR: 'Euro (€)',
  GBP: 'British Pound (£)',
  JPY: 'Japanese Yen (¥)',
  INR: 'Indian Rupee (₹)',
  CAD: 'Canadian Dollar (C$)',
  AUD: 'Australian Dollar (A$)',
  CHF: 'Swiss Franc (CHF)'
};

export default function Currency() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('JPY');
  const [amount, setAmount] = useState('100');

  const rates = EXCHANGE_RATES;
  const numAmount = Number(amount) || 0;

  // Convert amount from base USD
  const amountInUSD = numAmount / rates[fromCurrency];
  const convertedResult = (amountInUSD * rates[toCurrency]).toFixed(2);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const topPairs = [
    { from: 'USD', to: 'EUR', rate: (rates.EUR / rates.USD).toFixed(4) },
    { from: 'USD', to: 'JPY', rate: (rates.JPY / rates.USD).toFixed(2) },
    { from: 'EUR', to: 'GBP', rate: (rates.GBP / rates.EUR).toFixed(4) },
    { from: 'USD', to: 'INR', rate: (rates.INR / rates.USD).toFixed(2) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Currency Exchange Engine</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Calculate trip conversion budgets across top global currencies in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Converter Card */}
        <div className="lg:col-span-7 tp-card p-8 bg-[var(--surface)] border border-[var(--border-color)] shadow-xl space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] font-poppins">Travel Converter</h2>
              <p className="text-xs text-[var(--text-secondary)]">Instant FX rate computation</p>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Amount Input */}
            <div>
              <label className="tp-label">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="tp-input text-lg font-bold py-3"
              />
            </div>

            {/* Currency Selectors & Swap */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-end">
              
              <div className="sm:col-span-5">
                <label className="tp-label">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="tp-input font-bold"
                >
                  {Object.keys(EXCHANGE_RATES).map((code) => (
                    <option key={code} value={code}>
                      {code} - {CURRENCY_NAMES[code]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="sm:col-span-1 flex justify-center pb-1">
                <button
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Swap Currencies"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="sm:col-span-5">
                <label className="tp-label">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="tp-input font-bold"
                >
                  {Object.keys(EXCHANGE_RATES).map((code) => (
                    <option key={code} value={code}>
                      {code} - {CURRENCY_NAMES[code]}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Result Box */}
            <div className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2">
              <span className="text-xs text-[var(--text-secondary)] font-medium">Converted Result</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-extrabold text-[var(--primary)]">
                  {convertedResult} {toCurrency}
                </h3>
                <span className="text-xs text-[var(--text-secondary)] font-semibold">
                  1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Popular Pairs & Reference Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="tp-card space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              Popular Travel Rates
            </h3>

            <div className="space-y-3">
              {topPairs.map((pair) => (
                <div
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-semibold"
                >
                  <span className="text-[var(--text-primary)]">
                    1 {pair.from} → {pair.to}
                  </span>
                  <span className="font-extrabold text-[var(--primary)]">{pair.rate}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tp-card p-6 bg-emerald-500/10 border border-[var(--primary-light)] space-y-3">
            <h4 className="font-bold text-sm text-[var(--primary)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" /> Pro Travel Tip
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              When traveling internationally, choose to pay in local currency rather than converted USD at card terminals to avoid hidden 3–5% dynamic currency conversion fees.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}