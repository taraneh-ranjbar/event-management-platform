
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

        <div
            className="modal-overlay delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >

            <div className="modal-panel">

                <div
                    className="modal-panel__icon modal-panel__icon--warning"
                    aria-hidden="true"
                >
                    ⚠
                </div>

                <h2
                    id="delete-modal-title"
                    className="modal-panel__title"
                >
                    Cancel Booking
                </h2>

                <p className="modal-panel__text">
                    Are you sure you want to
                    cancel this booking? This action cannot be undone.
                </p>

                <div className="modal-panel__actions">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Keep Booking
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Yes, Delete
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
