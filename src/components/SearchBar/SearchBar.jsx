import { useEffect, useRef } from "react";
import "../../styles/EventsPage.css";
  
function SearchBar({
  searchTerm,
  setSearchTerm
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <span className="search-bar__icon" aria-hidden="true">🔍</span>
        <input
          className="events-search"
          ref={inputRef}
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          aria-label="Search events"
        />
      </div>
    </div>
  );
}

export default SearchBar;
