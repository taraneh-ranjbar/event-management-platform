
import { createPortal } from "react-dom";

function ConfirmationModal({
  isOpen,
  onClose,
  booking
}) {

  if (!isOpen) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        <h2>
          Booking Confirmed 🎉
        </h2>

        <p>
          Booking created successfully!
        </p>

        <p>
          Reference Number:
          <strong>
            {booking?.referenceNumber}
          </strong>
        </p>

        <p>
          Event:
          <strong>
            {booking?.eventName}
          </strong>
        </p>

        <p>
          Total Amount:
          <strong>
            ${booking?.total}
          </strong>
        </p>

        <button
          onClick={onClose}
        >
          Close
        </button>

        <button
          onClick={() =>
            window.location.href =
            "/my-bookings"
          }
        >
          View My Bookings
        </button>

      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor:
    "rgba(0,0,0,0.5)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center"
};

export default ConfirmationModal;