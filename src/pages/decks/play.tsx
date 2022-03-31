import { DeckPlayerPage } from "@/components/pages/DeckPlayerPage";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import React from "react";

const Play: NextPage = () => {
  const { userResult } = useAuthState();
  const router = useAppRouter(routes.playDeckPage);
  const queryResult = router.query;

  const loading =
    queryResult.status === "loading" || userResult.status === "loading";
  useLoadingEffect(loading);
  useSignInButton();

  if (loading) {
    return null;
  } else if (
    queryResult.status === "error" ||
    (queryResult.status === "success" && !isDeckId(queryResult.data.id))
  ) {
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
