import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import FeaturesSection from '../../components/user/FeaturesSection/FeaturesSection';
import TestimonialSection from '../../components/user/Testimonial/TestimonialSection';
import ProductSection from '../../components/user/ProductSection';

function Services(props) {
    return (
        <div>
           {/* Start Hero Section */}
            <Hero
            title="Services"
            description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            primaryBtnText="Shop Now"
            primaryBtnLink="/shop"
            secondaryBtnText="Explore"
            secondaryBtnLink="/about"
            image="/assets/images/couch.png"
        />
         {/* End Hero Section */}
            {/* Start Why Choose Us Section */}
            <div className="why-choose-section">
                <div className="container">
                    <FeaturesSection limit={8} className="col-6 col-md-6 col-lg-3 mb-4"/>
                </div>
            </div>
            {/* End Why Choose Us Section */}
            {/* Start Product Section */}
           <ProductSection />
            {/* End Product Section */}
            {/* Start Testimonial Slider */}
            <TestimonialSection />
            {/* End Testimonial Slider */}
        </div>

    );
}

export default Services;