import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import PublicRoute from './rotues/PublicRoute';
// import Login from './pages/common/Login';
// import Register from './pages/common/Register';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from './constant/RoutesConstant';
// import Error from './pages/common/Error';
// import PrivateRoute from './rotues/PrivateRoute';
import { ROLES } from './constant/CommonConstant';
import Dashboard from './pages/admin/Dashboard';
// import Home from './pages/user/Home';
import { createAdmin } from './helper/AuthHelper';
import AdminLayout from './pages/admin/layout/AdminLayout';
import ProductCreate from './pages/admin/products/ProductCreate';
import ProductEdit from './pages/admin/products/ProductEdit';
import ProductList from './pages/admin/products/ProductList';
import CategoryManagement from './pages/admin/categories/CategoryManagement';
import OrderDetail from './pages/admin/orders/OrderDetail';
import OrderList from './pages/admin/orders/OrderList';
import BlogManager from './pages/admin/blogs/BlogManager';
import UserDetail from './pages/admin/users/UserDetail';
import UserList from './pages/admin/users/UserList';
import MediaLibrary from './pages/admin/media/MediaLibrary';
import AnalyticsDashboard from './pages/admin/analytics/AnalyticsDashboard';
import SupportMessages from './pages/admin/support/SupportMessages';
import SiteSettings from './pages/admin/setting/SiteSettings';
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
// import About from './pages/user/About';
// import Shop from './pages/user/Shop';
// import Services from './pages/user/Services';
// import Blog from './pages/user/Blog';
// import Contact from './pages/user/Contact';
// import Cart from './pages/user/Cart';
// import Thankyou from './pages/user/Thankyou';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
    <Routes>
      {/* //   <Route element={<PublicRoute />}>
    //     <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
    //     <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
    //   </Route> */}

      {/* //   <Route element={<PrivateRoute role={ROLES.USER} />}>
    //     <Header />
    //     <Route path={USER_ROUTE.HOME} element={<Home />} />
    //     <Route path={USER_ROUTE.SHOP} element={<Shop />}/>
    //     <Route path={USER_ROUTE.ABOUTUS} element={<About />}/>
    //     <Route path={USER_ROUTE.SERVICES} element={<Services />}/>
    //     <Route path={USER_ROUTE.BLOG} element={<Blog />}/>
    //     <Route path={USER_ROUTE.CONTACTUS} element={<Contact />}/>
    //     <Route path={USER_ROUTE.CART} element={<Cart />}/>
    //     <Route path={USER_ROUTE.THANKYOU} element={<Thankyou />}/>
    //     <Footer />
    //   </Route> */}

      {/* <Route element={<PrivateRoute role={ROLES.ADMIN} />}> */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="support" element={<SupportMessages />} />
        <Route path="settings" element={<SiteSettings />} />
      </Route>
      {/* </Route> */}

      {/* // <Route path={AUTH_ROUTE.ERROR} element={<Error />} /> */}
    </Routes >
  );
}

export default App;