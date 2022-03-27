import { useHeaderState } from "@/context/HeaderContext";
import { useEffect } from "react";

export const useSignInButton = () => {
  const { setShowSignInButton } = useHeaderState();

  useEffect(() => {
    setShowSignInButton(true);
    return () => {
      setShowSignInButton(false);
    };
  }, [setShowSignInButton]);
};
