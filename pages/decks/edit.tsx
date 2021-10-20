import { Center, Heading } from "@chakra-ui/layout";
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
    return <></>;
  }

  if (typeof id !== "string" || id === "") {
    return (
      <Center>
        <Heading mt={10} size="4xl">
          deckIdが無効です
        </Heading>
      </Center>
    );
  }

  const deckEditPage = (userId: string) => (
    <DeckEditPage deckId={id} userId={userId} />
  );
  return <AuthRequiredPage>{deckEditPage}</AuthRequiredPage>;
};

export default Edit;
