import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { ROLES } from "../constant/CommonConstant";
import { STORAGE_KEYS } from "../constant/StorageConstant";

// Check Login
export const checkLogin = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEYS.LOGIN_FLAG) || "false"
  );
};

// Logged In User
export const getLoggedInUser = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USERS) || "null"
  );
};

// Logged In User Role
export const getLoggedInUserRole = () => {
  return getLoggedInUser()?.role || ROLES.USER;
};

// Save Logged In User
export const setLoggedInUser = (user) => {
  localStorage.setItem(
    STORAGE_KEYS.USERS,
    JSON.stringify(user)
  );

  localStorage.setItem(
    STORAGE_KEYS.LOGIN_FLAG,
    JSON.stringify(true)
  );
};

// Logout
export const authLogout = async () => {
  try {
    await signOut(auth);

    localStorage.removeItem(STORAGE_KEYS.LOGIN_FLAG);
    localStorage.removeItem(STORAGE_KEYS.USERS);

    toast.success("Logout Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Logout Failed");
  }
};

// Firestore Snapshot => Array
export const getFirestoreData = (snapshot) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};