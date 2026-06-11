import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Register from './Register';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from '../../constant/RoutesConstant';
import { ROLES } from '../../constant/CommonConstant';
import { STORAGE_KEYS } from '../../constant/StorageConstant';
import { getFirestoreData } from '../../helper/AuthHelper';

function Login(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(3, "Minimum 5 characters").required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );
                const getuser = await getDocs(collection(db, "user"));

                const userMap = getFirestoreData(
                    await getDocs(collection(db, "users"))
                );

                const loginUser = userMap.find(
                    (user) => user.uid === res.user.uid
                );

                  if (!loginUser) {
                    console.error("User not found in Firestore");
                    return;
                }
                
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(loginUser))
                localStorage.setItem(STORAGE_KEYS.LOGIN_FLAG, JSON.stringify(true))

                if (loginUser.role === ROLES.ADMIN) {
                    navigate(ADMIN_ROUTE.DASHBOARD);
                } else {
                    navigate(USER_ROUTE.HOME);
                }


            } catch (error) {
                console.log(error);
            }
        }
    })

    const { handleChange, handleSubmit, values, errors } = formik;

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
                                        Welcome back to our modern furniture store.
                                        Manage your products, orders, and customer experience
                                        with a beautiful dashboard.
                                    </p>
                                    <img src="../assets/images/couch.png" alt="Furniture Image" />
                                </div>
                                {/* Right Side */}
                                <div className="col-lg-6 right-side">
                                    <h2 className="login-title">Welcome Back</h2>
                                    <p className="login-subtitle">Login to continue your account</p>
                                    <form onSubmit={handleSubmit}>
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
                                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                    placeholder="Enter Email"
                                                />
                                            </div>

                                            {errors.email && (
                                                <div className="text-danger mt-1">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                    placeholder="Enter Password"
                                                />
                                            </div>

                                            {errors.password && (
                                                <div className="text-danger mt-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <label className="form-check-label">
                                                    Remember Me
                                                </label>
                                            </div>

                                            <a href="#" className="forgot-link">
                                                Forgot Password?
                                            </a>

                                        </div>
                                        <p className="mt-3">
                                            Create new account
                                            <Link to={AUTH_ROUTE.REGISTER}> Sign up</Link>
                                        </p>
                                        <button
                                            type="submit"
                                            className="btn login-btn w-100 mb-4"
                                        >
                                            Login Now
                                        </button>
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

export default Login;