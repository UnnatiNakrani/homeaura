import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

function ShopCard({ limit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        setProducts(products.slice(0, limit))
    }, [])

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
                        to={`/product/${product.id}`}
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

                        <span className="icon-cross">
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