import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import PublicRoute from './rotues/PublicRoute';
// import Login from './pages/common/Login';
// import Register from './pages/common/Register';
// import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from './constant/RoutesConstant';
// import Error from './pages/common/Error';
// import PrivateRoute from './rotues/PrivateRoute';
// import { ROLES } from './constant/CommonConstant';
// import Dashboard from './pages/admin/Dashboard';
import Home from './pages/user/Home';
import About from './pages/user/About';
import Shop from './pages/user/Shop';
import Contact from './pages/user/Contact';
import Services from './pages/user/Services';
import Blog from './pages/user/Blog';
import Thankyou from './pages/user/Thankyou';
import Checkout from './pages/user/Checkout';
import Cart from './pages/user/Cart';
import Login from './pages/common/Login';
import Register from './pages/common/Register';

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/thank' element={<Thankyou />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> */}

    </Routes>
      {/* <Routes>
        <Route element={<PublicRoute />}>
          <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
          <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
        </Route>

        <Route element={<PrivateRoute role={ROLES.USER} />}>
          <Route path={USER_ROUTE.HOME} element={<Home />} />
        </Route>

        <Route element={<PrivateRoute role={ROLES.ADMIN} />}>
          <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
        </Route>

        <Route path={AUTH_ROUTE.ERROR} element={<Error />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;