
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/eventService";
import Navbar from "../components/Navbar/Navbar";
import "../styles/EventDetailsPage.css";
import { useQuery } from "@tanstack/react-query";

function EventDetailsPage() {
  const { id } = useParams();

  /*const [event, setEvent] =
    useState(null); */

  /* useEffect(() => {
     const fetchEvent =
       async () => {
         const data =
           await getEventById(id);
 
         setEvent(data);
       };
 
     fetchEvent();
   }, [id]); */

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    staleTime: 1000 * 60 * 5,
  });

  /*if (!event) {
    return (
      <>
        <Navbar />
        <div className="event-details-loading">
          <div className="spinner" role="status" aria-label="Loading" />
          <p className="loading-text">Loading event...</p>
        </div>
      </>
    );
  } */

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="event-details-loading">
          <div
            className="spinner"
            role="status"
            aria-label="Loading"
          />
          <p className="loading-text">
            Loading event...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <h2>
          Failed to load event
        </h2>
      </>
    );
  }

  const firstTicket = event.ticketTypes?.[0];

  return (
    <div className="event-details-page">
      <Navbar />

      <div className="event-details">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/events">Events</Link>
          <span className="breadcrumb__sep">›</span>
          <span>{event.title}</span>
        </nav>

        <div className="event-details__layout">
          <article className="event-details__main">
            <span className="badge event-details__category">
              {event.category}
            </span>

            <h1 className="event-details__title">
              {event.title}
            </h1>

            <p className="event-details__description">
              {event.description}
            </p>

            <h2 className="event-details__section-title">
              Event Information
            </h2>

            <div className="event-details__meta-grid">
              <div className="event-details__meta-item">
                <span className="event-details__meta-label">Date</span>
                <span className="event-details__meta-value">{event.date}</span>
              </div>

              <div className="event-details__meta-item">
                <span className="event-details__meta-label">Time</span>
                <span className="event-details__meta-value">{event.time}</span>
              </div>

              <div className="event-details__meta-item">
                <span className="event-details__meta-label">Location</span>
                <span className="event-details__meta-value">{event.location}</span>
              </div>

              <div className="event-details__meta-item">
                <span className="event-details__meta-label">Organizer</span>
                <span className="event-details__meta-value">{event.organizerName}</span>
              </div>
            </div>
          </article>

          <aside className="event-details__sidebar">
            <h2 className="event-details__sidebar-title">
              Book Tickets
            </h2>

            <div className="event-details__sidebar-row">
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div className="event-details__sidebar-row">
              <span>Time</span>
              <strong>{event.time}</strong>
            </div>

            <div className="event-details__sidebar-row">
              <span>Location</span>
              <strong>{event.location}</strong>
            </div>

            <div className="event-details__price-block">
              <div className="event-details__price">
                ${firstTicket?.price}
              </div>
              <p className="event-details__price-note">
                Starting price
              </p>
            </div>

            {event.ticketTypes?.length > 0 && (
              <div className="event-details__tickets">
                <h3 className="event-details__section-title">
                  Ticket Types
                </h3>
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="event-details__ticket-item"
                  >
                    <span>{ticket.name}</span>
                    <strong>${ticket.price}</strong>
                  </div>
                ))}
              </div>
            )}

            <Link
              to={`/booking/${event.id}`}
              className="btn btn-primary btn-full"
            >
              Book Now
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
