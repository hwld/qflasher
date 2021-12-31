import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DeckEditPage } from "../../components/pages/DeckEditorPage/DeckEditorPage";
import { AuthRequiredPage } from "../../components/ui/AuthRequiredPage";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";

const Edit: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;

  useLoadingEffect(!router.isReady);

  if (!router.isReady) {
    return null;
  }

  if (typeof id !== "string" || id === "") {
    router.push("/");
    return null;
  }

  const deckEditPage = (userId: string) => (
    <DeckEditPage deckId={id} userId={userId} />
  );
  return <AuthRequiredPage>{deckEditPage}</AuthRequiredPage>;
};

export default Edit;
