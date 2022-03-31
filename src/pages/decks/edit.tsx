import { DeckEditPage } from "@/components/pages/DeckEditorPage";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import type { NextPage } from "next";
import React from "react";

const Edit: NextPage = () => {
  const router = useAppRouter({
    currentPage: routes.editDeckPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;
  const { userResult } = useAuthState();

  const loading =
    queryResult.status === "loading" || userResult.status === "loading";

  if (loading) {
    return <AppLoading isLoading={true} />;
  } else if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else if (queryResult.status === "error") {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <DeckEditPage deckId={queryResult.data.id} userId={userResult.data.uid} />
    );
  }
};

export default Edit;
