import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { auth, db, googleProvider } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import Register from './Register';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from '../../constant/RoutesConstant';
import { ROLES } from '../../constant/CommonConstant';
import { STORAGE_KEYS } from '../../constant/StorageConstant';
import { getFirestoreData } from '../../helper/AuthHelper';
import { toast } from "react-toastify";
import { AUTH_MESSAGES } from "../../constant/MessageConstant";

function Login(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
        const [login, setLogin] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(4, "Minimum 4 characters").required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {

            try {
                const res = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );
                const getuser = await getDocs(collection(db, "users"));

                const userMap = getFirestoreData(
                    await getDocs(collection(db, "users"))
                );

                console.log("Auth UID:", res.user.uid);

                console.log("Logged in email:", res.user.email);
                console.log("Logged in uid:", res.user.uid);

                const loginUser = userMap.find(
                    (user) => user.uid === res.user.uid
                );

                if (!loginUser) {
                    console.error("User not found in Firestore");
                    return;
                }

                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(loginUser))
                localStorage.setItem(STORAGE_KEYS.LOGIN_FLAG, JSON.stringify(true))

                toast.success(AUTH_MESSAGES.LOGIN_SUCCESS);

                setTimeout(() => {
                    if (loginUser.role === ROLES.ADMIN) {
                        navigate(ADMIN_ROUTE.DASHBOARD);
                    } else {
                        navigate(USER_ROUTE.HOME);
                    }
                }, 1500);

            } catch (error) {
                switch (error.code) {
                    case "auth/invalid-credential":
                    case "auth/wrong-password":
                        toast.error(AUTH_MESSAGES.INVALID_CREDENTIALS);
                        break;

                    case "auth/user-not-found":
                        toast.error(AUTH_MESSAGES.USER_NOT_FOUND);
                        break;

                    case "auth/invalid-email":
                        toast.error(AUTH_MESSAGES.INVALID_EMAIL);
                        break;

                    case "auth/network-request-failed":
                        toast.error(AUTH_MESSAGES.NETWORK_ERROR);
                        break;

                    case "auth/too-many-requests":
                        toast.error(AUTH_MESSAGES.TOO_MANY_REQUESTS);
                        break;

                    default:
                        toast.error(AUTH_MESSAGES.UNKNOWN_ERROR);
                        break;
                }

                console.log(error);
            }
        }

    })

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const user = result.user;

            const userRef = doc(db, "users", user.uid);

            const userSnap = await getDoc(userRef);

            let loginUser;

            if (!userSnap.exists()) {
                loginUser = {
                    uid: user.uid,
                    fname: user.displayName?.split(" ")[0] || "",
                    lname: user.displayName?.split(" ").slice(1).join(" ") || "",
                    email: user.email,
                    mobile: user.phoneNumber || "",
                    role: ROLES.USER,
                    profileImage: user.photoURL || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                await setDoc(userRef, loginUser);
            } else {
                loginUser = userSnap.data();
            }

            localStorage.setItem(
                STORAGE_KEYS.USERS,
                JSON.stringify(loginUser)
            );

            localStorage.setItem(
                STORAGE_KEYS.LOGIN_FLAG,
                JSON.stringify(true)
            );

            if (loginUser.role === ROLES.ADMIN) {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const { handleChange, handleSubmit, values, errors, handleBlur, touched } = formik;

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
                                                    onBlur={handleBlur}
                                                    className={`form-control ${touched.email ? "is-invalid" : ""}`}
                                                    placeholder="Enter Email"
                                                />
                                            </div>

                                            {touched.email && errors.email && (
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
                                                    onBlur={handleBlur}
                                                    className={`form-control ${touched.password ? "is-invalid" : ""}`}
                                                    placeholder="Enter Password"
                                                />
                                            </div>

                                            {touched.password && errors.password && (
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
                                            disabled={login}
                                        >
                                            {login ? "login.." : "Login Now"}
                                        </button>

                                        <div className="text-center my-3">
                                            <span className="text-muted">OR</span>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center"
                                            onClick={handleGoogleLogin}
                                        >
                                            <img
                                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                                alt="Google"
                                                width="20"
                                                className="me-2"
                                            />
                                            Continue with Google
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