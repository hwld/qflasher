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
  const router = useAppRouter({
    currentPage: routes.editDeckPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;

  useLoadingEffect(queryResult.status === "loading");
  useRequireSignIn({ userResult });

  if (!userResult.data || queryResult.status === "loading") {
    return null;
  } else if (queryResult.status === "error") {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <DeckEditPage deckId={queryResult.data.id} userId={userResult.data.uid} />
    );
  }
};

export default Edit;
