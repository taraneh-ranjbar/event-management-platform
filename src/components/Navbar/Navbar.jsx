import {
  Link,
  useLocation
} from "react-router-dom";

import "../../styles/Navbar.css";

import ThemeToggle
  from "../ThemeToggle/ThemeToggle"

function Navbar() {
  const location = useLocation();
  const isEventsActive =
    location.pathname === "/events" ||
    location.pathname === "/";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-logo">
        🎫 Event Manager
      </div>

      <div className="navbar-center">
        <div className="navbar-links">
          <Link
            to="/events"
            className={isEventsActive ? "active-link" : ""}
            aria-current={isEventsActive ? "page" : undefined}
          >
            Events
          </Link>

          <Link
            to="/my-bookings"
            className={
              location.pathname === "/my-bookings"
                ? "active-link"
                : ""
            }
            aria-current={
              location.pathname === "/my-bookings"
                ? "page"
                : undefined
            }
          >
            My Bookings
          </Link>
        </div>
      </div>

      <div className="navbar-actions">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
