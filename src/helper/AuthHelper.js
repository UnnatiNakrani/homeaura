import { toast } from "react-toastify";
import { DEFAULT_ADMIN, ROLES } from "../constant/CommonConstant"
import { STORAGE_KEYS } from "../constant/StorageConstant"

export const createAdmin = () => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]").filter((user) => user.role !== ROLES.ADMIN);

    const admin = {
        name: DEFAULT_ADMIN.NAME,
        email: DEFAULT_ADMIN.EMAIL,
        mobile: DEFAULT_ADMIN.MOBILE,
        password: DEFAULT_ADMIN.PASSWORD,
        confirmpassword: DEFAULT_ADMIN.CONFIRMPASSWORD,
        role: DEFAULT_ADMIN.ROLE,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: false,
        lastLoginTime: []
    };
    users.push(admin);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export const checkLogin = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGIN_FLAG) || "false");
}

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGIN_USER) || "null");
}

export const getLoggedInUserRole = () => {
    return getLoggedInUser()?.role || ROLES.USER;
};

export const authLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_FLAG);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_USER);
    toast.success("Logout successful ✅");
}
export const deleteAccount = (id, role = ROLES.USER) => {

}

export const recoverAccount = (id) => {

}
