import React, { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

const INITIAL_TRIPS = [
  {
    id: 'trip-1',
    title: 'Kyoto & Tokyo Cherry Blossom',
    destination: 'Japan',
    city: 'Kyoto',
    startDate: '2026-04-10',
    endDate: '2026-04-20',
    budget: 3200,
    spent: 1850,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    category: 'Culture & Nature',
    status: 'Upcoming',
    daysLeft: 12,
    itinerary: [
      { day: 1, title: 'Arrival in Tokyo & Shinjuku Neon Night Walk', details: 'Check in at Hotel Gracery Shinjuku. Explore Omoide Yokocho.' },
      { day: 2, title: 'Senso-ji Temple & Akihabara Exploration', details: 'Morning visit to Asakusa, afternoon in Tech Town.' },
      { day: 3, title: 'Bullet Train to Kyoto & Fushimi Inari Sunset', details: 'Shinkansen ride (2.5 hrs). Hike through Torii gates.' },
      { day: 4, title: 'Arashiyama Bamboo Grove & Monkey Park', details: 'Early morning walk through bamboo forest.' }
    ]
  },
  {
    id: 'trip-2',
    title: 'Amalfi Coast Luxury Getaway',
    destination: 'Italy',
    city: 'Positano',
    startDate: '2026-06-01',
    endDate: '2026-06-08',
    budget: 4500,
    spent: 4100,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    category: 'Beach & Coastal',
    status: 'Upcoming',
    daysLeft: 64,
    itinerary: [
      { day: 1, title: 'Arrival in Naples & Private Transfer to Positano', details: 'Check into Cliffside Villa.' },
      { day: 2, title: 'Capri Island Private Boat Excursion', details: 'Visit Blue Grotto and Faraglioni Rocks.' }
    ]
  },
  {
    id: 'trip-3',
    title: 'Swiss Alps Hiking Trail',
    destination: 'Switzerland',
    city: 'Zermatt',
    startDate: '2026-08-15',
    endDate: '2026-08-22',
    budget: 2800,
    spent: 890,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1000&auto=format&fit=crop',
    category: 'Adventure',
    status: 'Upcoming',
    daysLeft: 139,
    itinerary: [
      { day: 1, title: 'Zermatt Village & Matterhorn Glacier Paradise', details: 'Cable car ride to Europe highest station.' }
    ]
  }
];

const INITIAL_EXPENSES = [
  { id: 'exp-1', tripId: 'trip-1', title: 'Roundtrip Flights (SFO -> NRT)', category: 'Flights', amount: 920, date: '2026-03-01' },
  { id: 'exp-2', tripId: 'trip-1', title: 'Kyoto Ryokan 4 Nights', category: 'Hotels', amount: 540, date: '2026-03-10' },
  { id: 'exp-3', tripId: 'trip-1', title: 'JR Rail Pass 7-Day', category: 'Transport', amount: 230, date: '2026-03-15' },
  { id: 'exp-4', tripId: 'trip-1', title: 'Michelin Ramen & Tea Ceremony', category: 'Food', amount: 160, date: '2026-03-20' },
  { id: 'exp-5', tripId: 'trip-2', title: 'Positano Villa Booking', category: 'Hotels', amount: 2800, date: '2026-02-14' },
  { id: 'exp-6', tripId: 'trip-2', title: 'Capri Yacht Charter', category: 'Activities', amount: 1300, date: '2026-02-28' },
  { id: 'exp-7', tripId: 'trip-3', title: 'Swiss Rail Pass & Gear Rental', category: 'Transport', amount: 890, date: '2026-03-05' }
];

const INITIAL_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Kyoto, Japan',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1240,
    pricePerDay: 180,
    badge: 'Popular',
    tag: 'Temples & Gardens',
    lat: 35.0116,
    lng: 135.7681,
    description: 'Serene bamboo forests, centuries-old shrines, and exquisite tea houses.',
    isSaved: true
  },
  {
    id: 'dest-2',
    name: 'Santorini, Greece',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop',
    rating: 4.95,
    reviews: 2180,
    pricePerDay: 260,
    badge: 'Trending',
    tag: 'Island & Caldera',
    lat: 36.3932,
    lng: 25.4615,
    description: 'Iconic whitewashed buildings overlooking the deep blue Aegean Sea.',
    isSaved: true
  },
  {
    id: 'dest-3',
    name: 'Banff National Park, Canada',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop',
    rating: 4.88,
    reviews: 980,
    pricePerDay: 210,
    badge: 'Hidden Gem',
    tag: 'Glacier Lakes & Peaks',
    lat: 51.4968,
    lng: -115.9281,
    description: 'Vibrant turquoise waters of Lake Louise surrounded by majestic Rockies.',
    isSaved: true
  },
  {
    id: 'dest-4',
    name: 'Reykjavik & Southern Lights, Iceland',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1000&auto=format&fit=crop',
    rating: 4.92,
    reviews: 1450,
    pricePerDay: 290,
    badge: 'Trending',
    tag: 'Aurora & Geysers',
    lat: 64.1466,
    lng: -21.9426,
    description: 'Dramatic landscapes of geothermal springs, waterfalls, and northern lights.',
    isSaved: false
  },
  {
    id: 'dest-5',
    name: 'Amalfi Coast, Italy',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    rating: 4.91,
    reviews: 1890,
    pricePerDay: 320,
    badge: 'Popular',
    tag: 'Coastal Luxury',
    lat: 40.6333,
    lng: 14.6003,
    description: 'Vertical cliffside towns clinging to the Tyrrhenian sea coast.',
    isSaved: true
  },
  {
    id: 'dest-6',
    name: 'Swiss Alps, Zermatt',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1000&auto=format&fit=crop',
    rating: 4.97,
    reviews: 1120,
    pricePerDay: 340,
    badge: 'Popular',
    tag: 'Matterhorn Views',
    lat: 45.9765,
    lng: 7.7491,
    description: 'World-class skiing, mountain hiking trails, and Alpine luxury.',
    isSaved: false
  }
];

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('trippilot_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('trippilot_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('trippilot_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('trippilot_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Rivera',
      email: 'alex.rivera@trippilot.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  useEffect(() => {
    localStorage.setItem('trippilot_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('trippilot_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('trippilot_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('trippilot_user', JSON.stringify(user));
  }, [user]);

  // Trip CRUD
  const addTrip = (newTrip) => {
    const created = {
      ...newTrip,
      id: `trip-${Date.now()}`,
      spent: 0,
      daysLeft: Math.max(1, Math.ceil((new Date(newTrip.startDate) - new Date()) / (1000 * 60 * 60 * 24))),
      status: 'Upcoming',
      image: newTrip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop',
      itinerary: newTrip.itinerary || []
    };
    setTrips((prev) => [created, ...prev]);
  };

  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    setExpenses((prev) => prev.filter((e) => e.tripId !== id));
  };

  // Expense CRUD
  const addExpense = (expense) => {
    const created = { ...expense, id: `exp-${Date.now()}` };
    setExpenses((prev) => [created, ...prev]);

    // Recalculate trip total spent
    if (expense.tripId) {
      setTrips((prev) =>
        prev.map((trip) => {
          if (trip.id === expense.tripId) {
            return { ...trip, spent: trip.spent + Number(expense.amount) };
          }
          return trip;
        })
      );
    }
  };

  const deleteExpense = (id) => {
    const target = expenses.find((e) => e.id === id);
    if (target && target.tripId) {
      setTrips((prev) =>
        prev.map((trip) => {
          if (trip.id === target.tripId) {
            return { ...trip, spent: Math.max(0, trip.spent - target.amount) };
          }
          return trip;
        })
      );
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Saved Destinations
  const toggleSaveDestination = (id) => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, isSaved: !dest.isSaved } : dest))
    );
  };

  // Login / Logout
  const loginUser = (email, name) => {
    setUser({
      name: name || 'Alex Rivera',
      email: email || 'alex.rivera@trippilot.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser({ name: '', email: '', avatar: '', isLoggedIn: false });
  };

  // Calculated Metrics
  const totalBudget = trips.reduce((acc, t) => acc + (t.budget || 0), 0);
  const totalSpent = trips.reduce((acc, t) => acc + (t.spent || 0), 0);
  const budgetRatio = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <TripContext.Provider
      value={{
        trips,
        expenses,
        destinations,
        user,
        isAuthModalOpen,
        authModalTab,
        totalBudget,
        totalSpent,
        budgetRatio,
        setIsAuthModalOpen,
        setAuthModalTab,
        addTrip,
        deleteTrip,
        addExpense,
        deleteExpense,
        toggleSaveDestination,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
