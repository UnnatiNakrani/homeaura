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

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
      <Routes>
        {/* <Route element={<PublicRoute />}> */}
          <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
          <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute role={ROLES.USER} />}> */}
          <Route path={USER_ROUTE.HOME} element={<Home />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute role={ROLES.ADMIN} />}> */}
          <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
         {/* </Route> */}

        // <Route path={AUTH_ROUTE.ERROR} element={<Error />} />
      </Routes>
  );
}

export default App;