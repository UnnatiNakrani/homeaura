import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function OrderDetail() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const getOrder = async () => {

        try {

            const docRef = doc(db, "orders", id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                setOrder({
                    id: docSnap.id,
                    ...docSnap.data()
                });

            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        getOrder();
    }, [id]);

    const updateStatus = async () => {

        try {

            await updateDoc(doc(db, "orders", id), {
                orderStatus: order.orderStatus
            });

            alert("Order Status Updated");

        } catch (error) {
            console.log(error);
        }

    };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (!order) {
        return <h3>Order Not Found</h3>;
    }

    return (

        <div>

            <div className="page-header mb-4">
                <h2 className="page-title">
                    Order Details
                </h2>
            </div>

            <div className="row">

                <div className="col-lg-8">

                    <div className="admin-card mb-4">

                        <h5 className="mb-4">
                            Order #{order.id.slice(0,8).toUpperCase()}
                        </h5>

                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr>
                                        <th>Product</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {order.products?.map((product,index)=>(

                                        <tr key={index}>

                                            <td>
                                                {product.title}
                                            </td>

                                            <td>

                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    width="70"
                                                    height="70"
                                                    style={{
                                                        objectFit:"cover",
                                                        borderRadius:"8px"
                                                    }}
                                                />

                                            </td>

                                            <td>
                                                ₹{product.price}
                                            </td>

                                            <td>
                                                {product.quantity}
                                            </td>

                                            <td>
                                                ₹{product.price * product.quantity}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="admin-card mb-4">

                        <h5 className="mb-3">
                            Customer Information
                        </h5>

                        <p>
                            <strong>Name :</strong>{" "}
                            {order.customerName}
                        </p>

                        <p>
                            <strong>Email :</strong>{" "}
                            {order.customerEmail}
                        </p>

                        <p>
                            <strong>Phone :</strong>{" "}
                            {order.customerPhone}
                        </p>

                    </div>

                    <div className="admin-card mb-4">

                        <h5 className="mb-3">
                            Shipping Address
                        </h5>

                        <p>
                            {order.shippingAddress?.address}
                        </p>

                        <p>
                            {order.shippingAddress?.city}
                        </p>

                        <p>
                            {order.shippingAddress?.state}
                        </p>

                        <p>
                            {order.shippingAddress?.country}
                        </p>

                        <p>
                            {order.shippingAddress?.pincode}
                        </p>

                    </div>

                    <div className="admin-card mb-4">

                        <h5 className="mb-3">
                            Order Summary
                        </h5>

                        <p>
                            <strong>Subtotal :</strong> ₹{order.subtotal}
                        </p>

                        <p>
                            <strong>Shipping :</strong> ₹{order.shippingCharge}
                        </p>

                        <p>
                            <strong>Discount :</strong> ₹{order.discount}
                        </p>

                        <hr/>

                        <h5>
                            Total : ₹{order.totalAmount}
                        </h5>

                    </div>

                    <div className="admin-card">

                        <h5 className="mb-3">
                            Order Status
                        </h5>

                        <select
                            className="form-select"
                            value={order.orderStatus}
                            onChange={(e)=>{

                                setOrder({
                                    ...order,
                                    orderStatus:e.target.value
                                })

                            }}
                        >

                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Packed</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>

                        </select>

                        <button
                            className="btn btn-admin w-100 mt-3"
                            onClick={updateStatus}
                        >
                            Update Status
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default OrderDetail;