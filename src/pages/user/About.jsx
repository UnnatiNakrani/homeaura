import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import WhyChooseUs from '../../components/user/WhyChooseUs/WhyChooseUs';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function About(props) {
    return (
        <div>
            <Header />
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
        
            <Footer />
        </div>

    );
}

export default About;