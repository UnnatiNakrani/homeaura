import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './rotues/PublicRoute';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from './constant/RoutesConstant';
import Error from './pages/common/Error';
import PrivateRoute from './rotues/PrivateRoute';
import { ROLES } from './constant/CommonConstant';
import Dashboard from './pages/admin/Dashboard';
import Home from './pages/user/Home';
import { createAdmin } from './helper/AuthHelper';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import About from './pages/user/About';
import Shop from './pages/user/Shop';
import Services from './pages/user/Services';
import Blog from './pages/user/Blog';
import Contact from './pages/user/Contact';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
    // <Routes>
    //   <Route path='/about' element={<About />} />
    // </Routes>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
        <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
      </Route>

      <Route element={<PrivateRoute role={ROLES.USER} />}>
        {/* <Header /> */}
        <Route path={USER_ROUTE.HOME} element={<Home />} />
        <Route path={USER_ROUTE.SHOP} element={<Shop />}/>
        <Route path={USER_ROUTE.ABOUTUS} element={<About />}/>
        <Route path={USER_ROUTE.SERVICES} element={<Services />}/>
        <Route path={USER_ROUTE.BLOG} element={<Blog />}/>
        <Route path={USER_ROUTE.CONTACTUS} element={<Contact />}/>
        {/* <Footer /> */}
      </Route>

      <Route element={<PrivateRoute role={ROLES.ADMIN} />}>
        <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
      </Route>

      <Route path={AUTH_ROUTE.ERROR} element={<Error />} />
    </Routes>
  );
}

export default App;