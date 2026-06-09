import React from 'react';
import { checkLogin, getLoggedInUserRole } from '../helper/AuthHelper';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLES } from '../constant/CommonConstant';
import { ADMIN_ROUTE, USER_ROUTE } from '../constant/RoutesConstant';

function PublicRoute() {

    const isLoggedIn = checkLogin();
    const role = getLoggedInUserRole();

    if (isLoggedIn)
        return <Navigate to={role === ROLES.ADMIN ? ADMIN_ROUTE.DASHBOARD : USER_ROUTE.HOME} replace />

    return <Outlet />
};

export default PublicRoute;