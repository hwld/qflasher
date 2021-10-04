import { Center, Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckEditPage } from "../../components/pages/deckEditor/DeckEditorPage";
import { useSetAppState } from "../../context/AppStateContextProvider";

const Edit: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { setIsLoading } = useSetAppState();

  const notExistsId = typeof id === "undefined";
  const incorrectId = typeof id !== "string" || id === "";

  useEffect(() => {
    if (notExistsId || incorrectId) {
      setIsLoading(false);
    }
  }, [incorrectId, notExistsId, setIsLoading]);

  console.log(id);
  if (notExistsId) {
    return <></>;
  }

  if (incorrectId) {
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
