import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";

function CategoryCreate() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      parentId: "",
      description: "",
      // image: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Category name is required")
        .min(3, "Minimum 3 characters"),

      slug: Yup.string()
        .required("Slug is required"),

      parentId: Yup.string(),

      description: Yup.string()
        .required("Description is required")
        .min(10, "Minimum 10 characters"),

      // image: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {

        // let imageUrl = "";

        // if (values.image) {

        //   const imageRef = ref(
        //     storage,
        //     `categories/${Date.now()}-${values.image.name}`
        //   );

        //   await uploadBytes(imageRef, values.image);

        //   imageUrl = await getDownloadURL(imageRef);
        // }

        await addDoc(collection(db, "categories"), {
          name: values.name,
          slug: values.slug,
          parentId: values.parentId,
          description: values.description,
          // image: imageUrl,
          createdAt: Timestamp.now(),
        });

        alert("Category Created Successfully");

        resetForm();

        navigate("/categories");

      } catch (error) {
        console.log(error);
      }
    },
  });

  // const handleImageChange = (e) => {
  //   formik.setFieldValue("image", e.target.files[0]);
  // };

  return (
    <div className="container-fluid">

      <div className="page-header mb-4">
        <h2>Create Category</h2>
      </div>

      <CategoryForm
        values={formik.values}
        errors={formik.errors}
        touched={formik.touched}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        handleSubmit={formik.handleSubmit}
        // handleImageChange={handleImageChange}
        buttonText="Create Category"
      />

    </div>
  );
}

export default CategoryCreate;