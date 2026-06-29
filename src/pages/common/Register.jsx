import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ROLES } from '../../constant/CommonConstant';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';

function Register(props) {

    const [user, setUser] = useState([]);

    const Navigate = useNavigate();

    const validationSchema = Yup.object({
        fname: Yup.string().min(2, "Minimum 2 characters").required("First name is required"),
        lname: Yup.string().min(2, "Minimum 2 characters").required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
        password: Yup.string().min(5, "Minimum 5 characters").required("Password is required"),
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

                const addUser = await addDoc(collection(db, "users"),payload)

                console.log(addUser, "add user");
                

                alert("Registeration successful");

                Navigate(AUTH_ROUTE.LOGIN);
                resetForm();

            } catch (error) {
                // console.log(error);
                // switch (error.code) {
                //     case "auth/email-already-in-use":
                //         alert("Email already registered");
                //         break;
                //     case "auth/invalid-email":
                //         alert("Invalid email address");
                //         break;
                //     case "auth/weak-password":
                //         alert("Password should be at least 5 characters");
                //         break;
                //     default:
                // alert(error.message);
                console.log(error, 'eeeeee');
            }
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
                                            Create your account and explore modern furniture collections with a beautiful shopping experience.
                                        </p>
                                    </div>
                                    <img src="../assets/images/couch.png" alt="Furniture Image" />
                                </div>
                                {/* Right Side */}
                                <div className="col-lg-6 right-side">
                                    <h2 className="register-title">Create Account</h2>
                                    <p className="register-subtitle">Join with Furni today</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person" />
                                                    </span>
                                                    <input onChange={handleChange}  bvalue={values.fname} name='fname' type="text" className="form-control" placeholder="First Name" />
                                                </div>
                                                {errors.fname && (
                                                    <div className="text-danger mt-1">
                                                        {errors.fname}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-person" />
                                                    </span>
                                                    <input onChange={handleChange} value={values.lname} name='lname' type="text" className="form-control" placeholder="Last Name" />
                                                </div>
                                                {errors.lname && (
                                                    <div className="text-danger mt-1">
                                                        {errors.lname}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-envelope" />
                                                </span>
                                                <input onChange={handleChange} value={values.email} name='email' type="email" className="form-control" placeholder="Email Address" />
                                            </div>
                                            {errors.email && (
                                                <div className="text-danger mt-1">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-telephone" />
                                                </span>
                                                <input onChange={handleChange} value={values.mobile} name='mobile' type="text" className="form-control" placeholder="Phone Number" />
                                            </div>
                                            {errors.mobile && (
                                                <div className="text-danger mt-1">
                                                    {errors.mobile}
                                                </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-lock" />
                                                    </span>
                                                    <input onChange={handleChange} value={values.password} name='password' type="password" className="form-control" placeholder="Password" />
                                                </div>
                                                {errors.password && (
                                                    <div className="text-danger mt-1">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-shield-lock" />
                                                    </span>
                                                    <input onChange={handleChange} value={values.confirmpassword} name='confirmpassword' type="password" className="form-control" placeholder="Confirm Password" />
                                                </div>
                                                {errors.confirmpassword && (
                                                    <div className="text-danger mt-1">
                                                        {errors.confirmpassword}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-check mb-4">
                                            <input onChange={handleChange} value={values} className="form-check-input" type="checkbox" id="terms" />
                                            <label className="form-check-label" htmlFor="terms">
                                                I agree to the Terms &amp; Conditions
                                            </label>
                                        </div>
                                        <button type="submit" className="btn register-btn w-100 mb-4">
                                            Create Account
                                        </button>
                                        <div className="text-center mb-3 text-muted">
                                            Or Sign Up With
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <button type="button" className="btn social-btn w-100">
                                                    <i className="bi bi-google" /> Google
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button type="button" className="btn social-btn w-100">
                                                    <i className="bi bi-facebook" /> Facebook
                                                </button>
                                            </div>
                                        </div>
                                        <div className="login-link">
                                            Already have an account?
                                           <Link to={AUTH_ROUTE.LOGIN}> Sign in</Link>
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