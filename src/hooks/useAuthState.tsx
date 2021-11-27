import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

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

  return { user, loading, error };
};
