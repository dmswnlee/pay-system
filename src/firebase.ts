import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSouoTlHT0j6jxTRKbQkIgqVDirEfBo-A",
  authDomain: "pay-system-ced41.firebaseapp.com",
  projectId: "pay-system-ced41",
  storageBucket: "pay-system-ced41.appspot.com",
  messagingSenderId: "1047121915564",
  appId: "1:1047121915564:web:d53241fdf376c9958d3909",
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const firestoreService = getFirestore(app);
export const firestorageService = getStorage(app);
