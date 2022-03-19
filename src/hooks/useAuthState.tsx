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
import { useCallback, useEffect, useState } from "react";

export type UserResult = Result<User | null>;

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
        console.error(error);
        setUserResult({ status: "error", data: undefined, error: undefined });
      },
      complete: () => {},
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(() => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const signInAnonymous = useCallback(() => {
    return signInAnonymously(auth);
  }, []);

  const deleteUser = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      return deleteAccount(user);
    }
    return Promise.reject();
  }, []);

  const signOut = useCallback(() => {
    return auth.signOut();
  }, []);

  return {
    userResult,
    signInWithGoogle,
    signInAnonymous,
    signOut,
    deleteUser,
  };
};
