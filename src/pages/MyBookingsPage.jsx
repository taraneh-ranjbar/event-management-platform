

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
      <>
        <Navbar />

        <h1>My Bookings</h1>

        <div className="empty-bookings">
          <h2>No Bookings Found</h2>

          <p>
            You haven't booked any events yet.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">
          My Bookings
        </h1>

        <div>

          <label>
            Filter:
          </label>

          <select

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

              <div>

                <h2>
                  No Bookings Found
                </h2>

                <p>
                  No bookings match
                  the selected filter.
                </p>

              </div>

            ) : (


              filteredBookings.map(
                (booking) => (

                  <div key={booking.id} className="booking-card">

                    <h3 className="booking-name">
                      {booking.name}
                    </h3>

                    <p>Event ID: {booking.eventId}</p>

                    <p>Event Name:{" "}
                      {booking.eventName}
                    </p>

                    <p>
                      Event Date: {booking.eventDate}
                    </p>

                    <p>Ticket Type: {booking.ticketType}</p>

                    <p>Ticket Price: ${booking.ticketPrice}</p>

                    <p>Quantity: {booking.quantity}</p>

                    <p>Total: ${booking.total}</p>

                    <p>Email: {booking.email}</p>

                    <p>Phone: {booking.phone}</p>

                    <p>
                      Booking Date: {booking.bookingDate}
                    </p>

                    <p>
                      Reference: {booking.referenceNumber}
                    </p>

                    <p>
                      Status: {booking.status}
                    </p>


                    <button className="delete-btn"
                      onClick={() =>
                        openDeleteModal(
                          booking.id
                        )
                      }
                    >
                      Delete Booking
                    </button>

                  </div>
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

          }}

        />

      </div>

    </>
  );
}

export default MyBookingsPage;