import { DeckPlayerPage } from "@/components/pages/DeckPlayerPage";
import { AppLayout } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { isErr, isLoading } from "@/utils/result";
import React from "react";

const Play: NextPageWithLayout = () => {
  const { userResult } = useAuthState();
  const router = useAppRouter({
    currentPage: routes.playDeckPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;

  if (isLoading(queryResult) || isLoading(userResult)) {
    return <AppLoading />;
  } else if (isErr(queryResult)) {
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

Play.getLayout = AppLayout;

export default Play;
