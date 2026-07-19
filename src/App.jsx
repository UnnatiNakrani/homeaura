import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './rotues/PublicRoute';
import { AUTH_ROUTE, USER_ROUTE } from './constant/RoutesConstant';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import Home from './pages/user/Home';
import About from './pages/user/About';
import PrivateRoute from './rotues/PrivateRoute';
import { ROLES } from './constant/CommonConstant';
import Shop from './pages/user/Shop';
import Services from './pages/user/Services';
import Contact from './pages/user/Contact';
import Cart from './pages/user/Cart';
import Thankyou from './pages/user/Thankyou';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import ProductList from './pages/admin/products/ProductList';
import ProductCreate from './pages/admin/products/ProductCreate';
import ProductEdit from './pages/admin/products/ProductEdit';
import OrderDetail from './pages/admin/orders/OrderDetail';
import UserDetail from './pages/admin/users/UserDetail';
import OrderList from './pages/admin/orders/OrderList';
import UserList from './pages/admin/users/UserList';
import CategoryList from './pages/admin/categories/CategoryList';
import CategoryCreate from './pages/admin/categories/CategoryCreate';
import CategoryEdit from './pages/admin/categories/CategoryEdit';
import { createAdmin } from "./helper/createAdmin";
import Profile from './pages/user/Profile';
import Checkout from './pages/user/Checkout';
import ContactList from './pages/admin/contact/ContactList';
import SiteSettings from './pages/admin/setting/SiteSettings';
import Blog from './pages/user/Blog';
import BlogManager from './pages/admin/blogs/BlogManager';
import BlogCreate from './pages/admin/blogs/Blogcreate';
import BlogEdit from './pages/admin/blogs/BlogEdit';
import BlogDetails from './pages/user/BlogDetails';
import InquiryList from './pages/admin/InquiryList';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);

  return (
    <Routes>
      <Route element={<PublicRoute />} >
        <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
        <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
      </Route>

      <Route element={<PrivateRoute role={ROLES.USER} />}>
        <Route path={USER_ROUTE.HOME} element={<Home />} />
        <Route path={USER_ROUTE.SHOP} element={<Shop />} />
        <Route path={USER_ROUTE.ABOUT} element={<About />} />
        <Route path={USER_ROUTE.SERVICES} element={<Services />} />
        <Route path={USER_ROUTE.BLOG} element={<Blog />} />
        <Route path={USER_ROUTE.CONTACTUS} element={<Contact />} />
        <Route path={USER_ROUTE.PROFILE} element={<Profile />} />
        <Route path={USER_ROUTE.CART} element={<Cart />} />
        <Route path={USER_ROUTE.THANKYOU} element={<Thankyou />} />
        <Route path={USER_ROUTE.CHECKOUT} element={<Checkout />} />
      </Route>

      <Route element={<PrivateRoute role={ROLES.ADMIN} />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />

          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CategoryCreate />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />

          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetail />} />

          <Route path="/blogs" element={<BlogManager />} />
          <Route path="/blogs/create" element={<BlogCreate />} />
          <Route path="/blogs/edit/:id" element={<BlogEdit />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />

          <Route path="/contact" element={<ContactList />} />
          <Route path="settings" element={<SiteSettings />} />

          <Route path="/inquiries" element={<InquiryList />} />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
