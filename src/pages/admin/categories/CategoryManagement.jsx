import React, { useState } from "react";

function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Living Room" },
    { id: 2, name: "Bedroom" },
    { id: 3, name: "Office Furniture" },
  ]);

  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    if (editId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editId
            ? { ...cat, name: categoryName }
            : cat
        )
      );

      setEditId(null);
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name: categoryName,
        },
      ]);
    }

    setCategoryName("");
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditId(category.id);
  };

  const handleDelete = (id) => {
    setCategories(
      categories.filter((cat) => cat.id !== id)
    );
  };

  return (
    <div className="container-fluid">

      <div className="page-header mb-4">
        <h2 className="page-title">
          Category Management
        </h2>
      </div>

      <div className="row">

        <div className="col-lg-4">
          <div className="admin-form">

            <h5 className="mb-3">
              {editId
                ? "Update Category"
                : "Add Category"}
            </h5>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) =>
                    setCategoryName(e.target.value)
                  }
                />
              </div>

              <button
                className="btn btn-admin"
                type="submit"
              >
                {editId
                  ? "Update Category"
                  : "Add Category"}
              </button>

            </form>

          </div>
        </div>

        <div className="col-lg-8">

          <div className="admin-card">

            <h5 className="mb-4">
              Categories
            </h5>

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th width="200">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>

                    <td>{category.name}</td>

                    <td>

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          handleEdit(category)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(category.id)
                        }
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CategoryManagement;