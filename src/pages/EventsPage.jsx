import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import { getAllEvents } from "../services/eventService";

import EventCard from "../components/EventCard/EventCard";

import SearchBar from "../components/SearchBar/SearchBar";

import EventFilters from "../components/EventFilters/EventFilters";

import "../styles/EventsPage.css";

function EventsPage() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPrice, setSelectedPrice] =
    useState("All");

  const [selectedSort, setSelectedSort] =
    useState("None");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);



  if (loading) {
    return <LoadingSpinner />;
  }
  console.log("events ------>>> : ", events);
  const filteredEvents = events.filter(
    (event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        event.category ===
        selectedCategory;

      const price =
        event.ticketTypes[0].price;

      const matchesPrice =
        selectedPrice === "All" ||
        (selectedPrice === "Free" &&
          price === 0) ||
        (selectedPrice === "Under50" &&
          price < 50) ||
        (selectedPrice === "Over50" &&
          price >= 50);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    }
  );

  const sortedEvents = [...filteredEvents];
  if (selectedSort === "DateAsc") {
    sortedEvents.sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );
  }

  if (selectedSort === "DateDesc") {
    sortedEvents.sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );
  }

  if (selectedSort === "PriceAsc") {
    sortedEvents.sort(
      (a, b) =>
        a.ticketTypes[0].price -
        b.ticketTypes[0].price
    );
  }

  if (selectedSort === "PriceDesc") {
    sortedEvents.sort(
      (a, b) =>
        b.ticketTypes[0].price -
        a.ticketTypes[0].price
    );
  }

  return (
    <>
      <div className="events-page">
        <Navbar />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <EventFilters
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
          selectedPrice={selectedPrice}
          setSelectedPrice={
            setSelectedPrice
          }
          selectedSort={selectedSort}
          setSelectedSort={
            setSelectedSort
          }
        />
        <h1 className="events-title">Events Page</h1>


        <div className="events-count">
          Total Events: {filteredEvents.length}
        </div>

        <div className="events-grid">
          {
            filteredEvents.length === 0 ? (
              <h2>No Events Found</h2>
            ) : (
              sortedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))
            )}
        </div>
      </div>


    </>
  );

}

export default EventsPage;