import { Box, Center, CircularProgress, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useMyDeck } from "../../../hooks/useMyDeck";
import { DeckPlayer } from "../../DeckPlayer";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

type DeckPlayerPageProps = { deckId: string };

export const DeckPlayerPage: React.FC<DeckPlayerPageProps> = ({ deckId }) => {
  const useMyDeckResult = useMyDeck(deckId);

  if (useMyDeckResult.status === "loading") {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (useMyDeckResult.status === "error") {
    return (
      <Center minH="100vh">
        <Heading>デッキの読み込みに失敗しました</Heading>
      </Center>
    );
  }

  return (
    <Box minH="100vh">
      <Header />
      <PageTitle mt={5}>暗記</PageTitle>
      <Center w="700px" mt={5} mx="auto">
        <Text fontWeight="bold" fontSize="2xl" textAlign="center">
          {useMyDeckResult.deck.name}
        </Text>
      </Center>
      <DeckPlayer mt={5} mx="auto" deck={useMyDeckResult.deck} />
    </Box>
  );
};
