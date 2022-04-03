import { DeckCreatorPage } from "@/components/pages/DeckCreatorPage";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import type { NextPage } from "next";
import React from "react";

const Create: NextPage = () => {
  const { userResult } = useAuthState();

  if (userResult.status === "loading") {
    return <AppLoading />;
  }
  if (!userResult.data) {
    return <Redirect href={routes.signInPage} />;
  } else {
    return <DeckCreatorPage userId={userResult.data.uid} />;
  }
};

export default Create;
