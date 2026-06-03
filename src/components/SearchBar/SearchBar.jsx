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
    <div style={{ margin: "20px" }}>
      <input className="events-search"
        ref={inputRef}
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
}

export default SearchBar;