import React from 'react';
import { checkLogin, getLoggedInUserRole } from '../helper/AuthHelper';
import { toast } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from '../constant/RoutesConstant';
import { ROLES } from '../constant/CommonConstant';

function PrivateRoute({ role }) {

    const isLoggedIn = checkLogin();
    console.log('isLoggedIn', isLoggedIn)
    const userRole = getLoggedInUserRole();

    if(!isLoggedIn) {
        toast.warning("Please login to continue");
        return <Navigate to={AUTH_ROUTE.LOGIN} replace />
    }

    if (role && userRole !== role)
        return <Navigate to={userRole === ROLES.ADMIN ? ADMIN_ROUTE.DASHBOARD : USER_ROUTE.HOME} replace />

    return <Outlet />

}

export default PrivateRoute;