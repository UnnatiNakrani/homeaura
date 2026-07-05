import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { DEFAULT_ADMIN } from "../constant/CommonConstant";

export const createAdmin = async () => {
  try {
    // Check if admin already exists
    const q = query(
      collection(db, "users"),
      where("email", "==", DEFAULT_ADMIN.EMAIL)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("Admin already exists");
      return;
    }

    // Create Authentication User
    const credential = await createUserWithEmailAndPassword(
      auth,
      DEFAULT_ADMIN.EMAIL,
      DEFAULT_ADMIN.PASSWORD
    );

    // Save Admin in Firestore
    await addDoc(collection(db, "users"), {
      uid: credential.user.uid,
      name: DEFAULT_ADMIN.NAME,
      email: DEFAULT_ADMIN.EMAIL,
      mobile: DEFAULT_ADMIN.MOBILE,
      role: DEFAULT_ADMIN.ROLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Admin Created");
  } catch (error) {
    console.log(error);
  }
};