function ProductCreate() {
  return (
    <div className="admin-form">
      <h3 className="mb-4">Create Product</h3>

      <form>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Category</label>

          <select className="form-select">
            <option>Select Category</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Image</label>

          <input
            type="file"
            className="form-control"
          />
        </div>

        <button className="btn btn-admin">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default ProductCreate;