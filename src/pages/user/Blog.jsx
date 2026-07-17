import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import BlogSection from '../../components/user/Blog/BlogSection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function Blog(props) {
    return (
        <div>
            <Header />
            {/* Start Hero Section */}
            <Hero
                title="Blog"
            description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                primaryBtnText="Shop Now"
                primaryBtnLink="/shop"
                secondaryBtnText="Explore"
                secondaryBtnLink="/about"
                image="/assets/images/couch.png"
            />
            {/* End Hero Section */}
            {/* Start Blog Section */}
            <BlogSection limit={9} />
            {/* End Blog Section */}
           
            <Footer />
        </div>

    );
}

export default Blog;