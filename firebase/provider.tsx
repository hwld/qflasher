import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import {
  AuthProvider as FirebaseAuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { firebaseConfig } from "./config";

const AppProvider: React.FC = ({ children }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
};

const Provider: React.FC = ({ children }) => {
  const [isEmulatorConnected, setIsEmulatorConnected] = useState(false);

  const app = useFirebaseApp();
  const auth = getAuth(app);
  const fireStore = getFirestore(app);

  if (!isEmulatorConnected && process.env.NODE_ENV !== "production") {
    connectFirestoreEmulator(fireStore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    setIsEmulatorConnected(true);
  }

  return (
    <FirebaseAuthProvider sdk={auth}>
      <FirestoreProvider sdk={fireStore}>{children}</FirestoreProvider>
    </FirebaseAuthProvider>
  );
};

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <AppProvider>
      <Provider>{children}</Provider>
    </AppProvider>
  );
};
