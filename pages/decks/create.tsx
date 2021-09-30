import type { NextPage } from "next";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckCreatorPage } from "../../components/pages/deckCreator/DeckCreatorPage";

const Create: NextPage = () => {
  const page = (userId: string) => <DeckCreatorPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Create;
