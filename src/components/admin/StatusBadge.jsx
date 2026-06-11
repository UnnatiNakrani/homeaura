import React from "react";

function StatusBadge({ status }) {
    const getStatusClass = () => {
        switch (status?.toLowerCase()) {
            case "active":
            case "published":
            case "delivered":
            case "completed":
            case "read":
            case "success":
                return "status-success";

            case "pending":
            case "processing":
            case "draft":
                return "status-warning";

            case "inactive":
            case "cancelled":
            case "rejected":
            case "unread":
            case "failed":
            case "out of stock":
                return "status-danger";

            default:
                return "status-secondary";
        }
    };

    return (
        <span className={`status ${getStatusClass()}`}>
            {status}
        </span>
    );
}

export default StatusBadge;