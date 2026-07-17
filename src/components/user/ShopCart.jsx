import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

function ShopCard({ limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = async (product) => {
    console.log("Add to Cart clicked", product);

    try {

      const user = auth.currentUser;
      console.log("Current user:", user);

      if (!user) {
        toast.error("Please login first");
        return;
      }


      const q = query(
        collection(db, "cart"),
        where("userId", "==", user.uid),
        where("productId", "==", product.id)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const cartDoc = snapshot.docs[0];
        const cartData = cartDoc.data();
        await updateDoc(cartDoc.ref, {
          quantity: cartData.quantity + 1,
          total:
            (cartData.quantity + 1) *
            product.price
        });
      } else {
        await addDoc(collection(db, "cart"), {
          userId: user.uid,
          productId: product.id,
          title: product.title,
          image: product.images?.[0] || product.image,
          price: Number(product.price),
          quantity: 1,
          total: Number(product.price),
          stock: Number(product.stock),
          createdAt: new Date()
        });
      }
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      let productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Show only active products (optional)
      productList = productList.filter(
        (product) =>
          product.status === "Active" &&
          !product.isDeleted
      );
      // Limit products if limit prop is passed
      if (limit) {
        productList = productList.slice(0, limit);
      }
      setProducts(productList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Products...</h4>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No Products Found</h4>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="col-12 col-md-4 col-lg-3 mb-5"
        >
          <Link
            className="product-item"
            to={`/cart`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid product-thumbnail"
            />

            <h3 className="product-title">
              {product.title}
            </h3>

            <strong className="product-price">
              ₹{Number(product.price).toLocaleString()}
            </strong>

            <span
              className="icon-cross"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              <img
                src="/assets/images/cross.svg"
                alt="Add"
                className="img-fluid"
              />
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}

export default ShopCard;