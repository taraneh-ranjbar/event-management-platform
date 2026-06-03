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
    <article className="event-card">
      <button
        type="button"
        className="favorite-icon"
        onClick={toggleFavorite}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <Link
        to={`/events/${event.id}`}
        className="event-card__link"
      >
        <div className="event-card__header">
          <h2 className="event-title">
            {event.title}
          </h2>
        </div>

        <span className="badge">{event.category}</span>

        <div className="event-card__meta">
          <p className="event-card__row">
            <span className="event-card__row-icon" aria-hidden="true">📅</span>
            <span><strong>Date:</strong> {event.date}</span>
          </p>

          <p className="event-card__row">
            <span className="event-card__row-icon" aria-hidden="true">📍</span>
            <span><strong>Location:</strong> {event.location}</span>
          </p>
        </div>

        <div className="event-card__footer">
          <div>
            <span className="event-card__price-label">From</span>
            <span className="event-card__price">
              ${firstTicket?.price}
            </span>
          </div>
          <span className="details-btn">View Details</span>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(EventCard);
