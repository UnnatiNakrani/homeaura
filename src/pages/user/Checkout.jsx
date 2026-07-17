import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import Header from '../../components/common/Header';
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
    serverTimestamp,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import Footer from '../../components/common/Footer';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

function Checkout(props) {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const checkoutSchema = Yup.object({
        fName: Yup.string()
            .required("First name is required"),

        lName: Yup.string()
            .required("Last name is required"),

        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),

        mobile: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
            .required("Mobile number is required"),

        country: Yup.string()
            .required("Country is required"),

        state: Yup.string()
            .required("State is required"),

        city: Yup.string()
            .required("City is required"),

        address: Yup.string()
            .required("Address is required"),

        pincode: Yup.string()
            .matches(/^\d{6}$/, "PIN Code must be 6 digits")
            .required("PIN Code is required"),

        landmark: Yup.string(),

        notes: Yup.string()
    });

    const handlePlaceOrder = async (values, { resetForm }) => {
        console.log(values);

        try {
            const user = auth.currentUser;


            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                fname: values.fName,
                lname: values.lName,
                email: values.email,
                mobile: values.mobile,
                address: values.address,
                city: values.city,
                state: values.state,
                country: values.country,
                pincode: values.pincode,
            });


            await addDoc(collection(db, "orders"), {
                userId: auth.currentUser.uid,
                customer: values,
                products: cart,
                total,
                paymentMethod: values.paymentMethod,
                paymentStatus:
                    values.paymentMethod === "Online"
                        ? "Completed"
                        : "Pending",
                orderStatus: "Pending",
                createdAt: serverTimestamp(),
            });

            for (const item of cart) {
                await deleteDoc(doc(db, "cart", item.id));
            }

            toast.success("Order placed successfully");
            navigate("/thankyou");
            resetForm();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const formik = useFormik({
        initialValues: {
            fName: "",
            lName: "",
            email: "",
            mobile: "",
            country: "India",
            state: "",
            city: "",
            address: "",
            landmark: "",
            pincode: "",
            notes: "",
            paymentMethod: "COD"
        },
        validationSchema: checkoutSchema,
        onSubmit: handlePlaceOrder,
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getCart(user.uid);
                getProfile(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const getProfile = async (uid) => {
        try {
            const snap = await getDoc(doc(db, "users", uid));

            if (snap.exists()) {
                const data = snap.data();

                formik.setValues({
                    fName: data.fname || "",
                    lName: data.lname || "",
                    email: data.email || "",
                    mobile: data.mobile || "",
                    address: data.address || "",
                    city: data.city || "",
                    state: data.state || "",
                    country: data.country || "India",
                    pincode: data.pincode || "",
                    landmark: "",
                    notes: "",
                    paymentMethod: "COD",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCart = async (uid) => {
        try {
            const q = query(
                collection(db, "cart"),
                where("userId", "==", uid)
            );
            const snapshot = await getDocs(q);
            const cartItems = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCart(cartItems);
            const totalAmount = cartItems.reduce(
                (sum, item) => sum + Number(item.total), 0
            );
            setTotal(totalAmount);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Header />
            {/* Start Hero Section */}
            <Hero
                title="Checkout"
                description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                primaryBtnText="Shop Now"
                primaryBtnLink="/shop"
                secondaryBtnText="Explore"
                secondaryBtnLink="/about"
                image="/assets/images/couch.png"
            />

            {/* End Hero Section */}
            <div className="untree_co-section">
                <div className="container">
                    <form
                        id="checkoutForm"
                        className="p-3 p-lg-5 border bg-white"
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-md-6 mb-5 mb-md-0">
                                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                                <div className="form-group">
                                    <label htmlFor="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        name="country"
                                        value={values.country}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Nepal">Nepal</option>
                                    </select>

                                    {touched.country && errors.country && (
                                        <small className="text-danger">
                                            {errors.country}
                                        </small>
                                    )}
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fName"
                                            value={values.fName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.fName && errors.fName && (
                                            <small className="text-danger">
                                                {errors.fName}
                                            </small>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lName"
                                            value={values.lName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.lName && errors.lName && (
                                            <small className="text-danger">{errors.lName}</small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.address && errors.address && (
                                            <small className="text-danger">{errors.address}</small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                </div>
                                <div className="form-group">
                                    <label className="text-black">
                                        City <span className="text-danger">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {touched.city && errors.city && (
                                        <small className="text-danger">{errors.city}</small>
                                    )}
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.state && errors.state && (
                                            <small className="text-danger">{errors.state}</small>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pincode"
                                            value={values.pincode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.pincode && errors.pincode && (
                                            <small className="text-danger">{errors.pincode}</small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row mb-5">
                                    <div className="col-md-6">
                                        <label htmlFor="c_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.email && errors.email && (
                                            <small className="text-danger">{errors.email}</small>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobile"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.mobile && errors.mobile && (
                                            <small className="text-danger">{errors.mobile}</small>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <h2 className="h3 mb-3 text-black">Your Order</h2>
                                        <div className="p-3 p-lg-5 border bg-white">
                                            <table className="table site-block-order-table mb-5">
                                                <thead>
                                                    <tr><th>Product</th>
                                                        <th>Total</th>
                                                    </tr></thead>
                                                <tbody>
                                                    {
                                                        cart.map((item) => (
                                                            <tr key={item.id}>
                                                                <td>
                                                                    {item.title}
                                                                    <strong className="mx-2">
                                                                        x
                                                                    </strong>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>
                                                                    ₹{item.total.toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>
                                                                Cart Subtotal
                                                            </strong>
                                                        </td>
                                                        <td className="text-black">
                                                            ₹{total.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>
                                                                Order Total
                                                            </strong>
                                                        </td>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>
                                                                ₹{total.toLocaleString()}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="COD"
                                                    checked={values.paymentMethod === "COD"}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">
                                                    Cash on Delivery
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="Online"
                                                    checked={values.paymentMethod === "Online"}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">
                                                    Online Payment
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    form="checkoutForm"
                                                    className="btn btn-black btn-lg py-3 btn-block"
                                                >
                                                    Place Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default Checkout;