import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Hero from "../../components/common/Hero";
import BlogSection from "../../components/user/Blog/BlogSection";

function Blog() {

    return (
        <>
            <Header />

            <Hero
                title="Blog"
                description="Read our latest articles, furniture trends, and interior design ideas."
                primaryBtnText="Shop Now"
                primaryBtnLink="/shop"
                secondaryBtnText="Explore"
                secondaryBtnLink="/about"
                image="/assets/images/couch.png"
            />

            <BlogSection />
            <Footer />
        </>
    );
}

export default Blog;