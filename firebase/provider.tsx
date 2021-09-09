import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
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
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const fireStore = getFirestore(app);
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
