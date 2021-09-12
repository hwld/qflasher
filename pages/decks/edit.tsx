import type { NextPage } from "next";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckEditPage } from "../../components/pages/deckEditor/DeckEditorPage";

const Edit: NextPage = () => {
  return (
    <AuthRequiredPage>
      <DeckEditPage />
    </AuthRequiredPage>
  );
};

export default Edit;
