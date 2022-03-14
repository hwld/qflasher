import { DeckPlayerPage } from "@/components/pages/DeckPlayerPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useInitLoadingEffect } from "@/hooks/useInitLoadingEffect";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Play: NextPage = () => {
  const { userResult } = useAuthState();
  useRequireSignIn({ userResult });

  const router = useRouter();
  const id = router.query.id;

  useLoadingEffect(!router.isReady);
  useInitLoadingEffect();

  if (!userResult.data || !router.isReady) {
    return null;
  } else if (!isDeckId(id)) {
    router.push(routes.rootPage);
    return null;
  } else {
    return <DeckPlayerPage deckId={id} userId={userResult.data.uid} />;
  }
};

export default Play;
