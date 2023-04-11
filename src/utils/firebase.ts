// Import the functions you need from the SDKs you need
import { firebaseConfig } from "configs";
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const googleProvider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
