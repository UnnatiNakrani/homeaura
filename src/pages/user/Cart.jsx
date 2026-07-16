import React from "react";
import Header from "../../components/common/Header";
import Hero from "../../components/common/Hero";
import Footer from "../../components/common/Footer";
import CartTable from "../../components/user/CartTable";

function Cart() {
  return (
    <>
      <Header />

      <Hero
        title="Cart"
        description="Review your shopping cart."
        primaryBtnText="Shop Now"
        primaryBtnLink="/shop"
        secondaryBtnText="Explore"
        secondaryBtnLink="/about"
        image="/assets/images/couch.png"
      />

      <CartTable />

      <Footer />
    </>
  );
}

export default Cart;