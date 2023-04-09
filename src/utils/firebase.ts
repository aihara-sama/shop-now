// Import the functions you need from the SDKs you need
import { firebaseConfig } from "configs";
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export default app;
