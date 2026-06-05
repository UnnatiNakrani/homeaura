import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

function Register(props) {

    const [user, setUser] = useState([]);

    const validationSchema = Yup.object({
        fname: Yup.string().min(2, "Minimum 2 characters").required("First name is required"),
        lname: Yup.string().min(2, "Minimum 2 characters").required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
        password: Yup.string().min(5, "Minimum 5 characters").required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required")
    });

    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            address: "",
            password: "",
            confirmpassword: ""
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const newuser = {
                ...values,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
                isDeleted: false
            };
            setUser([...user, newuser]);
            resetForm();
            console.log(newuser);
        }

    })

    const { handleSubmit, handleChange, values, errors } = formik;

    return (
        <section className="register-section">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-11">
                        <div className="card register-card">
                            <div className="row g-0">
                                {/* Left Side */}
                                <div className="col-lg-6 left-side d-flex flex-column justify-content-center">
                                    <div>
                                        <h1>Furni.</h1>
                                        <p>
                                            Create your account and explore
                                            modern furniture collections with a
                                            beautiful shopping experience.
                                        </p>
                                    </div>

                                    <img
                                        src="../assets/images/couch.png"
                                        alt="Furniture"
                                        className="img-fluid"
                                    />
                                </div>

                                {/* Right Side */}
                                <div className="col-lg-6 right-side">
                                    <h2 className="register-title">
                                        Create Account
                                    </h2>
                                    <p className="register-subtitle">
                                        Join with Furni today
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            {/* First Name */}
                                            <div className="col-md-6 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="fname"
                                                        value={values.fname}
                                                        onChange={handleChange}
                                                        className={`form-control ${
                                                            errors.fname
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                {errors.fname && (
                                                    <div className="text-danger mt-1">
                                                        {errors.fname}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Last Name */}
                                            <div className="col-md-6 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="lname"
                                                        value={values.lname}
                                                        onChange={handleChange}
                                                        className={`form-control ${
                                                            errors.lname
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                                {errors.lname && (
                                                    <div className="text-danger mt-1">
                                                        {errors.lname}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    className={`form-control ${
                                                        errors.email
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            {errors.email && (
                                                <div className="text-danger mt-1">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile */}
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-telephone"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={values.mobile}
                                                    onChange={handleChange}
                                                    className={`form-control ${
                                                        errors.mobile
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                            {errors.mobile && (
                                                <div className="text-danger mt-1">
                                                    {errors.mobile}
                                                </div>
                                            )}
                                        </div>

                                        <div className="row">
                                            {/* Password */}
                                            <div className="col-md-6 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        className={`form-control ${
                                                            errors.password
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                {errors.password && (
                                                    <div className="text-danger mt-1">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Confirm Password */}
                                            <div className="col-md-6 mb-3">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-lock"></i>
                                                    </span>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        className={`form-control ${
                                                            errors.confirmPassword
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        placeholder="Confirm Password"
                                                    />
                                                </div>
                                                {errors.confirmPassword && (
                                                    <div className="text-danger mt-1">
                                                        {errors.confirmPassword}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-check mb-4">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="terms"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="terms"
                                            >
                                                I agree to the Terms &
                                                Conditions
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn register-btn w-100 mb-4"
                                        >
                                            Create Account
                                        </button>

                                        <div className="text-center mb-3 text-muted">
                                            Or Sign Up With
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-6">
                                                <button
                                                    type="button"
                                                    className="btn social-btn w-100"
                                                >
                                                    <i className="bi bi-google"></i>{" "}
                                                    Google
                                                </button>
                                            </div>

                                            <div className="col-6">
                                                <button
                                                    type="button"
                                                    className="btn social-btn w-100"
                                                >
                                                    <i className="bi bi-facebook"></i>{" "}
                                                    Facebook
                                                </button>
                                            </div>
                                        </div>

                                        <div className="login-link mt-4 text-center">
                                            Already have an account?
                                            <a href="#" className="ms-1">
                                                Login
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default Register;