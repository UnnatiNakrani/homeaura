 import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Footer(props) {
   
const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
  },

  validationSchema: Yup.object({
    name: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
  }),

  onSubmit: async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "inquiries"), {
  type: "subscriber",
  name: values.name,
  email: values.email,
  createdAt: serverTimestamp(),
});

      toast.success("Subscribed Successfully");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  },
});

    return (
        <div>
            {/* Start Footer Section */}
            <footer className="footer-section">
                <div className="container relative">
                    <div className="sofa-img">
                        <img src="../assets/images/sofa.png" alt="Image" className="img-fluid" />
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="subscription-form">
                                <h3 className="d-flex align-items-center"><span className="me-1"><img src="../assets/images/envelope-outline.svg" alt="Image" className="img-fluid" /></span><span>Subscribe to Newsletter</span></h3>
<form onSubmit={formik.handleSubmit} className="row g-3">
                                        <div className="col-auto">
  <input
    type="text"
    className="form-control"
    placeholder="Enter your name"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />

  {formik.touched.name && formik.errors.name && (
    <small className="text-danger">
      {formik.errors.name}
    </small>
  )}
</div>
                                   <div className="col-auto">
  <input
    type="email"
    className="form-control"
    placeholder="Enter your email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />

  {formik.touched.email && formik.errors.email && (
    <small className="text-danger">
      {formik.errors.email}
    </small>
  )}
</div>
                                    <div className="col-auto">
  <button type="submit" className="btn btn-primary">
    <span className="fa fa-paper-plane"></span>
  </button>
</div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 mb-5">
                        <div className="col-lg-4">
                            <div className="mb-4 footer-logo-wrap"><Link to="#" className="footer-logo">Furni<span>.</span></Link></div>
                            <p className="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>
                            <ul className="list-unstyled custom-social">
                                <li><Link to="#"><span className="fa fa-brands fa-facebook-f" /></Link></li>
                                <li><Link to="#"><span className="fa fa-brands fa-twitter" /></Link></li>
                                <li><Link to="#"><span className="fa fa-brands fa-instagram" /></Link></li>
                                <li><Link to="#"><span className="fa fa-brands fa-linkedin" /></Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="row links-wrap">
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><Link to="/about">About us</Link></li>
                                        <li><Link to="/services">Services</Link></li>
                                        <li><Link to="/blog">Blog</Link></li>
                                        <li><Link to="/contact">Contact us</Link></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><Link to="#">Support</Link></li>
                                        <li><Link to="#">Knowledge base</Link></li>
                                        <li><Link to="#">Live chat</Link></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><Link to="#">Jobs</Link></li>
                                        <li><Link to="#">Our team</Link></li>
                                        <li><Link to="#">Leadership</Link></li>
                                        <li><Link to="#">Privacy Policy</Link></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><Link to="#">Nordic Chair</Link></li>
                                        <li><Link to="#">Kruzo Aero</Link></li>
                                        <li><Link to="#">Ergonomic Chair</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* End Footer Section */}
        </div>
    );
}

export default Footer;