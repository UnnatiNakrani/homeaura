import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../../firebase";

function UserDetail() {

const { id } = useParams();

const [user, setUser] = useState(null);
const [orders, setOrders] = useState([]);

useEffect(() => {
    getUser();
    getOrders();
}, []);

const getUser = async () => {
    try {

        const snap = await getDoc(doc(db, "users", id));

        if (snap.exists()) {
            setUser(snap.data());
        }

    } catch (error) {
        console.log(error);
    }
};

const getOrders = async () => {
    try {

        const q = query(
            collection(db, "orders"),
            where("userId", "==", id)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setOrders(data);

    } catch (error) {
        console.log(error);
    }
};

if (!user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
}

    return (
        <div>

            <div className="page-header">
                <h2 className="page-title">
                    User Detail
                </h2>
            </div>

            <div className="row">

                <div className="col-lg-4">

                    <div className="admin-card text-center">

                        <img
                           src={
    user.image ||
    `https://ui-avatars.com/api/?name=${user.fname}+${user.lname}`
}
                            className="rounded-circle mb-3"
                        />

<h4>{user.fname} {user.lname}</h4>

                        <p>{user.email}</p>

                        <span
    className={
        user.isDeleted
            ? "status status-danger"
            : "status status-success"
    }
>
    {user.isDeleted ? "Inactive" : "Active"}
</span>

                    </div>

                </div>

                <div className="col-lg-8">

                    <div className="admin-card mb-4">

                        <h5 className="mb-3">
                            Account Information
                        </h5>

                        <div className="row">

    <div className="col-md-6">
        <strong>First Name</strong>
        <p>{user.fname}</p>
    </div>

    <div className="col-md-6">
        <strong>Last Name</strong>
        <p>{user.lname}</p>
    </div>

    <div className="col-md-6">
        <strong>Email</strong>
        <p>{user.email}</p>
    </div>

    <div className="col-md-6">
        <strong>Phone</strong>
        <p>{user.mobile}</p>
    </div>

    <div className="col-md-6">
        <strong>Gender</strong>
        <p>{user.gender || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>Date of Birth</strong>
        <p>{user.dob || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>Country</strong>
        <p>{user.country || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>State</strong>
        <p>{user.state || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>City</strong>
        <p>{user.city || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>Pincode</strong>
        <p>{user.pincode || "-"}</p>
    </div>

    <div className="col-md-12">
        <strong>Address</strong>
        <p>{user.address || "-"}</p>
    </div>

    <div className="col-md-6">
        <strong>Role</strong>
        <p>{user.role}</p>
    </div>

    <div className="col-md-6">
        <strong>Joined</strong>
        <p>{user.createdAt}</p>
    </div>

</div>

                    </div>

                    <div className="admin-card">

                        <h5 className="mb-3">
                            Order History
                        </h5>

                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                           <tbody>

    {orders.length > 0 ? (

        orders.map((order) => (

            <tr key={order.id}>

                <td>{order.id.slice(0, 8)}</td>

                <td>₹{order.total}</td>

                <td>{order.orderStatus}</td>

            </tr>

        ))

    ) : (

        <tr>

            <td colSpan="3" className="text-center">
                No Orders Found
            </td>

        </tr>

    )}

</tbody>
                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default UserDetail;