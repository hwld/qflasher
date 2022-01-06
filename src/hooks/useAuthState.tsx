import { auth } from "@/firebase/config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, {
      next: (user) => {
        setUser(user);
        setLoading(false);
      },
      error: (error) => {
        setError(error);
        setLoading(false);
      },
      complete: () => {},
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signOut = () => {
    return auth.signOut();
  };

  return { user, loading, error, signIn, signOut };
};
