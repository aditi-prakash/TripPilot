import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Star, Navigation, Search, Compass } from 'lucide-react';
import { useTrip } from '../context/TripContext';

// Custom Leaflet Marker Icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: #2E8B57;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: 3px solid white;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      font-weight: bold;
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34]
  });
};

export default function MapWidget({ height = "480px" }) {
  const { destinations, toggleSaveDestination } = useTrip();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beach', 'Culture', 'Mountains', 'Adventure'];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const centerPos = [35.0116, 135.7681]; // Default Kyoto

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[var(--border-color)] bg-[var(--surface)]">
      
      {/* Floating Control Panel */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 frosted-glass rounded-2xl p-1.5 shadow-lg border border-[var(--glass-border)]">
          <Search className="w-5 h-5 text-[var(--primary)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search map places (e.g., Kyoto, Beach, Lake)..."
            className="w-full pl-11 pr-4 py-2 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-medium outline-none"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 frosted-glass rounded-2xl p-1.5 overflow-x-auto shadow-lg border border-[var(--glass-border)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'text-[var(--text-primary)] hover:bg-[var(--primary-light)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div style={{ height }}>
        <MapContainer
          center={centerPos}
          zoom={3}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredDestinations.map((dest) => (
            <Marker
              key={dest.id}
              position={[dest.lat, dest.lng]}
              icon={createCustomIcon()}
            >
              <Popup className="custom-leaflet-popup">
                <div className="w-64 p-1 space-y-2">
                  <div className="relative rounded-xl overflow-hidden h-28">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ${dest.pricePerDay}/day
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mt-1">
                      <h4 className="font-bold text-sm text-slate-900">{dest.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{dest.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{dest.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSaveDestination(dest.id)}
                    className={`w-full mt-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      dest.isSaved
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    {dest.isSaved ? 'Saved in Itinerary' : 'Save Destination'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
