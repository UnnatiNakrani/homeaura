import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "categories", id));

      setCategories(categories.filter((item) => item.id !== id));

      alert("Category Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="table-responsive">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Categories</h3>

        <Link
          to="/categories/create"
          className="btn btn-admin"
        >
          Add Category
        </Link>
      </div>

      <table className="table table-hover align-middle">

        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Parent Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan="6" className="text-center">
                Loading...
              </td>
            </tr>

          ) : categories.length === 0 ? (

            <tr>
              <td colSpan="6" className="text-center">
                No Categories Found
              </td>
            </tr>

          ) : (

            categories.map((category) => (

              <tr key={category.id}>

                <td>{category.name}</td>

                <td>{category.slug}</td>

                <td>{category.parentId || "None"}</td>

                <td
                  style={{
                    maxWidth: "250px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {category.description}
                </td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      to={`/products/edit/${category.id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(category.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default CategoryList;