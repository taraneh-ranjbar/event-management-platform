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

import "../styles/BookingPage.css";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createBookingApi,
} from "../services/bookingService";


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

  const queryClient =
    useQueryClient();

  const createBookingMutation =
    useMutation({
      mutationFn:
        createBookingApi,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });

      },
    });

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
        <Navbar />
        <div className="booking-loading">
          <div className="spinner" role="status" aria-label="Loading" />
          <p className="loading-text">Loading booking...</p>
        </div>
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

    createBookingMutation.mutate(
      newBooking
    );
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
    <div className="booking-page">
      <Navbar />

      <div className="booking-page__inner">
        <header className="booking-page__header">
          <span className="booking-page__event-chip">
            {event.title}
          </span>
          <h1 className="page-title">Complete Your Booking</h1>
        </header>

        <div className="booking-steps" aria-hidden="true">
          <span className="booking-step booking-step--active">
            <span className="booking-step__dot" />
            Tickets
          </span>
          <span className="booking-step__sep">—</span>
          <span className="booking-step booking-step--active">
            <span className="booking-step__dot" />
            Details
          </span>
          <span className="booking-step__sep">—</span>
          <span className="booking-step">
            <span className="booking-step__dot" />
            Confirm
          </span>
        </div>

        <section className="booking-card">
          <h2 className="booking-card__title">Ticket Selection</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="ticket-type">
              Ticket Type
            </label>
            <select
              id="ticket-type"
              className="form-select"
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
          </div>

          <div className="booking-quantity-row">
            <span className="booking-quantity-row__label">
              Quantity: {state.quantity}
            </span>
            <div className="quantity-stepper">
              <button
                type="button"
                className="btn btn-gold-outline btn-icon"
                onClick={() =>
                  dispatch({
                    type: "DECREASE_QUANTITY",
                  })
                }
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-stepper__value">
                {state.quantity}
              </span>
              <button
                type="button"
                className="btn btn-gold-outline btn-icon"
                onClick={() =>
                  dispatch({
                    type: "INCREASE_QUANTITY",
                  })
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="booking-summary">
            <span className="booking-summary__label">Total Amount</span>
            <span className="booking-summary__total">
              ${state.quantity * ticketPrice}
            </span>
          </div>
        </section>

        <section className="booking-card">
          <h2 className="booking-card__title">Attendee Details</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="booking-name">
              Full Name
            </label>
            <input
              id="booking-name"
              className="form-input"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
            {errors.name && (
              <p className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="booking-email">
              Email
            </label>
            <input
              id="booking-email"
              className="form-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
            {errors.email && (
              <p className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="booking-phone">
              Phone
            </label>
            <input
              id="booking-phone"
              className="form-input"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
            {errors.phone && (
              <p className="field-error">
                {errors.phone}
              </p>
            )}
          </div>
        </section>

        <div className="booking-actions">
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={handleBooking}
            disabled={!event}
          >
            Confirm Booking
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
        booking={
          confirmedBooking
        }
      />
    </div>
  );
}

export default BookingPage;
