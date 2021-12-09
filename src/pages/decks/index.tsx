import type { NextPage } from "next";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckListPage } from "../../components/pages/DeckListPage";

const Index: NextPage = () => {
  const page = (userId: string) => <DeckListPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Index;
