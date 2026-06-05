# Event Manager

A modern Event Management Platform built with React that allows users to discover events, book tickets, manage reservations, and personalize their experience with Light/Dark themes.

---

## Project Overview

This application was developed as part of a Front-End Development assessment project.

Users can:

- Browse available events
- Search and filter events
- View detailed event information
- Book event tickets
- Manage bookings
- Cancel bookings
- Favorite events
- Switch between Light and Dark themes

---

## Features

### Events Listing & Discovery

- Card-based event layout
- Event title, date, location, category, and price displayed
- Search events by title
- Filter by category
- Filter by price range
- Sort by date
- Sort by price
- Favorite / Like events
- Persistent favorites using Local Storage

### Event Details

- Complete event information
- Description
- Date & time
- Location
- Organizer information
- Available ticket types
- Ticket pricing
- Book Tickets button

---

## Ticket Booking

### Step 1 – Select Tickets

- Choose ticket type
- Select quantity
- Real-time price calculation
- Automatic total amount calculation

### Step 2 – Attendee Details

- Name validation
- Email validation
- Phone validation
- Error messages for invalid inputs

### Step 3 – Confirmation

- Booking summary
- Booking reference number
- Booking status
- View My Bookings option

### Booking Features

- Multi-step booking flow
- Step progress indicator
- Back navigation support
- Validation before moving to next step

---

## My Bookings

- View all bookings
- Booking reference number
- Event name
- Event date
- Number of tickets
- Total amount
- Booking status
- Upcoming / Past filter
- Cancel booking functionality
- Confirmation modal before cancellation

---

## Theme System

- Light Mode
- Dark Mode
- Theme toggle in navigation
- Theme preference persistence
- Local Storage support

---

## Data Persistence

The application uses Local Storage for:

- Bookings
- Favorite Events
- Theme Preferences

Data remains available after page refresh and browser restart.

---

## React Concepts Demonstrated

- useState
- useEffect
- useContext
- useReducer
- useRef
- Context API
- React Router
- Conditional Rendering
- List Rendering
- Form Handling
- Form Validation
- Event Handling
- React Portals
- Local Storage Persistence

---

## Technologies Used

- React
- Vite
- React Router DOM
- JavaScript (ES6+)
- Context API
- CSS3
- Local Storage API

---

## Responsive Design

The application is designed to work on:

- Desktop
- Tablet
- Mobile Devices

Responsive layouts include:

- 3-column desktop grid
- 2-column tablet grid
- 1-column mobile grid

---

## Project Structure

```text
src
├── components
│   ├── EventCard
│   ├── Navbar
│   ├── ThemeToggle
│   ├── DeleteConfirmationModal
│   └── ...
│
├── context
│   ├── BookingContext
│   └── ThemeContext
│
├── pages
│   ├── EventsPage
│   ├── EventDetailsPage
│   ├── BookingPage
│   └── MyBookingsPage
│
├── services
│   └── eventService
│
├── styles
│   └── CSS files
│
└── App.jsx
```

---

##️ Installation

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Learning Objectives

This project demonstrates:

- React Component Architecture
- State Management
- Context API
- Theme Management
- Booking Flow Management
- Form Validation
- Responsive UI Design
- Local Storage Persistence
- Modern Front-End Development Practices

---

## Author

Sara Ranjbar

Front-End Development Program

Humber College
