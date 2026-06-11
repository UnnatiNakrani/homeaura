import React from "react";

function FormInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false
}) {
    return (
        <div className="mb-3">

            {label && (
                <label className="form-label">
                    {label}
                    {required && (
                        <span className="text-danger ms-1">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-control ${
                    error ? "is-invalid" : ""
                }`}
            />

            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}

        </div>
    );
}

export default FormInput;