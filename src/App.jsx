import { BrowserRouter, Routes, Route } from "react-router-dom";

import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsPage />} />

        <Route
          path="/events"
          element={<EventsPage />}
        />

        <Route
          path="/events/:id"
          element={<EventDetailsPage />}
        />

        <Route
          path="/booking/:id"
          element={<BookingPage />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookingsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;