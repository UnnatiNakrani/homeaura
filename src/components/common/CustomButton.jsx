import React from "react";
import { Link } from "react-router-dom";

function CustomButton({
    to,
    title,
    className = "",
    onClick,
    type = "button",
}) {

    if (to) {
        return (
            <Link to={to} className={className}>
                {title}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default CustomButton;