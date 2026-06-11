import { useParams } from "react-router-dom";

function UserDetail() {

    const { id } = useParams();

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
                            src="https://via.placeholder.com/120"
                            alt=""
                            className="rounded-circle mb-3"
                        />

                        <h4>John Doe</h4>

                        <p className="text-muted">
                            john@gmail.com
                        </p>

                        <span className="status status-success">
                            Active
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
                                <strong>Name</strong>
                                <p>John Doe</p>
                            </div>

                            <div className="col-md-6">
                                <strong>Email</strong>
                                <p>john@gmail.com</p>
                            </div>

                            <div className="col-md-6">
                                <strong>Phone</strong>
                                <p>+91 9876543210</p>
                            </div>

                            <div className="col-md-6">
                                <strong>Joined</strong>
                                <p>01 Jan 2026</p>
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

                                <tr>
                                    <td>#ORD1001</td>
                                    <td>₹25,000</td>
                                    <td>Delivered</td>
                                </tr>

                                <tr>
                                    <td>#ORD1002</td>
                                    <td>₹18,500</td>
                                    <td>Pending</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default UserDetail;