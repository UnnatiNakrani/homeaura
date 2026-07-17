import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ROLES } from '../../constant/CommonConstant';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';
import { AUTH_MESSAGES } from "../../constant/MessageConstant";
import { toast } from 'react-toastify';

function Register(props) {

    const Navigate = useNavigate();

    const validationSchema = Yup.object({
        fname: Yup.string().min(2, "Minimum 2 characters").required("First name is required"),
        lname: Yup.string().min(2, "Minimum 2 characters").required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
        password: Yup.string().min(4, "Minimum 4 characters").required("Password is required"),
        confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required")
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
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Create user in Firebase Auth
                const res = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

                console.log(res, "res");

                const payload = {
                    ...values,
                    uid: res.user.uid,
                    createdAt: new Date().toLocaleString(),
                    updatedAt: new Date().toLocaleString(),
                    isDeleted: false,
                    role: values.email === "admin@gmail.com" ? ROLES.ADMIN : ROLES.USER
                }
                console.log(payload, "payload");

                const addUser = await setDoc(doc(db, "users", res.user.uid), {
    ...payload,
});

                console.log(addUser, "add user");


                toast.success(AUTH_MESSAGES.REGISTER_SUCCESS);
                Navigate(AUTH_ROUTE.LOGIN);
                resetForm();

            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toast.error(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
                        break;

                    case "auth/invalid-email":
                        toast.error(AUTH_MESSAGES.INVALID_EMAIL);
                        break;

                    case "auth/weak-password":
                        toast.error(AUTH_MESSAGES.WEAK_PASSWORD);
                        break;

                    case "auth/network-request-failed":
                        toast.error(AUTH_MESSAGES.NETWORK_ERROR);
                        break;

                    default:
                        toast.error(AUTH_MESSAGES.UNKNOWN_ERROR);
                        break;
                }
            }
        }
    })

    const { handleSubmit, handleChange, values, errors, handleBlur, touched } = formik;

    return (
        <section className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card login-card">
                            <div className="row g-0">

                                {/* Left Side */}
                                <div className="col-lg-6 left-side d-flex flex-column justify-content-center">

                                    <h1>Furni.</h1>

                                    <p>
                                        Create your HomeAura account and discover premium
                                        furniture designed to transform your living space.
                                    </p>

                                    <img
                                        src="/assets/images/couch.png"
                                        alt="Furniture"
                                        className="img-fluid"
                                    />

                                </div>

                                {/* Right Side */}
                                <div className="col-lg-6 right-side">

                                    <h2 className="login-title">
                                        Create Account
                                    </h2>

                                    <p className="login-subtitle">
                                        Join HomeAura today
                                    </p>

                                    <form onSubmit={handleSubmit}>

                                        <div className="row">

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
                                                        onBlur={handleBlur}
                                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                                            }`}
                                                        placeholder="First Name"
                                                    />
                                                    {touched.fname && errors.fname && (
                                                        <div className="text-danger mt-1">
                                                            {errors.fname}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

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
                                                        onBlur={handleBlur}
                                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                                            }`}
                                                        placeholder="Last Name"
                                                    />
                                                    {touched.lname && errors.lname && (
                                                        <div className="text-danger mt-1">
                                                            {errors.lname}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                        </div>

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
                                                    onBlur={handleBlur}
                                                    className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Email Address"
                                                />
                                                {touched.email && errors.email && (
                                                    <div className="text-danger mt-1">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

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
                                                    onBlur={handleBlur}
                                                    className={`form-control ${touched.mobile && errors.mobile ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Mobile Number"
                                                />
                                                {touched.mobile && errors.mobile && (
                                                    <div className="text-danger mt-1">
                                                        {errors.mobile}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <div className="row">

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
                                                        onBlur={handleBlur}
                                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                                            }`}
                                                        placeholder="Password"
                                                    />
                                                    {touched.password && errors.password && (
                                                        <div className="text-danger mt-1">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <div className="input-group">

                                                    <span className="input-group-text">
                                                        <i className="bi bi-shield-lock"></i>
                                                    </span>

                                                    <input
                                                        type="password"
                                                        name="confirmpassword"
                                                        value={values.confirmpassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`form-control ${touched.confirmpassword && errors.confirmpassword
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                        placeholder="Confirm Password"
                                                    />

                                                    {touched.confirmpassword &&
                                                        errors.confirmpassword && (
                                                            <div className="text-danger mt-1">
                                                                {errors.confirmpassword}
                                                            </div>
                                                        )}

                                                </div>
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
                                                I agree to the Terms & Conditions
                                            </label>

                                        </div>

                                        <button
                                            type="submit"
                                            className="btn login-btn w-100"
                                        >
                                            Create Account
                                        </button>

                                        <p className="text-center mt-4">

                                            Already have an account?

                                            <Link
                                                to={AUTH_ROUTE.LOGIN}
                                                className="ms-2"
                                            >
                                                Login
                                            </Link>
                                        </p>
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
