import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import { uploadImage } from "../../../helper/cloudinary";

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    content: "",
    status: "Published",
    image: null,
    oldImage: "",
  });

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const blogRef = doc(db, "blogs", id);

      const snapshot = await getDoc(blogRef);

      if (snapshot.exists()) {
        const data = snapshot.data();

        setInitialValues({
          title: data.title || "",
          category: data.category || "",
          author: data.author || "",
          description: data.description || "",
          content: data.content || "",
          status: data.status || "Published",
          image: null,
          oldImage: data.image || "",
        });
      } else {
        alert("Blog not found");
        navigate("/admin/blogs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      let imageUrl = values.oldImage;

      // Upload new image only if selected
      if (values.image) {
        imageUrl = await uploadImage(values.image);
      }

      const slug = values.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      await updateDoc(doc(db, "blogs", id), {
        title: values.title,
        slug,
        category: values.category,
        author: values.author,
        description: values.description,
        content: values.content,
        status: values.status,
        image: imageUrl,
      });

      alert("Blog updated successfully!");

      navigate("/admin/blogs");

    } catch (error) {
      console.log(error);
      alert("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

    if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="card shadow-sm">

        <div className="card-header">
          <h3>Edit Blog</h3>
        </div>

        <div className="card-body">

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (

              <form onSubmit={handleSubmit}>

                {/* Title */}

                <div className="mb-3">
                  <label className="form-label">
                    Blog Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
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

                {/* Category */}

                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.category && errors.category && (
                    <small className="text-danger">
                      {errors.category}
                    </small>
                  )}
                </div>

                {/* Author */}

                <div className="mb-3">
                  <label className="form-label">
                    Author
                  </label>

                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.author && errors.author && (
                    <small className="text-danger">
                      {errors.author}
                    </small>
                  )}
                </div>

                {/* Description */}

                <div className="mb-3">
                  <label className="form-label">
                    Short Description
                  </label>

                  <textarea
                    rows="3"
                    name="description"
                    className="form-control"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.description && errors.description && (
                    <small className="text-danger">
                      {errors.description}
                    </small>
                  )}
                </div>

                {/* Content */}

                <div className="mb-3">
                  <label className="form-label">
                    Blog Content
                  </label>

                  <textarea
                    rows="8"
                    name="content"
                    className="form-control"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.content && errors.content && (
                    <small className="text-danger">
                      {errors.content}
                    </small>
                  )}
                </div>

                {/* Status */}

                <div className="mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    name="status"
                    className="form-select"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>
                </div>

                {/* Current Image */}

                {values.oldImage && (
                  <div className="mb-3">

                    <label className="form-label">
                      Current Image
                    </label>

                    <br />

                    <img
                      src={values.oldImage}
                      alt="Blog"
                      width="220"
                      className="img-thumbnail"
                    />

                  </div>
                )}

                {/* Change Image */}

                <div className="mb-4">

                  <label className="form-label">
                    Change Image
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue(
                        "image",
                        e.currentTarget.files[0]
                      )
                    }
                  />

                  {values.image && (
                    <div className="mt-3">

                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Preview"
                        width="220"
                        className="img-thumbnail"
                      />

                    </div>
                  )}

                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Blog"}
                </button>

              </form>

            )}
          </Formik>

        </div>

      </div>

    </div>
  );
}

export default BlogEdit;