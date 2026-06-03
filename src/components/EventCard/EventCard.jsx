import React, { useState } from "react";

import { Link } from "react-router-dom";

import "../../styles/EventCard.css";


function EventCard({ event }) {
  const [favorite, setFavorite] = useState(() => {

    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    return savedFavorites.includes(event.id);

  });

  const toggleFavorite = (e) => {

    e.preventDefault();
    e.stopPropagation();

    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    let updatedFavorites;

    if (favorite) {

      updatedFavorites =
        savedFavorites.filter(
          (id) => id !== event.id
        );

    } else {

      updatedFavorites = [
        ...savedFavorites,
        event.id
      ];

    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorite(!favorite);
  };

  const firstTicket =
    event.ticketTypes?.[0];

  return (
    <div className="event-card">
      <Link to={`/events/${event.id}`}>


        <h2 className="event-title">
          {event.title}

          <span className="favorite-icon"
            onClick={toggleFavorite}
          >
            {favorite ? "❤️" : "🤍"}
          </span>
        </h2>

        <p>🏷 <strong>Category:</strong>{" "} {event.category}</p>

        <p>📅 <strong>Date:</strong>{" "} {event.date}</p>

        <p>📍 <strong>Location:</strong>{" "} {event.location}</p>

        <p>💰 <strong>Price:</strong>{" "} ${firstTicket?.price}</p>

        <button className="details-btn">
          View Details
        </button>

        
        {/*   <p>
          <strong>Category:</strong>{" "}
          {event.category}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {event.date}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {event.location}
        </p>

        <p>
          <strong>Price:</strong> $
          {firstTicket?.price}
        </p> */}
      </Link>
    </div>

  );
}

export default React.memo(EventCard);