import React from "react";

function AnalyticsDashboard() {
    return (
        <div className="container-fluid">

            <div className="page-header mb-4">
                <h2 className="page-title">
                    Analytics Dashboard
                </h2>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">

                <div className="col-md-6 col-xl-3">
                    <div className="stats-card">
                        <h6 className="text-muted">
                            Total Revenue
                        </h6>

                        <h2 className="fw-bold">
                            ₹2,45,000
                        </h2>

                        <p className="text-success mb-0">
                            +12.5% This Month
                        </p>
                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stats-card">
                        <h6 className="text-muted">
                            Total Orders
                        </h6>

                        <h2 className="fw-bold">
                            1,250
                        </h2>

                        <p className="text-success mb-0">
                            +8.2% This Month
                        </p>
                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stats-card">
                        <h6 className="text-muted">
                            Customers
                        </h6>

                        <h2 className="fw-bold">
                            856
                        </h2>

                        <p className="text-success mb-0">
                            +15.4% This Month
                        </p>
                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stats-card">
                        <h6 className="text-muted">
                            Products
                        </h6>

                        <h2 className="fw-bold">
                            145
                        </h2>

                        <p className="text-success mb-0">
                            +5.3% This Month
                        </p>
                    </div>
                </div>

            </div>

            {/* Charts Placeholder */}
            <div className="row g-4">

                <div className="col-lg-8">

                    <div className="admin-card">

                        <h5 className="mb-4">
                            Monthly Sales
                        </h5>

                        <div
                            style={{
                                height: "350px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#f8f9fa",
                                borderRadius: "10px"
                            }}
                        >
                            Chart.js Sales Chart Here
                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="admin-card">

                        <h5 className="mb-4">
                            Order Status
                        </h5>

                        <ul className="list-group">

                            <li className="list-group-item d-flex justify-content-between">
                                Pending
                                <span>45</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                Processing
                                <span>30</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                Shipped
                                <span>25</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                Delivered
                                <span>1150</span>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

            {/* Top Products */}
            <div className="row mt-4">

                <div className="col-12">

                    <div className="admin-card">

                        <h5 className="mb-4">
                            Top Selling Products
                        </h5>

                        <table className="table align-middle">

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Sold</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Luxury Sofa</td>
                                    <td>Living Room</td>
                                    <td>120</td>
                                    <td>₹6,00,000</td>
                                </tr>

                                <tr>
                                    <td>Wooden Chair</td>
                                    <td>Office</td>
                                    <td>95</td>
                                    <td>₹2,85,000</td>
                                </tr>

                                <tr>
                                    <td>Dining Table</td>
                                    <td>Dining</td>
                                    <td>75</td>
                                    <td>₹4,50,000</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AnalyticsDashboard;