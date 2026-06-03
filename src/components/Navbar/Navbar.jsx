import {
  Link,
  useLocation
} from "react-router-dom";

import "../../styles/Navbar.css";

import ThemeToggle
  from "../ThemeToggle/ThemeToggle"

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🎫 Event Manager
      </div>

      <div className="navbar-links">

        <Link
          to="/events"
          className={
            location.pathname === "/events" ||
              location.pathname === "/"
              ? "active-link"
              : ""
          }
        >
          Events
        </Link>

        {" | "}

        <Link
          to="/my-bookings"
          className={
            location.pathname === "/my-bookings"
              ? "active-link"
              : ""
          }
        >
          My Bookings
        </Link>

        {" | "}
      </div>

      <ThemeToggle />
    </nav>
  );
}

export default Navbar;