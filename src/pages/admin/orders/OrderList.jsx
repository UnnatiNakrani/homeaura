import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

function OrderList() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "orders"));

      const orderData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderData);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const badgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";

      case "Processing":
        return "bg-info";

      case "Shipped":
        return "bg-primary";

      case "Delivered":
        return "bg-success";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="admin-card">

      <div className="page-header mb-4">

        <h2 className="page-title">
          Orders
        </h2>

      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>

            ) : orders.length === 0 ? (

              <tr>
                <td colSpan="8" className="text-center">
                  No Orders Found
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    {order.id.slice(0, 8).toUpperCase()}
                  </td>

                  <td>
                    {order.customerName}
                  </td>

                  <td>
                    {order.customerEmail}
                  </td>

                  <td>
                    {order.customerPhone}
                  </td>

                  <td>
                    ₹{order.totalAmount}
                  </td>

                  <td>

                    <span className={`badge ${badgeClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>

                  </td>

                  <td>

                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "-"}

                  </td>

                  <td>

                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="btn btn-admin btn-sm"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrderList;