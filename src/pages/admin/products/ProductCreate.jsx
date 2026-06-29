import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFormik } from "formik";
import { db } from "../../../firebase";

function ProductCreate() {

  const [product, setProduct] = useState({});
  const [edit, setEdit] = useState(null);

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
      attributes: ""
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (edit) {
          const index = product.findIndex((p) => p.id === edit)

          if (index !== -1) {
            const updateProduct = [...product]
            updateProduct[index] = {
              ...updateProduct[index],
              ...values
            }
            setProduct(updateProduct)
          }
        } else {
          await addDoc(collection(db, "products"), {
            title: values.title,
            slug: values.slug,
            description: values.description,
            price: Number(values.price),
            salePrice: Number(values.salePrice),
            sku: values.sku,
            images: values.images,
            categoryId: values.categoryId,
            tags: values.tags,
            stock: Number(values.stock),
            attributes: values.attributes,
            createdAt: serverTimestamp()
          });

          alert("Product Added Successfully");
        }
        resetForm();
        setEdit(null);
      } catch (error) {
        console.log(error);
      }
    }
  })

  const { handleChange, handleSubmit, values } = formik;

  return (
    <div className="admin-form">
      <h3 className="mb-4">Create Product</h3>

      <form onSubmit={handleSubmit}>
        {/* Product Title */}
        <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter Product Title"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        {/* Slug */}
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            name="slug"
            className="form-control"
            placeholder="Enter Product Slug"
            value={values.slug}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            rows="5"
            name="description"
            className="form-control"
            placeholder="Enter Product Description"
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="row">

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter Price"
              value={values.price}
              onChange={handleChange}
            />
          </div>

          {/* Sale Price */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              className="form-control"
              placeholder="Enter Sale Price"
              value={values.salePrice}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* SKU */}
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input
            type="text"
            name="sku"
            className="form-control"
            placeholder="Enter SKU"
            value={values.sku}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div className="mb-3">
          <label className="form-label">Product Images</label>
          <input
            type="file"
            name="images"
            className="form-control"
            multiple
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="categoryId"
            className="form-select"
            value={values.categoryId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="living-room">Living Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="office">Office</option>
            <option value="dining">Dining</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            placeholder="Luxury, Wooden, Modern"
            value={values.tags}
            onChange={handleChange}
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Enter Stock"
            value={values.stock}
            onChange={handleChange}
          />
        </div>

        {/* Attributes */}
        <div className="mb-3">
          <label className="form-label">Attributes</label>
          <textarea
            rows="4"
            name="attributes"
            className="form-control"
            placeholder='Example: {"Color":"Brown","Material":"Wood","Size":"Large"}'
            value={values.attributes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-admin">
            Save Product
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProductCreate;