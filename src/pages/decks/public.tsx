import { PublicDeckListPage } from "@/components/pages/PublicDeckListPage/PublicDeckListPage";
import { AppLayout } from "@/components/ui/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const PublicDecks: NextPageWithLayout = () => {
  return <PublicDeckListPage />;
};

PublicDecks.getLayout = AppLayout;

export default PublicDecks;
