import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ShopCart({ limit }) {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Nordic Chair",
            price: 50,
            image: "/assets/images/product-1.png",
        },
        {
            id: 2,
            name: "Kruzo Aero Chair",
            price: 78,
            image: "/assets/images/product-2.png",
        },
        {
            id: 3,
            name: "Ergonomic Chair",
            price: 43,
            image: "/assets/images/product-3.png",
        },
        {
            id: 4,
            name: "Nordic Chair",
            price: 50,
            image: "/assets/images/product-1.png",
        },
        {
            id: 5,
            name: "Nordic Chair",
            price: 50,
            image: "/assets/images/product-2.png",
        },
        {
            id: 6,
            name: "Kruzo Aero Chair",
            price: 78,
            image: "/assets/images/product-3.png",
        },
        {
            id: 7,
            name: "Ergonomic Chair",
            price: 43,
            image: "/assets/images/product-1.png",
        },
        {
            id: 8,
            name: "Ergonomic Chair",
            price: 43,
            image: "/assets/images/product-3.png",
        },
    ]);

    useEffect(() => {
        setProducts(products.slice(0, limit))
    }, [])
    return (
        <>
        {
            products.map((product) => (
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
                            alt={product.name}
                            className="img-fluid product-thumbnail"
                        />

                        <h3 className="product-title">
                            {product.name}
                        </h3>

                        <strong className="product-price">
                            ${product.price.toFixed(2)}
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
            ))
        }
        </>
    )}

    export default ShopCart;