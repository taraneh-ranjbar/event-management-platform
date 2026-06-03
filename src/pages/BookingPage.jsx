import { useReducer, useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

import { getEventById } from "../services/eventService";

import {
  bookingReducer,
  initialState,
} from "../reducers/bookingReducer";

import { useParams } from "react-router-dom";

import ConfirmationModal
  from "../components/ConfirmationModal/ConfirmationModal";

import {
  BookingContext,
} from "../context/BookingContext";

import { useContext, } from "react";


function BookingPage() {

  const { id } = useParams();


  const [state, dispatch] =
    useReducer(
      bookingReducer,
      initialState
    );

  const [
    confirmedBooking,
    setConfirmedBooking
  ] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { bookings, setBookings } = useContext(BookingContext);
  const [ticketPrice, setTicketPrice] = useState(99);
  const [event, setEvent] = useState(null);


  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error(error);
      }
    };

    loadEvent();
  }, [id]);

  if (!event) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }


  const handleBooking = () => {

    if (!validateForm()) {
      return;
    }

    const newBooking = {
      id: Date.now(),
      referenceNumber: "BK-" + Date.now(),
      status: "Confirmed",
      eventId: id,
      eventName: event?.title,
      eventDate: event.date,
      name,
      email,
      phone,
      bookingDate: new Date().toLocaleDateString(),
      quantity: state.quantity,

      ticketType:
        ticketPrice === 99
          ? "General"
          : "VIP",

      ticketPrice,
      total:
        state.quantity *
        ticketPrice,
    };

    setConfirmedBooking(
      newBooking
    );

    setBookings([
      ...bookings,
      newBooking,
    ]);

    setShowModal(true);
  };

  const validateForm = () => {

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name =
        "Name is required";
    }
    else if (
      !/^[A-Za-z ]+$/.test(name)
    ) {
      newErrors.name =
        "English letters only";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Phone number must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Navbar />

      <h1>Booking Page</h1>

      <select
        value={ticketPrice}
        onChange={(e) =>
          setTicketPrice(
            Number(e.target.value)
          )
        }
      >
        <option value="99">
          General - $99
        </option>

        <option value="299">
          VIP - $299
        </option>
      </select>

      <h2>
        Quantity: {state.quantity}
      </h2>

      <h2>
        Total: $
        {state.quantity *
          ticketPrice}
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />
      {errors.name && (
        <p style={{ color: "red" }}>
          {errors.name}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />
      {errors.email && (
        <p style={{ color: "red" }}>
          {errors.email}
        </p>
      )}

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />
      {errors.phone && (
        <p style={{ color: "red" }}>
          {errors.phone}
        </p>
      )}

      <button
        onClick={() =>
          dispatch({
            type: "INCREASE_QUANTITY",
          })
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "DECREASE_QUANTITY",
          })
        }
      >
        -
      </button>

      <button
        onClick={handleBooking}
        disabled={!event}
      >
        Confirm Booking
      </button>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        booking={
          confirmedBooking
        }
      />
    </>
  );
}

export default BookingPage;