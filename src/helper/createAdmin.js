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
  console.log("function clllllll");

  try {
    // Check if admin already exists
    const q = query(
      collection(db, "users"),
      where("email", "==", DEFAULT_ADMIN.EMAIL)
    );


    console.log(q, "qqq");


    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      console.log("Doc ID:", doc.id);
      console.log("Data:", doc.data());
    });
    console.log(snapshot, snapshot.empty, "snapshots");

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

    console.log(credential, "credentialcredentialcredentialcredential");
    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      // ...DEFAULT_ADMIN,
      fname: DEFAULT_ADMIN.NAME,
      email: DEFAULT_ADMIN.EMAIL,
      role: DEFAULT_ADMIN.ROLES,
      password:DEFAULT_ADMIN.PASSWORD,
      createdAt: new Date(),
    });


    // Save Admin in Firestore
    // await addDoc(collection(db, "users"), {
    //   uid: credential.user.uid,
    //   name: DEFAULT_ADMIN.NAME,
    //   email: DEFAULT_ADMIN.EMAIL,
    //   mobile: DEFAULT_ADMIN.MOBILE,
    //   role: DEFAULT_ADMIN.ROLE,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    console.log("Admin Created");
  } catch (error) {

    console.log(error, "errorerrorerrorerrorerror");

    console.log(error);
  }
};