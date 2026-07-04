import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../../../firebase";
import CategoryForm from "./CategoryForm";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      parentId: "",
      description: "",
      image: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required"),

      slug: Yup.string()
        .required("Slug is required"),

      description: Yup.string()
        .required("Description is required"),

      parentId: Yup.string(),
    }),

    onSubmit: async (values) => {
      try {

        let imageUrl = values.image;

        // Upload new image if selected
        if (values.image instanceof File) {

          const imageRef = ref(
            storage,
            `categories/${Date.now()}-${values.image.name}`
          );

          await uploadBytes(imageRef, values.image);

          imageUrl = await getDownloadURL(imageRef);
        }

        await updateDoc(doc(db, "categories", id), {
          name: values.name,
          slug: values.slug,
          parentId: values.parentId,
          description: values.description,
          image: imageUrl,
          updatedAt: Timestamp.now(),
        });

        alert("Category Updated Successfully");

        navigate("/categories");

      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {

      const docRef = doc(db, "categories", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        formik.setValues({
          name: docSnap.data().name || "",
          slug: docSnap.data().slug || "",
          parentId: docSnap.data().parentId || "",
          description: docSnap.data().description || "",
          image: docSnap.data().image || "",
        });

      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };

  return (
    <div className="container">

      <div className="page-header mb-4">
        <h2>Edit Category</h2>
      </div>

      <CategoryForm
        values={formik.values}
        errors={formik.errors}
        touched={formik.touched}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        handleSubmit={formik.handleSubmit}
        handleImageChange={handleImageChange}
        buttonText="Update Category"
      />

      {typeof formik.values.image === "string" &&
        formik.values.image && (
          <div className="mt-3">
            <img
              src={formik.values.image}
              alt="Category"
              width="180"
              className="rounded border"
            />
          </div>
        )}

    </div>
  );
}

export default CategoryEdit;