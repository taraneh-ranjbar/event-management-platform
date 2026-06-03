
import { createPortal }
    from "react-dom";

import "../../styles/DeleteConfirmationModal.css";

function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
}) {

    if (!isOpen) return null;

    return createPortal(

        <div className="modal-overlay">

            <div className="modal-content">

                <h2>
                    Cancel Booking
                </h2>

                <p>
                    Are you sure you want to
                    cancel this booking?
                </p>

                <div className="modal-buttons">

                    <button onClick={onClose}>
                        Cancel
                    </button>

                    <button onClick={onConfirm}>
                        Yes Delete
                    </button>

                </div>

            </div>

        </div>,

        document.getElementById(
            "modal-root"
        )

    );
}

export default DeleteConfirmationModal;