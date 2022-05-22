import { auth } from "@/firebase/config";
import { Result } from "@/utils/result";
import {
  deleteUser as deleteFirebaseUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

export type UserResult = Result<User | undefined>;

export const useAuthState = () => {
  const [userResult, setUserResult] = useState<UserResult>(Result.Loading());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, {
      next: (u) => {
        const user = u === null ? undefined : u;
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
      return deleteFirebaseUser(user);
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
