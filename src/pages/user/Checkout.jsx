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
    doc
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
        firstName: Yup.string()
            .required("First name is required"),

        lastName: Yup.string()
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
        try {
            const user = auth.currentUser;

            if (!user) {
                toast.error("Please login first");
                return;
            }

            await addDoc(collection(db, "orders"), {
                userId: user.uid,

                customer: values,

                products: cart,

                subtotal: total,

                total: total,

                paymentMethod: "Cash On Delivery",

                paymentStatus: "Pending",

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
            firstName: "",
            lastName: "",
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
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    getCart(user.uid);
                }
            }
        );
        return () => unsubscribe();
    }, []);
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
                    <div className="row">
                        <div className="col-md-6 mb-5 mb-md-0">
                            <h2 className="h3 mb-3 text-black">Billing Details</h2>
                            <form
                                className="p-3 p-lg-5 border bg-white"
                                onSubmit={handleSubmit}
                            >
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
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {touched.firstName && errors.firstName && (
                                            <small className="text-danger">
                                                {errors.firstName}
                                            </small>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_lname" name="c_lname" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Street address" />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_state_country" name="c_state_country" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_postal_zip" name="c_postal_zip" />
                                    </div>
                                </div>
                                <div className="form-group row mb-5">
                                    <div className="col-md-6">
                                        <label htmlFor="c_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_email_address" name="c_email_address" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_phone" name="c_phone" placeholder="Phone Number" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_create_account" className="text-black" data-bs-toggle="collapse" href="#create_an_account" role="button" aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" defaultValue={1} id="c_create_account" /> Create an account?</label>
                                    <div className="collapse" id="create_an_account">
                                        <div className="py-2 mb-4">
                                            <p className="mb-3">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            <div className="form-group">
                                                <label htmlFor="c_account_password" className="text-black">Account Password</label>
                                                <input type="email" className="form-control" id="c_account_password" name="c_account_password" placeholder />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_ship_different_address" className="text-black" data-bs-toggle="collapse" href="#ship_different_address" role="button" aria-expanded="false" aria-controls="ship_different_address"><input type="checkbox" defaultValue={1} id="c_ship_different_address" /> Ship To A Different Address?</label>
                                    <div className="collapse" id="ship_different_address">
                                        <div className="py-2">
                                            <div className="form-group">
                                                <label htmlFor="c_diff_country" className="text-black">Country <span className="text-danger">*</span></label>
                                                <select id="c_diff_country" className="form-control">
                                                    <option value={1}>Select a country</option>
                                                    <option value={2}>bangladesh</option>
                                                    <option value={3}>Algeria</option>
                                                    <option value={4}>Afghanistan</option>
                                                    <option value={5}>Ghana</option>
                                                    <option value={6}>Albania</option>
                                                    <option value={7}>Bahrain</option>
                                                    <option value={8}>Colombia</option>
                                                    <option value={9}>Dominican Republic</option>
                                                </select>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_fname" name="c_diff_fname" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_lname" name="c_diff_lname" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <label htmlFor="c_diff_companyname" className="text-black">Company Name </label>
                                                    <input type="text" className="form-control" id="c_diff_companyname" name="c_diff_companyname" />
                                                </div>
                                            </div>
                                            <div className="form-group row  mb-3">
                                                <div className="col-md-12">
                                                    <label htmlFor="c_diff_address" className="text-black">Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_address" name="c_diff_address" placeholder="Street address" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_state_country" name="c_diff_state_country" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_postal_zip" name="c_diff_postal_zip" />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-5">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_email_address" name="c_diff_email_address" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_phone" name="c_diff_phone" placeholder="Phone Number" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_order_notes" className="text-black">Order Notes</label>
                                    <textarea name="c_order_notes" id="c_order_notes" cols={30} rows={5} className="form-control" placeholder="Write your notes here..." defaultValue={""} />
                                </div>
                            </form>
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
                                            <Link className="btn btn-black btn-lg py-3 btn-block" to="/thankyou">Place Order</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;