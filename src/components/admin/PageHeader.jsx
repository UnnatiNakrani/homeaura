import React from "react";
import { Link } from "react-router-dom";

function PageHeader({
    title,
    subtitle,
    buttonText,
    buttonLink,
    onButtonClick
}) {
    return (
        <div className="page-header">

            <div>
                <h2 className="page-title mb-1">
                    {title}
                </h2>

                {subtitle && (
                    <p className="page-subtitle mb-0">
                        {subtitle}
                    </p>
                )}
            </div>

            {(buttonText && buttonLink) && (
                <Link
                    to={buttonLink}
                    className="btn btn-admin"
                >
                    {buttonText}
                </Link>
            )}

            {(buttonText && onButtonClick) && (
                <button
                    className="btn btn-admin"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            )}

        </div>
    );
}

export default PageHeader;