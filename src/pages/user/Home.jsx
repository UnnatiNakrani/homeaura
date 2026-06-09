import React from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Hero from '../../components/common/Hero';
import ShopCart from '../../components/user/ShopCart';
import BlogSection from '../../components/user/Blog/BlogSection';
import TestimonialSection from '../../components/user/Testimonial/TestimonialSection';
import WhyChooseUs from '../../components/user/WhyChooseUs/WhyChooseUs';
import CustomButton from '../../components/common/CustomButton';
import ProductSection from '../../components/user/ProductSection';

function Home(props) {
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
                                <Link className="nav-link" to="index.html">Home</Link>
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
                title="Modern Interior"
                subtitle="Design Studio"
                description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique."
                primaryBtnText="Shop Now"
                primaryBtnLink="/shop"
                secondaryBtnText="Explore"
                secondaryBtnLink="/about"
                image="/assets/images/couch.png"
            />
            {/* End Hero Section */}

            {/* Start Product Section */}
            <ProductSection />
            {/* End Product Section */}

            {/* Start Why Choose Us Section */}
            <WhyChooseUs />
            {/* End Why Choose Us Section */}

            {/* Start We Help Section */}
            <div className="we-help-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="imgs-grid">
                                <div className="grid grid-1"><img src="../assets/images/img-grid-1.jpg" alt="Untree.co" /></div>
                                <div className="grid grid-2"><img src="../assets/images/img-grid-2.jpg" alt="Untree.co" /></div>
                                <div className="grid grid-3"><img src="../assets/images/img-grid-3.jpg" alt="Untree.co" /></div>
                            </div>
                        </div>
                        <div className="col-lg-5 ps-lg-5">
                            <h2 className="section-title mb-4">We Help You Make Modern Interior Design</h2>
                            <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>
                            <ul className="list-unstyled custom-list my-4">
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                            </ul>
                            <p>
                                <CustomButton to="shop" title="Explore" className="btn" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* End We Help Section */}

            {/* Start Popular Product */}
            <div className="popular-product">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-1.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Nordic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><Link to="#">Read More</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-2.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Kruzo Aero Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><Link to="#">Read More</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="../assets/images/product-3.png" alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Ergonomic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><Link to="#">Read More</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Popular Product */}

            {/* Start Testimonial Slider */}
           <TestimonialSection />
            {/* End Testimonial Slider */}
            
            {/* Start Blog Section */}
            <BlogSection limit={3} />            
            {/* End Blog Section */}

        </div>

    );
}

export default Home;