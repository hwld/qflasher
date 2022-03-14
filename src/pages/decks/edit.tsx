import { DeckEditPage } from "@/components/pages/DeckEditorPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useInitLoadingEffect } from "@/hooks/useInitLoadingEffect";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Edit: NextPage = () => {
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
    return <DeckEditPage deckId={id} userId={userResult.data.uid} />;
  }
};

export default Edit;
