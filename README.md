<!-- `# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->
```

# TripPilot

**Explore. Plan. Discover.**

TripPilot is a full-stack travel planning application designed to help users organize trips, manage travel budgets, track expenses, explore destinations, and access essential travel information from a single platform. It provides a seamless travel planning experience with an intuitive interface and real-time API integrations.

This repository is split into two main sections:

- **[Frontend](./frontend/README.md)**: The user interface built with React and Vite.
- **[Backend](./backend/README.md)**: RESTful API server built with Node.js and Express.

---

# Key Features

- **User Authentication** – Secure user registration and login using JWT authentication.
- **Trip Management** – Create, update, delete, and organize travel plans.
- **Budget Planner** – Set a trip budget and monitor spending.
- **Expense Tracker** – Track expenses by category throughout the trip.
- **Weather Forecast** – View current weather and forecasts for destinations.
- **Interactive Maps** – Explore destinations using OpenStreetMap with Leaflet.
- **Tourist Places Finder** – Discover nearby attractions, restaurants, hotels, hospitals, and ATMs.
- **Currency Converter** – Convert currencies using real-time exchange rates.
- **Destination Gallery** – View beautiful destination images.
- **Responsive Dashboard** – Visualize trip information, expenses, and budgets through charts and analytics.
- **Saved Places** – Bookmark favorite destinations for future trips.

---

# Technology Stack

The project follows the **MERN** stack with third-party API integrations.

## Frontend

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Bootstrap
- **Maps:** Leaflet & React Leaflet
- **Charts:** Chart.js & React Chartjs 2
- **Icons:** React Icons
- **HTTP Client:** Axios

## Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT
- **Password Encryption:** bcrypt
- **Middleware:** CORS, dotenv, cookie-parser, express-validator

---

# External APIs

TripPilot integrates multiple APIs to provide real-time travel information.

- **OpenWeather API** – Current weather and 5-day forecast
- **Leaflet + OpenStreetMap** – Interactive maps
- **Geoapify Places API** – Tourist attractions, hotels, restaurants, hospitals, and nearby places
- **Unsplash API** – Destination images
- **Frankfurter Currency API** – Currency conversion and exchange rates

---

# Project Structure

```
TripPilot
│
├── frontend
│
└── backend
```

---

# Frontend Features

- Responsive User Interface
- Authentication Pages
- Dashboard
- Trip Planner
- Budget Tracker
- Expense Tracker
- Weather Page
- Currency Converter
- Interactive Maps
- Saved Places
- User Profile

---

# Backend Features

- Authentication APIs
- JWT Authorization
- User Management
- Trip CRUD Operations
- Expense CRUD Operations
- Weather API Integration
- Places API Integration
- Currency API Integration
- Image API Integration
- MongoDB Database Management

---

# Database Collections

### Users

- Name
- Email
- Password

### Trips

- Destination
- Budget
- Start Date
- End Date
- Travelers
- User ID

### Expenses

- Trip ID
- Category
- Amount
- Description
- Date

### Saved Places

- Trip ID
- Place Name
- Latitude
- Longitude
- Image URL

---

# Getting Started

To run the application locally, start both the backend server and frontend development server.

## 1. Clone the Repository

```bash
git clone <repository-url>
cd TripPilot
```

---

## 2. Start the Backend

Navigate to the backend folder.

```bash
cd backend
npm install
npm run dev
```

Ensure your `.env` file contains:

- MongoDB URI
- JWT Secret
- API Keys

---

## 3. Start the Frontend

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

Ensure the frontend `.env` points to your backend API URL.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

OPENWEATHER_API_KEY=

GEOAPIFY_API_KEY=

UNSPLASH_ACCESS_KEY=
```

---

# Future Improvements

- Trip Sharing
- PDF Itinerary Export
- Travel Checklists
- Notifications & Reminders
- Offline Trip Access
- Hotel & Flight Booking Integration
- Multi-language Support
- Email Verification
- Password Reset

---

# Learning Outcomes

By building TripPilot, you will gain hands-on experience with:

- React.js
- Vite
- React Router
- Bootstrap
- Axios
- Express.js
- REST APIs
- JWT Authentication
- MongoDB Atlas
- Mongoose
- CRUD Operations
- Third-party API Integration
- Interactive Maps
- Dashboard Analytics
- Budget Management
- Responsive UI Development
- Full Stack MERN Architecture
- Deployment

---

# Author

**Developed by Aditi Prakash**
