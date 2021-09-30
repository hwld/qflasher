import { Center, Heading } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckPlayerPage } from "../../components/pages/deckPlayer/DeckPlayerPage";

const Play: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;

  if (typeof id === "undefined") {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (typeof id !== "string") {
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
