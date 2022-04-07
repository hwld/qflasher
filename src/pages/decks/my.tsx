import { DeckListPage } from "@/components/pages/DeckListPage";
import { AppLayoutWithOutSignInButton } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";
import { isLoading } from "@/types";

const MyDecks: NextPageWithLayout = () => {
  const { userResult } = useAuthState();

  if (isLoading(userResult)) {
    return <AppLoading />;
  }
  if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else {
    return <DeckListPage userId={userResult.data.uid} />;
  }
};

MyDecks.getLayout = AppLayoutWithOutSignInButton;

export default MyDecks;
