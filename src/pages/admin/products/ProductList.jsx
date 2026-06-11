import { Link } from "react-router-dom";

function ProductList() {
  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between mb-4">
        <h3>Products</h3>

        <Link
          to="/admin/products/create"
          className="btn btn-admin"
        >
          Add Product
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Image</td>
            <td>Sofa</td>
            <td>₹25000</td>
            <td>Living Room</td>
            <td>10</td>

            <td>
              <Link
                to="/admin/products/edit/1"
                className="btn btn-sm btn-warning me-2"
              >
                Edit
              </Link>

              <button className="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;