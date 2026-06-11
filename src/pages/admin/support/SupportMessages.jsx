import React, { useState } from "react";

function SupportMessages() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@gmail.com",
            subject: "Product Inquiry",
            message: "I would like more information about your sofa collection.",
            status: "Unread",
            date: "10 Jun 2026"
        },
        {
            id: 2,
            name: "Emma Watson",
            email: "emma@gmail.com",
            subject: "Order Issue",
            message: "My order has not been delivered yet.",
            status: "Read",
            date: "11 Jun 2026"
        }
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);

    const deleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));

        if (selectedMessage?.id === id) {
            setSelectedMessage(null);
        }
    };

    const markAsRead = (id) => {
        setMessages(
            messages.map(msg =>
                msg.id === id
                    ? { ...msg, status: "Read" }
                    : msg
            )
        );
    };

    return (
        <div className="container-fluid">

            <div className="page-header mb-4">
                <h2 className="page-title">
                    Support Messages
                </h2>
            </div>

            <div className="row">

                {/* Messages List */}
                <div className="col-lg-5">

                    <div className="admin-card">

                        <h5 className="mb-3">
                            Inbox
                        </h5>

                        <div className="list-group">

                            {messages.map((msg) => (

                                <button
                                    key={msg.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        markAsRead(msg.id);
                                    }}
                                >
                                    <div className="d-flex justify-content-between">

                                        <strong>
                                            {msg.name}
                                        </strong>

                                        <small>
                                            {msg.date}
                                        </small>

                                    </div>

                                    <div>
                                        {msg.subject}
                                    </div>

                                    <small
                                        className={
                                            msg.status === "Unread"
                                                ? "text-danger"
                                                : "text-success"
                                        }
                                    >
                                        {msg.status}
                                    </small>

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Message Detail */}
                <div className="col-lg-7">

                    <div className="admin-card">

                        {selectedMessage ? (
                            <>
                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h5>
                                        {selectedMessage.subject}
                                    </h5>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteMessage(selectedMessage.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                                <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedMessage.name}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedMessage.email}
                                </p>

                                <hr />

                                <p>
                                    {selectedMessage.message}
                                </p>
                            </>
                        ) : (
                            <div
                                className="text-center text-muted"
                                style={{ padding: "80px 0" }}
                            >
                                Select a message to view details
                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SupportMessages;