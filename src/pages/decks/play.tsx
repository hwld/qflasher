import {
  DeckPlayerPage,
  DeckPlaySettings,
} from "@/components/pages/DeckPlayerPage";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Play: NextPage = () => {
  const { userResult } = useAuthState();

  const router = useRouter();
  // TODO
  const { deckId, redirectTo, ...settings } = router.query as unknown as {
    deckId: string;
    redirectTo?: string;
  } & DeckPlaySettings;

  const loading = !router.isReady || userResult.status === "loading";
  useLoadingEffect(loading);
  useSignInButton();

  if (loading) {
    return null;
  } else if (!isDeckId(deckId)) {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <DeckPlayerPage
        deckId={deckId}
        userId={userResult.data?.uid ?? undefined}
        settings={settings}
      />
    );
  }
};

export default Play;
