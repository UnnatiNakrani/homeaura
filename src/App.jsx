import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createAdmin } from './helper/AuthHelper';
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
import Blog from './pages/user/Blog';
import Contact from './pages/user/Contact';
import Cart from './pages/user/Cart';
import Thankyou from './pages/user/Thankyou';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);

  return (
    <>
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
          <Route path={USER_ROUTE.CART} element={<Cart />} />
          <Route path={USER_ROUTE.THANKYOU} element={<Thankyou />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
