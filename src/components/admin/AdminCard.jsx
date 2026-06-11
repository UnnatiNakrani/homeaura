import React from "react";

function AdminCard({
    title,
    value,
    icon,
    color = "#3b5d50",
    subtitle
}) {
    return (
        <div className="admin-card stats-card h-100">
            <div className="d-flex justify-content-between align-items-start">

                <div>
                    <p
                        className="mb-2 text-muted"
                        style={{
                            fontSize: "14px",
                            fontWeight: "500"
                        }}
                    >
                        {title}
                    </p>

                    <h3
                        className="mb-1 fw-bold"
                        style={{
                            color: "#2f2f2f"
                        }}
                    >
                        {value}
                    </h3>

                    {subtitle && (
                        <small className="text-success">
                            {subtitle}
                        </small>
                    )}
                </div>

                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "12px",
                        backgroundColor: `${color}15`
                    }}
                >
                    <i
                        className={`bi ${icon}`}
                        style={{
                            fontSize: "1.5rem",
                            color
                        }}
                    ></i>
                </div>

            </div>
        </div>
    );
}

export default AdminCard;