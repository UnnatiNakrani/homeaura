import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import FeaturesSection from '../../components/user/FeaturesSection/FeaturesSection';
import ProductSection from '../../components/user/ProductSection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function Services(props) {
    return (
        <div>
            <Header />
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
            
                <div className="container">
                    <FeaturesSection limit={4} className="col-6 col-lg-3" />
                </div>
           
            {/* End Why Choose Us Section */}
            {/* Start Product Section */}
            <ProductSection />
            {/* End Product Section */}
            
            <Footer />
        </div>

    );
}

export default Services;