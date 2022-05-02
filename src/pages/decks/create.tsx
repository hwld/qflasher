import { DeckCreatorPage } from "@/components/pages/DeckCreatorPage/DeckCreatorPage";
import { AppLayoutWithOutSignInButton } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";
import { isLoading } from "@/utils/result";
import React from "react";

const Create: NextPageWithLayout = () => {
  const { userResult } = useAuthState();

  if (isLoading(userResult)) {
    return <AppLoading />;
  }
  if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else {
    return <DeckCreatorPage userId={userResult.data.uid} />;
  }
};

Create.getLayout = AppLayoutWithOutSignInButton;

export default Create;
