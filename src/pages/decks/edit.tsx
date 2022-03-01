import { DeckEditPage } from "@/components/pages/DeckEditorPage";
import { AuthRequiredPage } from "@/components/ui/AuthRequiredPage";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { isDeckId } from "@/utils/isDeckId";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Edit: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;

  useLoadingEffect(!router.isReady);

  if (!router.isReady) {
    return null;
  }

  if (!isDeckId(id)) {
    router.push("/");
    return null;
  }

  const deckEditPage = (userId: string) => (
    <DeckEditPage deckId={id} userId={userId} />
  );
  return <AuthRequiredPage>{deckEditPage}</AuthRequiredPage>;
};

export default Edit;
