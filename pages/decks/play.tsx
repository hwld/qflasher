import { Center, Heading } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckPlayerPage } from "../../components/pages/deckPlayer/DeckPlayerPage";
import { useSetAppState } from "../../context/AppStateContextProvider";

const Play: NextPage = () => {
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

  if (notExistsId) {
    return <></>;
  }

  if (incorrectId) {
    return (
      <Center minH="100vh">
        <Heading size="4xl">deckIdが無効です</Heading>
      </Center>
    );
  }

  const page = (userId: string) => (
    <DeckPlayerPage deckId={id} userId={userId} />
  );
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Play;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
