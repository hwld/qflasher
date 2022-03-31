import {
  DeckPlayerPage,
  DeckPlaySettings,
} from "@/components/pages/DeckPlayerPage";
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

  const router = useAppRouter();
  // TODO
  const { id, redirectTo, ...settings } = router.query as unknown as {
    id: string;
    redirectTo?: string;
  } & DeckPlaySettings;

  const loading = !router.isReady || userResult.status === "loading";
  useLoadingEffect(loading);
  useSignInButton();

  if (loading) {
    return null;
  } else if (!isDeckId(id)) {
    return <Redirect href={routes.rootPage} />;
  } else {
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
