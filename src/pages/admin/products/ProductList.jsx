import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "products"));

      const productData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productData);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id));

    alert("Product deleted successfully.");

    getProducts(); // Refresh the list
    

  } catch (error) {
    console.log(error);
    alert("Failed to delete product.");
  }
};

  return (
    <div className="admin-card">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Products</h3>

        <Link
          to="/products/create"
          className="btn btn-admin"
        >
          Add Product
        </Link>
      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="10" className="text-center">
                  Loading...
                </td>
              </tr>

            ) : products.length === 0 ? (

              <tr>
                <td colSpan="10" className="text-center">
                  No Products Found
                </td>
              </tr>

            ) : (

              products.map((product) => (

                <tr key={product.id}>

                  <td>
                    {product.images ? (
                      <img
                        src={
                          Array.isArray(product.images)
                            ? product.images[0]
                            : product.images
                        }
                        alt={product.title}
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{product.title}</td>

                  <td>{product.slug}</td>

                  <td>₹{product.price}</td>

                  <td>
                    {product.salePrice
                      ? `₹${product.salePrice}`
                      : "-"}
                  </td>

                  <td>{product.sku}</td>

                  <td>{product.categoryId}</td>

                  <td>{product.stock}</td>

                  <td>
                    {Array.isArray(product.tags)
                      ? product.tags.join(", ")
                      : product.tags}
                  </td>

                  <td>

                    <Link
                      to={`/products/edit/${product.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductList;