import { DeckListPage } from "@/components/pages/DeckListPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import { NextPage } from "next";

const MyDecks: NextPage = () => {
  const { userResult } = useAuthState();
  useRequireSignIn({ userResult });

  if (userResult.data) {
    return <DeckListPage userId={userResult.data.uid} />;
  } else {
    return null;
  }
};

export default MyDecks;
