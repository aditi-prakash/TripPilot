import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import CreateTrip from "../pages/CreateTrip";
import TripDetails from "../pages/TripDetails";
import Budget from "../pages/Budget";
import Expenses from "../pages/Expenses";
import Weather from "../pages/Weather";
import Currency from "../pages/Currency";
import SavedPlaces from "../pages/SavedPlaces";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="/trip/:id" element={<TripDetails />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/saved-places" element={<SavedPlaces />} />
      <Route path="/profile" element={<Profile />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;