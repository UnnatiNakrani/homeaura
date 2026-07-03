import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFormik } from "formik";
import { db } from "../../../firebase";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

function ProductCreate() {

  const [product, setProduct] = useState({});
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();

  const ProductSchema = Yup.object({

    title: Yup.string()
      .trim()
      .required("Product title is required")
      .min(3, "Minimum 3 characters")
      .max(100, "Maximum 100 characters"),

    slug: Yup.string()
      .trim()
      .required("Slug is required")
      .matches(
        /^[a-z0-9-]+$/,
        "Slug can contain only lowercase letters, numbers and hyphens"
      ),

    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(20, "Description must be at least 20 characters"),

    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than 0"),

    salePrice: Yup.number()
      .typeError("Sale price must be a number")
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .min(0, "Sale price cannot be negative")
      .test(
        "salePrice",
        "Sale price cannot be greater than price",
        function (value) {
          if (value == null) return true;

          return value <= this.parent.price;
        }
      ),

    sku: Yup.string()
      .trim()
      .required("SKU is required")
      .min(3, "SKU must be at least 3 characters")
      .max(30, "SKU cannot exceed 30 characters"),

    // images: Yup.mixed()
    //   .required("Please select a product image"),

    categoryId: Yup.string()
      .required("Please select a category"),

    tags: Yup.string()
      .trim()
      .required("Tags are required"),

    stock: Yup.number()
      .typeError("Stock must be a number")
      .required("Stock is required")
      .min(0, "Stock cannot be negative"),

    attributes: Yup.string()
      .trim()
      .required("Attributes are required")

  });

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      price: "",
      salePrice: "",
      sku: "",
      // images: "",
      categoryId: "",
      tags: "",
      stock: "",
      attributes: ""
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitted", values);
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
            // images: values.images,
            categoryId: values.categoryId,
            tags: values.tags,
            stock: Number(values.stock),
            attributes: values.attributes,
            createdAt: serverTimestamp()
          });

          alert("Product Added Successfully");
          navigate("/products");
        }
        resetForm();
        setEdit(null);
      } catch (error) {
        console.log(error);
      }
    }
  })

  const { handleChange, handleSubmit, handleBlur, values, touched, errors } = formik;

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
            onBlur={handleBlur}

          />
          {touched.title && errors.title && (
            <small className="text-danger">
              {errors.title}
            </small>
          )}
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
            onBlur={handleBlur}

          />
          {touched.slug && errors.slug && (
            <small className="text-danger">
              {errors.slug}
            </small>
          )}
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
            onBlur={handleBlur}

          ></textarea>
          {touched.description && errors.description && (
            <small className="text-danger">
              {errors.description}
            </small>
          )}
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
              onBlur={handleBlur}

            />
            {touched.price && errors.price && (
              <small className="text-danger">
                {errors.price}
              </small>
            )}
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
              onBlur={handleBlur}

            />
            {touched.salePrice && errors.salePrice && (
              <small className="text-danger">
                {errors.salePrice}
              </small>
            )}
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
          {touched.sku && errors.sku && (
            <small className="text-danger">
              {errors.sku}
            </small>
          )}
        </div>

        {/* Images */}
        {/* <div className="mb-3">
          <label className="form-label">Product Images</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              formik.setFieldValue("images", e.target.files[0])
            }
          />
          {touched.images && errors.images && (
            <small className="text-danger">{errors.images}</small>
          )}
        </div> */}

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
          {touched.categoryId && errors.categoryId && (
            <small className="text-danger">
              {errors.categoryId}
            </small>
          )}
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
          {touched.tags && errors.tags && (
            <small className="text-danger">
              {errors.tags}
            </small>
          )}
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
          {touched.stock && errors.stock && (
            <small className="text-danger">
              {errors.stock}
            </small>
          )}
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
          {touched.attributes && errors.attributes && (
            <small className="text-danger">
              {errors.attributes}
            </small>
          )}
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