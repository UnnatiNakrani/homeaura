import React from 'react';
import { Link } from 'react-router-dom';

function Checkout(props) {
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
            {/* Start Hero Section */}
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Checkout</h1>
                                <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                                <p><Link href className="btn btn-secondary me-2">Shop Now</Link><Link to="#" className="btn btn-white-outline">Explore</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img-wrap">
                                <img src="../assets/images/couch.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero Section */}
            <div className="untree_co-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <div className="border p-4 rounded" role="alert">
                                Returning customer? <a href="#">Click here</a> to login
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-5 mb-md-0">
                            <h2 className="h3 mb-3 text-black">Billing Details</h2>
                            <div className="p-3 p-lg-5 border bg-white">
                                <div className="form-group">
                                    <label htmlFor="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                                    <select id="c_country" className="form-control">
                                        <option value={1}>Select a country</option>
                                        <option value={2}>bangladesh</option>
                                        <option value={3}>Algeria</option>
                                        <option value={4}>Afghanistan</option>
                                        <option value={5}>Ghana</option>
                                        <option value={6}>Albania</option>
                                        <option value={7}>Bahrain</option>
                                        <option value={8}>Colombia</option>
                                        <option value={9}>Dominican Republic</option>
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_fname" name="c_fname" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_lname" name="c_lname" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_companyname" className="text-black">Company Name </label>
                                        <input type="text" className="form-control" id="c_companyname" name="c_companyname" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_address" name="c_address" placeholder="Street address" />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_state_country" name="c_state_country" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_postal_zip" name="c_postal_zip" />
                                    </div>
                                </div>
                                <div className="form-group row mb-5">
                                    <div className="col-md-6">
                                        <label htmlFor="c_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_email_address" name="c_email_address" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="c_phone" name="c_phone" placeholder="Phone Number" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_create_account" className="text-black" data-bs-toggle="collapse" href="#create_an_account" role="button" aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" defaultValue={1} id="c_create_account" /> Create an account?</label>
                                    <div className="collapse" id="create_an_account">
                                        <div className="py-2 mb-4">
                                            <p className="mb-3">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            <div className="form-group">
                                                <label htmlFor="c_account_password" className="text-black">Account Password</label>
                                                <input type="email" className="form-control" id="c_account_password" name="c_account_password" placeholder />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_ship_different_address" className="text-black" data-bs-toggle="collapse" href="#ship_different_address" role="button" aria-expanded="false" aria-controls="ship_different_address"><input type="checkbox" defaultValue={1} id="c_ship_different_address" /> Ship To A Different Address?</label>
                                    <div className="collapse" id="ship_different_address">
                                        <div className="py-2">
                                            <div className="form-group">
                                                <label htmlFor="c_diff_country" className="text-black">Country <span className="text-danger">*</span></label>
                                                <select id="c_diff_country" className="form-control">
                                                    <option value={1}>Select a country</option>
                                                    <option value={2}>bangladesh</option>
                                                    <option value={3}>Algeria</option>
                                                    <option value={4}>Afghanistan</option>
                                                    <option value={5}>Ghana</option>
                                                    <option value={6}>Albania</option>
                                                    <option value={7}>Bahrain</option>
                                                    <option value={8}>Colombia</option>
                                                    <option value={9}>Dominican Republic</option>
                                                </select>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_fname" name="c_diff_fname" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_lname" name="c_diff_lname" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <label htmlFor="c_diff_companyname" className="text-black">Company Name </label>
                                                    <input type="text" className="form-control" id="c_diff_companyname" name="c_diff_companyname" />
                                                </div>
                                            </div>
                                            <div className="form-group row  mb-3">
                                                <div className="col-md-12">
                                                    <label htmlFor="c_diff_address" className="text-black">Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_address" name="c_diff_address" placeholder="Street address" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_state_country" name="c_diff_state_country" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_postal_zip" name="c_diff_postal_zip" />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-5">
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_email_address" name="c_diff_email_address" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="c_diff_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="c_diff_phone" name="c_diff_phone" placeholder="Phone Number" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="c_order_notes" className="text-black">Order Notes</label>
                                    <textarea name="c_order_notes" id="c_order_notes" cols={30} rows={5} className="form-control" placeholder="Write your notes here..." defaultValue={""} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <label htmlFor="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                                        <div className="input-group w-75 couponcode-wrap">
                                            <input type="text" className="form-control me-2" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-black btn-sm" type="button" id="button-addon2">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        <table className="table site-block-order-table mb-5">
                                            <thead>
                                                <tr><th>Product</th>
                                                    <th>Total</th>
                                                </tr></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Top Up T-Shirt <strong className="mx-2">x</strong> 1</td>
                                                    <td>$250.00</td>
                                                </tr>
                                                <tr>
                                                    <td>Polo Shirt <strong className="mx-2">x</strong>   1</td>
                                                    <td>$100.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                                                    <td className="text-black">$350.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                                                    <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="border p-3 mb-3">
                                            <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">Direct Bank Transfer</a></h3>
                                            <div className="collapse" id="collapsebank">
                                                <div className="py-2">
                                                    <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border p-3 mb-3">
                                            <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque">Cheque Payment</a></h3>
                                            <div className="collapse" id="collapsecheque">
                                                <div className="py-2">
                                                    <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border p-3 mb-5">
                                            <h3 className="h6 mb-0"><a className="d-block" data-bs-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>
                                            <div className="collapse" id="collapsepaypal">
                                                <div className="py-2">
                                                    <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-black btn-lg py-3 btn-block" onclick="window.location='thankyou.html'">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
            {/* Start Footer Section */}
            <footer className="footer-section">
                <div className="container relative">
                    <div className="sofa-img">
                        <img src="images/sofa.png" alt="Image" className="img-fluid" />
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="subscription-form">
                                <h3 className="d-flex align-items-center"><span className="me-1"><img src="images/envelope-outline.svg" alt="Image" className="img-fluid" /></span><span>Subscribe to Newsletter</span></h3>
                                <form action="#" className="row g-3">
                                    <div className="col-auto">
                                        <input type="text" className="form-control" placeholder="Enter your name" />
                                    </div>
                                    <div className="col-auto">
                                        <input type="email" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary">
                                            <span className="fa fa-paper-plane" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 mb-5">
                        <div className="col-lg-4">
                            <div className="mb-4 footer-logo-wrap"><a href="#" className="footer-logo">Furni<span>.</span></a></div>
                            <p className="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>
                            <ul className="list-unstyled custom-social">
                                <li><a href="#"><span className="fa fa-brands fa-facebook-f" /></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-twitter" /></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-instagram" /></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-linkedin" /></a></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="row links-wrap">
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contact us</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">Knowledge base</a></li>
                                        <li><a href="#">Live chat</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Jobs</a></li>
                                        <li><a href="#">Our team</a></li>
                                        <li><a href="#">Leadership</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Nordic Chair</a></li>
                                        <li><a href="#">Kruzo Aero</a></li>
                                        <li><a href="#">Ergonomic Chair</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-top copyright">
                        <div className="row pt-4">
                            <div className="col-lg-6">
                                <p className="mb-2 text-center text-lg-start">Copyright ©. All Rights Reserved. — Designed with love by <a href="https://untree.co">Untree.co</a> Distributed By <a hreff="https://themewagon.com">ThemeWagon</a>  {/* License information: https://untree.co/license/ */}
                                </p>
                            </div>
                            <div className="col-lg-6 text-center text-lg-end">
                                <ul className="list-unstyled d-inline-flex ms-auto">
                                    <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* End Footer Section */}
        </div>

    );
}

export default Checkout;