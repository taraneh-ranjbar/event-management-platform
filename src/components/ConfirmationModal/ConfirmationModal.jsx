
import { createPortal } from "react-dom";

function ConfirmationModal({
  isOpen,
  onClose,
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
          Thank you for your booking.
        </p>

        <button
          onClick={onClose}
        >
          Close
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