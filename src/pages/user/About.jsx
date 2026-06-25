import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import TestimonialSection from '../../components/user/Testimonial/TestimonialSection';
import WhyChooseUs from '../../components/user/WhyChooseUs/WhyChooseUs';
import TeamSection from '../../components/user/Team/TeamSection';

function About(props) {
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
            title="About us"
            description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            primaryBtnText="Shop Now"
            primaryBtnLink="/shop"
            secondaryBtnText="Explore"
            secondaryBtnLink="/about"
            image="/assets/images/couch.png"
        />
            
            {/* End Hero Section */}
            {/* Start Why Choose Us Section */}
            <WhyChooseUs />
            {/* End Why Choose Us Section */}
            {/* Start Team Section */}
            <TeamSection />
            {/* End Team Section */}
            {/* Start Testimonial Slider */}
            <TestimonialSection />
            {/* End Testimonial Slider */}
        </div>

    );
}

export default About;