import React from "react";

function ConfirmModal({
    id = "confirmModal",
    title = "Confirm Action",
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
}) {
    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {title}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <p className="mb-0">
                            {message}
                        </p>
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            {cancelText}
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;