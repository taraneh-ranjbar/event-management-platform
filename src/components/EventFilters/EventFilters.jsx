import "../../styles/EventsPage.css";

function EventFilters({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedSort,
  setSelectedSort
  
}) {
  return (
    <div className="events-toolbar">
      <select  className="events-select"
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Technology">
          Technology
        </option>

        <option value="Music">
          Music
        </option>

        <option value="Sports">
          Sports
        </option>

        <option value="Arts">
          Arts
        </option>
      </select>

      <select className="events-select"
        value={selectedPrice}
        onChange={(e) =>
          setSelectedPrice(
            e.target.value
          )
        }
      >
        <option value="All">
          All Prices
        </option>

        <option value="Free">
          Free
        </option>

        <option value="Under50">
          Under $50
        </option>

        <option value="Over50">
          $50+
        </option>
      </select>

      <select className="events-select"
        value={selectedSort}
        onChange={(e) =>
            setSelectedSort(e.target.value)
        }
        >
        <option value="None">
            Sort By
        </option>

        <option value="DateAsc">
            Date Ascending
        </option>

        <option value="DateDesc">
            Date Descending
        </option>

        <option value="PriceAsc">
            Price Low To High
        </option>

        <option value="PriceDesc">
            Price High To Low
        </option>
        </select>
    </div>
  );
}

export default EventFilters;