import type { NextPage } from "next";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckCreatorPage } from "../../components/pages/deckCreator/DeckCreatorPage";

const Create: NextPage = () => {
  return (
    <AuthRequiredPage>
      <DeckCreatorPage />
    </AuthRequiredPage>
  );
};

export default Create;
