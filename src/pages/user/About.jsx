import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import TestimonialSection from '../../components/user/Testimonial/TestimonialSection';
import WhyChooseUs from '../../components/user/WhyChooseUs/WhyChooseUs';
import TeamSection from '../../components/user/Team/TeamSection';
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
            {/* Start Team Section */}
            <TeamSection />
            {/* End Team Section */}
            {/* Start Testimonial Slider */}
            <TestimonialSection />
            {/* End Testimonial Slider */}
            <Footer />
        </div>

    );
}

export default About;