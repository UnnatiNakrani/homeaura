import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import * as Yup from "yup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadImage } from "../../../helper/cloudinary";

function ProductEdit() {
  const { id } = useParams();
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
      .required("Attributes are required"),
    status: Yup.string()
      .required("Status is required")

  });

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
      status: "Active",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {

        let imageUrl = values.images;

        // Upload only if a new file is selected
        if (values.images instanceof File) {
          imageUrl = await uploadImage(values.images);
        }

        await updateDoc(doc(db, "products", id), {
          title: values.title,
          slug: values.slug,
          description: values.description,
          price: Number(values.price),
          salePrice: Number(values.salePrice),
          sku: values.sku,
          images: imageUrl,
          categoryId: values.categoryId,
          tags: values.tags,
          stock: Number(values.stock),
          attributes: values.attributes,
          status: values.status,
          updatedAt: new Date(),
        });

        alert("Product Updated Successfully");

        navigate("/products");

      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e) => {
    formik.setFieldValue("images", e.target.files[0]);
  };

  const getProduct = async () => {
    try {
      const productRef = doc(db, "products", id);

      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {

        setValues({
          ...productSnap.data(),
          images: productSnap.data().images || "",
        });

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

  const { handleChange, handleSubmit, values, setValues } = formik;

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

          <label className="form-label">
            Product Image
          </label>

          {values.images && (
            <div className="mb-2">

              <img
                src={
                  values.images instanceof File
                    ? URL.createObjectURL(values.images)
                    : values.images
                }
                alt={values.title}
                width="180"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />

            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
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