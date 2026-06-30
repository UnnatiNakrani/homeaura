import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

      <div className="row">

        {loading ? (

          <div className="col-12 text-center">
            <h5>Loading...</h5>
          </div>

        ) : products.length === 0 ? (

          <div className="col-12 text-center">
            <h5>No Products Found</h5>
          </div>

        ) : (

          products.map((product) => (

            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4"> */}
              <div className="card shadow-sm h-100 border-0">

                <img
                  src={
                    product.images
                      ? Array.isArray(product.images)
                        ? product.images[0]
                        : product.images
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                  alt={product.title}
                />

                <div className="card-body">

                  <h5>{product.title}</h5>

                  <p className="text-muted mb-1">
                    {product.categoryId}
                  </p>

                  <h4 className="text-success">
                    ₹{product.price}
                  </h4>

                  {product.salePrice && (
                    <small className="text-danger">
                      Sale : ₹{product.salePrice}
                    </small>
                  )}

                  <hr />

                  <p>
                    <strong>SKU :</strong> {product.sku}
                  </p>

                  <p>
                    <strong>Stock :</strong> {product.stock}
                  </p>

                  <p>
                    <strong>Tags :</strong>{" "}
                    {Array.isArray(product.tags)
                      ? product.tags.join(", ")
                      : product.tags}
                  </p>

                </div>

                <div className="card-footer bg-white border-0">

                  <div className="d-flex justify-content-between">

                    <Link
                      to={`/products/edit/${product.id}`}
                      className="btn btn-warning"
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      <i className="fas fa-trash me-2"></i>
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ProductList;