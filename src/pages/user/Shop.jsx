import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import ShopCart from '../../components/user/ShopCart';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function Shop(props) {
    return (
        <div>
            <Header />
            {/* Start Hero Section */}
            <Hero
                title="Shop"
                description="Donec vitae odio quis nisl dapibus malesuada."
                primaryBtnText="Shop Now"
                primaryBtnLink="/shop"
                secondaryBtnText="Explore"
                secondaryBtnLink="/about"
                image="/assets/images/couch.png"
            />
            {/* End Hero Section */}
            <div class="untree_co-section product-section before-footer-section">
                <div class="container">
                    <div class="row">
                        <ShopCart limit={8} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default Shop;