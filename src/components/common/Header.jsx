import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div>
            {/* Start Header/Navigation */}
            <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
                <div className="container">
                    <Link className="navbar-brand" to="index.html">Furni<span>.</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="index.html">Home</Link>
                            </li>
                            <li><Link className="nav-link" to="shop.html">Shop</Link></li>
                            <li><Link className="nav-link" to="about.html">About us</Link></li>
                            <li><Link className="nav-link" to="services.html">Services</Link></li>
                            <li><Link className="nav-link" to="blog.html">Blog</Link></li>
                            <li><Link className="nav-link" to="contact.html">Contact us</Link></li>
                        </ul>
                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            <li><Link className="nav-link" to="#"><img src="../assets/images/user.svg" /></Link></li>
                            <li><Link className="nav-link" to="cart.html"><img src="../assets/images/cart.svg" /></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Header/Navigation */}
        </div>
    );
}

export default Header;