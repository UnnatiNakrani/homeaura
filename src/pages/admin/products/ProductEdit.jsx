import { useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();

  return (
    <div className="admin-form">
      <h3>Edit Product #{id}</h3>

      <form>
        <div className="mb-3">
          <label>Name</label>

          <input
            type="text"
            className="form-control"
            defaultValue="Luxury Sofa"
          />
        </div>

        <div className="mb-3">
          <label>Price</label>

          <input
            type="number"
            className="form-control"
            defaultValue="25000"
          />
        </div>

        <button className="btn btn-admin">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;