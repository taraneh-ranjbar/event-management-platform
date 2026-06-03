import { Link } from "react-router-dom";

import "../../styles/Navbar.css";

import ThemeToggle
from "../ThemeToggle/ThemeToggle"

function Navbar() {
  return (
    <nav className="navbar">
       <div className="navbar-logo">
    🎫 Event Manager
  </div>

   <div className="navbar-links">
      <Link to="/events">Events</Link>

      {" | "}

      <Link to="/my-bookings">
        My Bookings
      </Link>

      {" | "}
      </div>

      <ThemeToggle />
    </nav>
  );
}

export default Navbar;