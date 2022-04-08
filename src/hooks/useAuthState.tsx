import { auth } from "@/firebase/config";
import { Result } from "@/utils/result";
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
  const [userResult, setUserResult] = useState<UserResult>(Result.Loading());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, {
      next: (user) => {
        setUserResult(Result.Ok(user));
      },
      error: (error) => {
        setUserResult(Result.Err());
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
