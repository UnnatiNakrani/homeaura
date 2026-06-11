import { useParams } from "react-router-dom";

function OrderDetail() {

    const { id } = useParams();

    return (
        <div>

            <div className="page-header">
                <h2 className="page-title">
                    Order Details
                </h2>
            </div>

            <div className="row">

                <div className="col-lg-8">

                    <div className="admin-card mb-4">

                        <h5 className="mb-3">
                            Order #{id}
                        </h5>

                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>Luxury Sofa</td>
                                    <td>2</td>
                                    <td>₹12,500</td>
                                    <td>₹25,000</td>
                                </tr>

                                <tr>
                                    <td>Wooden Chair</td>
                                    <td>1</td>
                                    <td>₹4,500</td>
                                    <td>₹4,500</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="admin-card mb-4">

                        <h5>Customer Info</h5>

                        <p>
                            <strong>Name:</strong>
                            John Doe
                        </p>

                        <p>
                            <strong>Email:</strong>
                            john@gmail.com
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            +91 9999999999
                        </p>

                    </div>

                    <div className="admin-card mb-4">

                        <h5>Shipping Address</h5>

                        <p>
                            101 Green Avenue,
                            Surat,
                            Gujarat,
                            India
                        </p>

                    </div>

                    <div className="admin-card">

                        <h5>Order Status</h5>

                        <select className="form-select mt-3">
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>

                        <button className="btn btn-admin mt-3">
                            Update Status
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderDetail;