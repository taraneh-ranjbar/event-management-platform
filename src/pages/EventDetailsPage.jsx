import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";
import { Link } from "react-router-dom";

function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] =
    useState(null);

  useEffect(() => {
    const fetchEvent =
      async () => {
        const data =
          await getEventById(id);

        setEvent(data);
      };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>{event.title}</h1>

      <p>
        <strong>
          Category:
        </strong>{" "}
        {event.category}
      </p>

      <p>
        <strong>
          Description:
        </strong>{" "}
        {event.description}
      </p>

      <p>
        <strong>
          Date:
        </strong>{" "}
        {event.date}
      </p>

      <p>
        <strong>
          Time:
        </strong>{" "}
        {event.time}
      </p>

      <p>
        <strong>
          Location:
        </strong>{" "}
        {event.location}
      </p>

      <p>
        <strong>
          Organizer:
        </strong>{" "}
        {event.organizerName}
      </p>
      <Link to={`/booking/${event.id}`}>
        <button>
          Book Now
        </button>
      </Link>
    </>
  );
}

export default EventDetailsPage;