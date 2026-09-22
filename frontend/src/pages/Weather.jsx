import React, { useState } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Search,
  MapPin,
  Sparkles,
  Compass
} from 'lucide-react';

const WEATHER_PRESETS = {
  'Kyoto, Japan': {
    temp: 22,
    condition: 'Partly Sunny',
    humidity: 58,
    wind: 12,
    uv: 'Moderate (4)',
    visibility: '10 km',
    forecast: [
      { day: 'Mon', temp: 22, condition: 'Sunny', icon: Sun },
      { day: 'Tue', temp: 24, condition: 'Partly Sunny', icon: CloudSun },
      { day: 'Wed', temp: 19, condition: 'Rain Shower', icon: CloudRain },
      { day: 'Thu', temp: 21, condition: 'Sunny', icon: Sun },
      { day: 'Fri', temp: 23, condition: 'Partly Sunny', icon: CloudSun }
    ]
  },
  'Positano, Italy': {
    temp: 26,
    condition: 'Sunny & Warm',
    humidity: 62,
    wind: 16,
    uv: 'High (7)',
    visibility: '12 km',
    forecast: [
      { day: 'Mon', temp: 26, condition: 'Sunny', icon: Sun },
      { day: 'Tue', temp: 27, condition: 'Sunny', icon: Sun },
      { day: 'Wed', temp: 25, condition: 'Partly Sunny', icon: CloudSun },
      { day: 'Thu', temp: 26, condition: 'Sunny', icon: Sun },
      { day: 'Fri', temp: 28, condition: 'Sunny', icon: Sun }
    ]
  },
  'Zermatt, Switzerland': {
    temp: 14,
    condition: 'Clear Alpine',
    humidity: 45,
    wind: 20,
    uv: 'Very High (8)',
    visibility: '15 km',
    forecast: [
      { day: 'Mon', temp: 14, condition: 'Sunny', icon: Sun },
      { day: 'Tue', temp: 12, condition: 'Partly Sunny', icon: CloudSun },
      { day: 'Wed', temp: 10, condition: 'Light Rain', icon: CloudRain },
      { day: 'Thu', temp: 13, condition: 'Clear', icon: Sun },
      { day: 'Fri', temp: 15, condition: 'Sunny', icon: Sun }
    ]
  },
  'Banff, Canada': {
    temp: 18,
    condition: 'Breezy & Cool',
    humidity: 50,
    wind: 18,
    uv: 'Moderate (5)',
    visibility: '12 km',
    forecast: [
      { day: 'Mon', temp: 18, condition: 'Partly Sunny', icon: CloudSun },
      { day: 'Tue', temp: 17, condition: 'Breezy', icon: Wind },
      { day: 'Wed', temp: 15, condition: 'Light Rain', icon: CloudRain },
      { day: 'Thu', temp: 19, condition: 'Sunny', icon: Sun },
      { day: 'Fri', temp: 20, condition: 'Sunny', icon: Sun }
    ]
  }
};

export default function Weather() {
  const [selectedCity, setSelectedCity] = useState('Kyoto, Japan');
  const [searchQuery, setSearchQuery] = useState('');

  const weatherData = WEATHER_PRESETS[selectedCity] || WEATHER_PRESETS['Kyoto, Japan'];

  const cities = Object.keys(WEATHER_PRESETS);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const found = cities.find((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    if (found) {
      setSelectedCity(found);
      setSearchQuery('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Destination Weather</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Live temperature, humidity, wind velocity, and 5-day trip forecasts.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city (Kyoto, Positano, Banff)..."
            className="tp-input pl-10 pr-4 text-xs py-2.5"
          />
        </form>
      </div>

      {/* City Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCity === city
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--primary-light)] border border-[var(--border-color)]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 inline mr-1.5" />
            {city}
          </button>
        ))}
      </div>

      {/* Main Weather Visual Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Big Weather Card */}
        <div className="lg:col-span-7 tp-card p-8 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--primary-light)] border border-[var(--border-color)] shadow-xl space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center shadow-lg">
                <CloudSun className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">{selectedCity}</h2>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Updated 5 minutes ago</p>
              </div>
            </div>

            <span className="badge-emerald text-sm py-1 px-3">
              {weatherData.condition}
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-extrabold text-[var(--text-primary)]">
              {weatherData.temp}°C
            </span>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              High 24° / Low 15°
            </span>
          </div>

          {/* Metrics 4 Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Humidity</span>
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">{weatherData.humidity}%</p>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Wind className="w-4 h-4 text-emerald-500" />
                <span>Wind Speed</span>
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">{weatherData.wind} km/h</p>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>UV Index</span>
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">{weatherData.uv}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Visibility</span>
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">{weatherData.visibility}</p>
            </div>
          </div>

        </div>

        {/* Right Column: 5-Day Forecast */}
        <div className="lg:col-span-5 tp-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            5-Day Trip Forecast
          </h3>

          <div className="space-y-3">
            {weatherData.forecast.map((day) => {
              const Icon = day.icon;
              return (
                <div
                  key={day.day}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] text-[var(--primary)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{day.day}</span>
                  </div>

                  <span className="text-xs text-[var(--text-secondary)] font-medium">{day.condition}</span>

                  <span className="text-sm font-extrabold text-[var(--text-primary)]">{day.temp}°C</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}