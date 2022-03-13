import { auth } from "@/firebase/config";
import { Result } from "@/types";
import {
  deleteUser as deleteAccount,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

type UserResult = Result<User | null>;

export const useAuthState = () => {
  const [userResult, setUserResult] = useState<UserResult>({
    status: "loading",
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, {
      next: (user) => {
        setUserResult({ status: "success", data: user, error: undefined });
      },
      error: (error) => {
        setUserResult({ status: "error", data: undefined, error: undefined });
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
    userResult,
    signInWithGoogle,
    signInAnonymous,
    signOut,
    deleteUser,
  };
};
