import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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

    snapshot.forEach((doc) => {
      console.log("Doc ID:", doc.id);
      console.log("Data:", doc.data());
    });
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

    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      // ...DEFAULT_ADMIN,
      fname: DEFAULT_ADMIN.NAME,
      email: DEFAULT_ADMIN.EMAIL,
      role: DEFAULT_ADMIN.ROLES,
      password:DEFAULT_ADMIN.PASSWORD,
      createdAt: new Date(),
    });

    console.log("Admin Created");
  } catch (error) {

    console.log(error);
  }
};