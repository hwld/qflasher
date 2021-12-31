import type { NextPage } from "next";
import React from "react";
import { DeckListPage } from "../../components/pages/DeckListPage/DeckListPage";
import { AuthRequiredPage } from "../../components/ui/AuthRequiredPage";

const Index: NextPage = () => {
  const page = (userId: string) => <DeckListPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Index;
