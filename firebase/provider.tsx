import { getAuth } from "@firebase/auth";
import {
  AuthProvider as FirebaseAuthProvider,
  FirebaseAppProvider,
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
  return <FirebaseAuthProvider sdk={auth}>{children}</FirebaseAuthProvider>;
};

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <AppProvider>
      <Provider>{children}</Provider>
    </AppProvider>
  );
};
