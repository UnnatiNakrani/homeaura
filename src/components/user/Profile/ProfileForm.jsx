import React from "react";

function ProfileForm({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleImageChange,
    buttonText = "Update Profile",
}) {
    return (
        <form onSubmit={handleSubmit}>

            <div
                className="shadow-sm p-5 bg-white rounded-4"
                style={{
                    border: "1px solid #eff2f1",
                }}
            >
                <div className="mb-5 text-center">

                    <h2
                        style={{
                            color: "#2f2f2f",
                            fontWeight: "700"
                        }}
                    >
                        My Profile
                    </h2>

                    <p className="text-muted">
                        Manage your personal information
                    </p>

                    <h4 className="mb-0">Edit Profile</h4>
                </div>

                <div className="card-body">

                    {/* Profile Image */}
                    <div className="text-center mb-4">

                        <img
                            src={
                                values.imagePreview ||
                                values.image ||
                                "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(values.name || "User")
                            }
                            alt="Profile"
                            className="rounded-circle border mb-3"
                            width="140"
                            height="140"
                            style={{ objectFit: "cover" }}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageChange}
                        />

                    </div>

                    <div className="row">

                        {/* Name */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                                    }`}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <div className="invalid-feedback">
                                {errors.name}
                            </div>

                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={values.email}
                                disabled
                            />

                        </div>

                        {/* Mobile */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Mobile
                            </label>

                            <input
                                type="text"
                                name="mobile"
                                className={`form-control ${touched.mobile && errors.mobile ? "is-invalid" : ""
                                    }`}
                                value={values.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <div className="invalid-feedback">
                                {errors.mobile}
                            </div>

                        </div>

                        {/* Gender */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Gender
                            </label>

                            <select
                                name="gender"
                                className="form-select"
                                value={values.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>

                        </div>

                        {/* DOB */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dob"
                                className="form-control"
                                value={values.dob}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Country */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                className="form-control"
                                value={values.country}
                                onChange={handleChange}
                            />

                        </div>

                        {/* State */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={values.state}
                                onChange={handleChange}
                            />

                        </div>

                        {/* City */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                className="form-control"
                                value={values.city}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Pincode */}
                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-bold">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                className="form-control"
                                value={values.pincode}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Address */}
                        <div className="col-12 mb-3">

                            <label className="form-label fw-bold">
                                Address
                            </label>

                            <textarea
                                rows="4"
                                name="address"
                                className="form-control"
                                value={values.address}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                <div className="card-footer text-end">

                    <button
                        type="submit"
                        className="btn btn-dark px-4"
                    >
                        {buttonText}
                    </button>

                </div>

            </div>

        </form>
    );
}

export default ProfileForm;