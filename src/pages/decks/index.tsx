import { DeckListPage } from "@/components/pages/DeckListPage";
import { AuthRequiredPage } from "@/components/ui/AuthRequiredPage";
import type { NextPage } from "next";
import React from "react";

const Decks: NextPage = () => {
  const page = (userId: string) => <DeckListPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Decks;
