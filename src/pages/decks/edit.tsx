import { DeckEditPage } from "@/components/pages/DeckEditorPage";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import type { NextPage } from "next";
import React from "react";

const Edit: NextPage = () => {
  const { userResult } = useAuthState();
  useRequireSignIn({ userResult });

  const router = useAppRouter();
  const id = router.query.id;

  useLoadingEffect(!router.isReady);

  if (!userResult.data || !router.isReady) {
    return null;
  } else if (!isDeckId(id)) {
    return <Redirect href={routes.rootPage} />;
  } else {
    return <DeckEditPage deckId={id} userId={userResult.data.uid} />;
  }
};

export default Edit;
