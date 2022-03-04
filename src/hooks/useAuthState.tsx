import { auth } from "@/firebase/config";
import {
  deleteUser as deleteAccount,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  console.log(user);

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

  const signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signInAnonymous = () => {
    return signInAnonymously(auth);
  };

  const deleteUser = () => {
    const user = auth.currentUser;
    if (user) {
      return deleteAccount(user);
    }
    return Promise.reject();
  };

  const signOut = () => {
    return auth.signOut();
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInAnonymous,
    signOut,
    deleteUser,
  };
};
