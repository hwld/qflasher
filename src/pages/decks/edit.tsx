import { DeckEditPage } from "@/components/pages/DeckEditorPage";
import { AppLayoutWithOutSignInButton } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";
import { isErr, isLoading } from "@/types";
import { isDeckId } from "@/utils/isDeckId";
import React from "react";

const Edit: NextPageWithLayout = () => {
  const router = useAppRouter({
    currentPage: routes.editDeckPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;
  const { userResult } = useAuthState();

  if (isLoading(queryResult) || isLoading(userResult)) {
    return <AppLoading />;
  } else if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else if (isErr(queryResult)) {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <DeckEditPage deckId={queryResult.data.id} userId={userResult.data.uid} />
    );
  }
};

Edit.getLayout = AppLayoutWithOutSignInButton;

export default Edit;
