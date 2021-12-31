import type { NextPage } from "next";
import React from "react";
import { DeckCreatorPage } from "../../components/pages/DeckCreatorPage/DeckCreatorPage";
import { AuthRequiredPage } from "../../components/ui/AuthRequiredPage";

const Create: NextPage = () => {
  const page = (userId: string) => <DeckCreatorPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Create;
