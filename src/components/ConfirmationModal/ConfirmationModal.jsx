
import { createPortal } from "react-dom";

function ConfirmationModal({
  isOpen,
  onClose,
  booking
}) {

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div className="modal-panel">
        <div
          className="modal-panel__icon modal-panel__icon--success"
          aria-hidden="true"
        >
          ✓
        </div>

        <h2
          id="confirmation-modal-title"
          className="modal-panel__title"
        >
          Booking Confirmed 🎉
        </h2>

        <p className="modal-panel__text">
          Booking created successfully!
        </p>

        <div className="modal-panel__details">
          <div className="modal-panel__row">
            <span>Reference</span>
            <strong className="modal-panel__ref">
              {booking?.referenceNumber}
            </strong>
          </div>

          <div className="modal-panel__row">
            <span>Event</span>
            <strong>{booking?.eventName}</strong>
          </div>

          <div className="modal-panel__row">
            <span>Total Amount</span>
            <strong>${booking?.total}</strong>
          </div>
        </div>

        <div className="modal-panel__actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              window.location.href =
              "/my-bookings"
            }
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ConfirmationModal;
