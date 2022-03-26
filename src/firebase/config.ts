import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebase =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebase);
const db = getFirestore(firebase);
// 開発時にlocal networkからemulatorにアクセスするときにipを直打ちする
const host = "localhost";

if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(auth, `http://${host}:9099`, {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, host, 8080);
}

export { firebase, auth, db };
