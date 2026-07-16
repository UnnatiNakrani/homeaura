import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

function OrderList() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(data);
  };

  return (
    <div>
      <table className="table table-bordered">
    <thead>
        <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
        </tr>
    </thead>

    <tbody>

        {orders.map(order => (

            <tr key={order.id}>

                <td>{order.id}</td>

                <td>
                    {order.customer.firstName} {order.customer.lastName}
                    <br />
                    {order.customer.email}
                </td>

                <td>

                    {order.products.map(product => (

                        <div key={product.title}>
                            {product.title} × {product.quantity}
                        </div>

                    ))}

                </td>

                <td>₹{order.total}</td>

                <td>{order.orderStatus}</td>

                <td>{order.paymentStatus}</td>

            </tr>

        ))}

    </tbody>

</table>
    </div>
  );
}

export default OrderList;