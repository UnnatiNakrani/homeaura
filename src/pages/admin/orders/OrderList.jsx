import { Link } from "react-router-dom";

function OrderList() {

    const orders = [
        {
            id: "ORD1001",
            customer: "John Doe",
            amount: 25000,
            status: "Delivered",
            date: "10 Jun 2026"
        },
        {
            id: "ORD1002",
            customer: "Emma Watson",
            amount: 18500,
            status: "Pending",
            date: "11 Jun 2026"
        }
    ];

    return (
        <div className="admin-card">

            <div className="page-header">
                <h2 className="page-title">
                    Orders
                </h2>
            </div>

            <table className="table align-middle">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map((order) => (
                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>{order.customer}</td>

                            <td>₹{order.amount}</td>

                            <td>
                                <span
                                    className={
                                        order.status === "Delivered"
                                            ? "status status-success"
                                            : "status status-warning"
                                    }
                                >
                                    {order.status}
                                </span>
                            </td>

                            <td>{order.date}</td>

                            <td>
                                <Link
                                    to={`/admin/orders/${order.id}`}
                                    className="btn btn-sm btn-admin"
                                >
                                    View
                                </Link>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default OrderList;