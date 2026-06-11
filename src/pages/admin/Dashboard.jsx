import PageHeader from "../../components/admin/PageHeader";
import AdminCard from "../../components/admin/AdminCard";

function Dashboard() {
    return (
        <>
            <PageHeader title="Dashboard" />

            <div className="row g-4">

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Revenue"
                        value="₹85,500"
                        icon="bi-currency-rupee"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Orders"
                        value="156"
                        icon="bi-bag-check"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Products"
                        value="48"
                        icon="bi-box-seam"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Users"
                        value="320"
                        icon="bi-people"
                    />
                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-8">
                    <div className="admin-card">
                        <h5 className="mb-4">Sales Analytics</h5>

                        <div
                            style={{
                                height: "350px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            Chart Area
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="admin-card">
                        <h5 className="mb-4">Quick Stats</h5>

                        <div className="mb-3">
                            <strong>Pending Orders</strong>
                            <h4>12</h4>
                        </div>

                        <div className="mb-3">
                            <strong>Low Stock</strong>
                            <h4>5</h4>
                        </div>

                        <div>
                            <strong>Blogs</strong>
                            <h4>22</h4>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-7">
                    <div className="admin-card">
                        <h5 className="mb-3">Recent Orders</h5>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>#1001</td>
                                    <td>John</td>
                                    <td>₹2500</td>
                                    <td>
                                        <span className="status status-success">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>#1002</td>
                                    <td>Emma</td>
                                    <td>₹1800</td>
                                    <td>
                                        <span className="status status-warning">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="admin-card">
                        <h5 className="mb-3">Recent Users</h5>

                        <ul className="list-group">
                            <li className="list-group-item">
                                John Doe
                            </li>

                            <li className="list-group-item">
                                Emma Watson
                            </li>

                            <li className="list-group-item">
                                Robert Smith
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard;