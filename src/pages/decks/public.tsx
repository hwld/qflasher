import { PublicDeckListPage } from "@/components/pages/PublicDeckListPage";
import { useSignInButton } from "@/hooks/useSignInButton";
import { NextPage } from "next";

const PublicDecks: NextPage = () => {
  useSignInButton();

  return <PublicDeckListPage />;
};

export default PublicDecks;
