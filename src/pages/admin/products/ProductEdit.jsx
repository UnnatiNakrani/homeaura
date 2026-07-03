import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      price: "",
      salePrice: "",
      sku: "",
      images: "",
      categoryId: "",
      tags: "",
      stock: "",
      attributes: "",
    },

    onSubmit: async (values) => {
      try {
        await updateDoc(doc(db, "products", id), {
          ...values,
        });

        alert("Product Updated Successfully");

        navigate("/products");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getProduct = async () => {
    try {
      const productRef = doc(db, "products", id);

      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setValues(productSnap.data());
      } else {
        alert("Product Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const { handleChange, handleSubmit, values, setValues} = formik;

  return (
    <div className="admin-card">

      <h3 className="mb-4">Edit Product</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Title</label>

          <input
            type="text"
            name="title"
            className="form-control"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Slug</label>

          <input
            type="text"
            name="slug"
            className="form-control"
            value={values.slug}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            className="form-control"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Price</label>

            <input
              type="number"
              name="price"
              className="form-control"
              value={values.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Sale Price</label>

            <input
              type="number"
              name="salePrice"
              className="form-control"
              value={values.salePrice}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mb-3">
          <label>SKU</label>

          <input
            type="text"
            name="sku"
            className="form-control"
            value={values.sku}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>

          <input
            type="text"
            name="categoryId"
            className="form-control"
            value={values.categoryId}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Tags</label>

          <input
            type="text"
            name="tags"
            className="form-control"
            value={values.tags}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>

          <input
            type="number"
            name="stock"
            className="form-control"
            value={values.stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Attributes</label>

          <textarea
            rows="3"
            name="attributes"
            className="form-control"
            value={values.attributes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-admin"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default ProductEdit;