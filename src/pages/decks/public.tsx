import { PublicDeckListPage } from "@/components/pages/PublicDeckListPage/PublicDeckListPage";
import { AppLayout } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { isLoading } from "@/utils/result";
import React from "react";

const PublicDecks: NextPageWithLayout = () => {
  const { userResult } = useAuthState();

  if (isLoading(userResult)) {
    return <AppLoading />;
  } else {
    return <PublicDeckListPage userId={userResult.data?.uid} />;
  }
};

PublicDecks.getLayout = AppLayout;

export default PublicDecks;
