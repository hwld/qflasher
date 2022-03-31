import { DeckPlayerPage } from "@/components/pages/DeckPlayerPage";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import React from "react";

const Play: NextPage = () => {
  const { userResult } = useAuthState();
  const router = useAppRouter({
    currentPage: routes.playDeckPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;

  const loading =
    queryResult.status === "loading" || userResult.status === "loading";

  useSignInButton();

  if (loading) {
    return <AppLoading isLoading={true} />;
  } else if (queryResult.status === "error") {
    return <Redirect href={routes.rootPage} />;
  } else {
    const { id, redirectTo, ...settings } = queryResult.data;
    return (
      <DeckPlayerPage
        deckId={id}
        userId={userResult.data?.uid ?? undefined}
        settings={settings}
      />
    );
  }
};

export default Play;
