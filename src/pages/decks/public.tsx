import { PublicDeckListPage } from "@/components/pages/PublicDeckListPage";
import { useHeaderState } from "@/context/HeaderContext";
import { NextPage } from "next";
import { useEffect } from "react";

const PublicDecks: NextPage = () => {
  const { setShowSignInButton } = useHeaderState();

  useEffect(() => {
    setShowSignInButton(true);
    return () => {
      setShowSignInButton(false);
    };
  }, [setShowSignInButton]);

  return <PublicDeckListPage />;
};

export default PublicDecks;
