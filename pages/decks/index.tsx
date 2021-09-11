import type { NextPage } from "next";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckListPage } from "../../components/pages/deckList/DeckListPage";

const Index: NextPage = () => {
  return (
    <AuthRequiredPage>
      <DeckListPage />
    </AuthRequiredPage>
  );
};

export default Index;
