

import Navbar
  from "../components/Navbar/Navbar";

import {
  useContext,
} from "react";

import {
  BookingContext,
} from "../context/BookingContext";

import { useState } from "react";

import DeleteConfirmationModal
  from "../components/DeleteConfirmationModal/DeleteConfirmationModal";

import "../styles/MyBookingsPage.css";

function MyBookingsPage() {

  const { bookings, deleteBooking } =
    useContext(
      BookingContext
    );

  const [
    showDeleteModal,
    setShowDeleteModal
  ] = useState(false);

  const [
    selectedBookingId,
    setSelectedBookingId
  ] = useState(null);

  const openDeleteModal =
    (id) => {

      setSelectedBookingId(id);

      setShowDeleteModal(true);

    };

  const [filterType, setFilterType] =
    useState("all");

  const [
    successMessage,
    setSuccessMessage
  ] = useState("");

  const filteredBookings =
    bookings.filter(
      (booking) => {

        if (
          filterType === "all"
        ) {
          return true;
        }

        const today =
          new Date();

        const eventDate =
          new Date(
            booking.eventDate
          );

        if (
          filterType === "upcoming"
        ) {

          return (
            eventDate >= today
          );

        }

        if (
          filterType === "past"
        ) {

          return (
            eventDate < today
          );

        }

        return true;

      }
    );

  if (bookings.length === 0) {
    return (
      <div className="my-bookings-page">
        <Navbar />

        <div className="empty-bookings">
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">📋</div>
            <h1 className="empty-state__title">My Bookings</h1>
            <h2>No Bookings Found</h2>
            <p className="empty-state__text">
              You haven&apos;t booked any events yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <Navbar />

      <div className="page-container">
        {
          successMessage && (

            <div
              className="success-message"
              role="status"
            >
              {successMessage}
            </div>

          )
        }

        <header className="my-bookings-header">
          <h1 className="page-title">
            My Bookings
          </h1>
        </header>

        <div className="my-bookings-filter">
          <label className="my-bookings-filter__label" htmlFor="booking-filter">
            Filter:
          </label>

          <select
            id="booking-filter"
            className="form-select"
            value={
              filterType
            }
            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }
          >

            <option value="all">
              All Bookings
            </option>

            <option value="upcoming">
              Upcoming Events
            </option>

            <option value="past">
              Past Events
            </option>

          </select>

        </div>


        <div className="bookings-grid">

          {

            filteredBookings.length === 0 ? (

              <div className="empty-state">
                <div className="empty-state__icon" aria-hidden="true">🔍</div>
                <h2 className="empty-state__title">
                  No Bookings Found
                </h2>

                <p className="empty-state__text">
                  No bookings match
                  the selected filter.
                </p>

              </div>

            ) : (


              filteredBookings.map(
                (booking) => (

                  <article key={booking.id} className="booking-card">

                    <div className="booking-card__header">
                      <h3 className="booking-name">
                        {booking.name}
                      </h3>
                      <span className="badge badge--success">
                        {booking.status}
                      </span>
                    </div>

                    <div className="booking-card__body">
                      <div className="booking-card__field">
                        <span className="booking-card__label">Event ID</span>
                        <span className="booking-card__value">{booking.eventId}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Event</span>
                        <span className="booking-card__value">{booking.eventName}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Event Date</span>
                        <span className="booking-card__value">{booking.eventDate}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Ticket Type</span>
                        <span className="booking-card__value">{booking.ticketType}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Quantity</span>
                        <span className="booking-card__value">{booking.quantity}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Ticket Price</span>
                        <span className="booking-card__value">${booking.ticketPrice}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Total</span>
                        <span className="booking-card__value booking-card__value--price">
                          ${booking.total}
                        </span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Email</span>
                        <span className="booking-card__value">{booking.email}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Phone</span>
                        <span className="booking-card__value">{booking.phone}</span>
                      </div>

                      <div className="booking-card__field">
                        <span className="booking-card__label">Booking Date</span>
                        <span className="booking-card__value">{booking.bookingDate}</span>
                      </div>

                      <div className="booking-card__field booking-card__field--full">
                        <span className="booking-card__label">Reference</span>
                        <span className="booking-card__value booking-card__value--mono">
                          {booking.referenceNumber}
                        </span>
                      </div>
                    </div>

                    <div className="booking-card__footer">
                      <button
                        type="button"
                        className="btn btn-outline-danger delete-btn"
                        onClick={() =>
                          openDeleteModal(
                            booking.id
                          )
                        }
                      >
                        Delete Booking
                      </button>
                    </div>

                  </article>
                )
              ))}
        </div>

        <DeleteConfirmationModal

          isOpen={
            showDeleteModal
          }

          onClose={() =>
            setShowDeleteModal(
              false
            )
          }

          onConfirm={() => {

            deleteBooking(
              selectedBookingId
            );

            setShowDeleteModal(
              false
            );

            setSuccessMessage(
              "Booking cancelled successfully."
            );

            setTimeout(() => {

              setSuccessMessage("");

            }, 3000);

          }}

        />

      </div>

    </div>
  );
}

export default MyBookingsPage;
