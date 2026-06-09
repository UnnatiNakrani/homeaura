import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import ShopCart from '../../components/user/ShopCart';

function Shop(props) {
    return (
        <div>
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

           <ShopCart limit={8}/>

        </div>

    );
}

export default Shop;