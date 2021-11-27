import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckEditPage } from "../../components/pages/DeckEditorPage";
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
