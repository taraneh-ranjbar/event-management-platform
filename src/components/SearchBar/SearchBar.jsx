import {
  useEffect,
  useRef,
  useState,
  useDeferredValue,
} from "react";
import "../../styles/EventsPage.css";

function SearchBar({
  searchTerm,
  setSearchTerm
}) {
  const inputRef = useRef(null);

  const [localValue, setLocalValue] =
    useState(searchTerm);

  const deferredValue =
    useDeferredValue(localValue);

  useEffect(() => {
    setSearchTerm(
      deferredValue
    );
  }, [
    deferredValue,
    setSearchTerm,
  ]);

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <span className="search-bar__icon" aria-hidden="true">🔍</span>
        <input
          className="events-search"
          ref={inputRef}
          type="text"
          placeholder="Search events by title..."
          value={localValue}
          onChange={(e) =>
            setLocalValue(
              e.target.value
            )
          }
          aria-label="Search events"
        />
      </div>
    </div>
  );
}

export default SearchBar;
