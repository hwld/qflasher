import { DeckListPage } from "@/components/pages/DeckListPage";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { NextPage } from "next";

const MyDecks: NextPage = () => {
  const { userResult } = useAuthState();

  if (userResult.status === "loading") {
    return <AppLoading />;
  }
  if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else {
    return <DeckListPage userId={userResult.data.uid} />;
  }
};

export default MyDecks;
