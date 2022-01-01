import { DeckCreatorPage } from "@/components/pages/DeckCreatorPage";
import { AuthRequiredPage } from "@/components/ui/AuthRequiredPage";
import type { NextPage } from "next";
import React from "react";

const Create: NextPage = () => {
  const page = (userId: string) => <DeckCreatorPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Create;
