import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';

function Contact(props) {
    return (
        <div>
            {/* Start Header/Navigation */}
                        <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
                            <div className="container">
                                <Link className="navbar-brand" to="index.html">Furni<span>.</span></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarsFurni">
                                    <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home</Link>
                                        </li>
                                        <li><Link className="nav-link" to="/shop">Shop</Link></li>
                                        <li><Link className="nav-link" to="/about">About us</Link></li>
                                        <li><Link className="nav-link" to="/services">Services</Link></li>
                                        <li><Link className="nav-link" to="/blog">Blog</Link></li>
                                        <li><Link className="nav-link" to="/contact">Contact us</Link></li>
                                    </ul>
                                    <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                                        <li><Link className="nav-link" to="/register"><img src="../assets/images/user.svg" /></Link></li>
                                        <li><Link className="nav-link" to="/cart"><img src="../assets/images/cart.svg" /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* End Header/Navigation */}
            
            {/* Start Hero Section */}
            <Hero
            title="Contact us"
            description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            primaryBtnText="Shop Now"
            primaryBtnLink="/shop"
            secondaryBtnText="Explore"
            secondaryBtnLink="/about"
            image="/assets/images/couch.png"
        />
           
            {/* End Hero Section */}
            {/* Start Contact Form */}
            <div className="untree_co-section">
                <div className="container">
                    <div className="block">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-8 pb-4">
                                <div className="row mb-5">
                                    <div className="col-lg-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay={0}>
                                            <div className="service-icon color-1 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                </svg>
                                            </div> {/* /.icon */}
                                            <div className="service-contents">
                                                <p>43 Raymouth Rd. Baltemoer, London 3910</p>
                                            </div> {/* /.service-contents*/}
                                        </div> {/* /.service */}
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay={0}>
                                            <div className="service-icon color-1 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                                </svg>
                                            </div> {/* /.icon */}
                                            <div className="service-contents">
                                                <p>info@yourdomain.com</p>
                                            </div> {/* /.service-contents*/}
                                        </div> {/* /.service */}
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay={0}>
                                            <div className="service-icon color-1 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                                </svg>
                                            </div> {/* /.icon */}
                                            <div className="service-contents">
                                                <p>+1 294 3925 3939</p>
                                            </div> {/* /.service-contents*/}
                                        </div> {/* /.service */}
                                    </div>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="fname">First name</label>
                                                <input type="text" className="form-control" id="fname" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="lname">Last name</label>
                                                <input type="text" className="form-control" id="lname" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group mb-5">
                                        <label className="text-black" htmlFor="message">Message</label>
                                        <textarea name className="form-control" id="message" cols={30} rows={5} defaultValue={""} />
                                    </div>
                                    <button type="submit" className="btn btn-primary-hover-outline">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Contact Form */}
        </div>

    );
}

export default Contact;