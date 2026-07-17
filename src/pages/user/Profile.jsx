import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    doc,
    getDoc,
    updateDoc,
    Timestamp
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import ProfileForm from "../../components/user/Profile/ProfileForm";
import Header from "../../components/common/Header";

function Profile() {

    const [loading, setLoading] = useState(true);

    const formik = useFormik({

        initialValues: {
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            gender: "",
            dob: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            image: "",
            imagePreview: "",
            imageFile: null,
        },

        validationSchema: Yup.object({
            fname: Yup.string().required("First name is required"),

            lname: Yup.string().required("Last name is required"),

            mobile: Yup.string()
                .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
                .required("Mobile is required"),

            country: Yup.string().required("Country is required"),

            state: Yup.string().required("State is required"),

            city: Yup.string().required("City is required"),

            address: Yup.string().required("Address is required"),

            pincode: Yup.string()
                .matches(/^\d{6}$/, "Pincode must be 6 digits")
                .required("Pincode is required"),
        }),

        onSubmit: async (values) => {
            try {

                let imageUrl = values.image;

                if (values.imageFile) {

                    const imageRef = ref(
                        storage,
                        `profile/${auth.currentUser.uid}-${Date.now()}`
                    );

                    await uploadBytes(imageRef, values.imageFile);

                    imageUrl = await getDownloadURL(imageRef);
                }

                await updateDoc(
                    doc(db, "users", auth.currentUser.uid),
                    {
                        fname: values.fname,
                        lname: values.lname,
                        mobile: values.mobile,
                        gender: values.gender,
                        dob: values.dob,
                        address: values.address,
                        city: values.city,
                        state: values.state,
                        country: values.country,
                        pincode: values.pincode,
                        image: imageUrl,
                        updatedAt: Timestamp.now(),
                    }
                );

                alert("Profile Updated Successfully");

            } catch (error) {
                console.log(error);
            }
        },

    });

    useEffect(() => {

        const getProfile = async () => {

            try {

                const snap = await getDoc(
                    doc(db, "users", auth.currentUser.uid)
                );

                if (snap.exists()) {

                    const data = snap.data();

                    formik.setValues({
                        fname: data.fname || "",
                        lname: data.lname || "",
                        email: data.email || "",
                        mobile: data.mobile || "",
                        gender: data.gender || "",
                        dob: data.dob || "",
                        address: data.address || "",
                        city: data.city || "",
                        state: data.state || "",
                        pincode: data.pincode || "",
                        country: data.country || "",
                        image: data.image || "",
                        imagePreview: data.image || "",
                        imageFile: null,
                    });

                }

            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };
        getProfile();

    }, []);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        formik.setFieldValue("imageFile", file);

        formik.setFieldValue(
            "imagePreview",
            URL.createObjectURL(file)
        );

    };

    if (loading) {

        return (
            <div className="container py-5 text-center">
                <h4>Loading Profile...</h4>
            </div>
        );

    }

    return (
        <div>
            <Header />
            <div className="container py-5">

                <ProfileForm
                    values={formik.values}
                    errors={formik.errors}
                    touched={formik.touched}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    handleSubmit={formik.handleSubmit}
                    handleImageChange={handleImageChange}
                    buttonText="Update Profile"
                />

            </div>
        </div>

    );

}

export default Profile;