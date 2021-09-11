import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDeckList } from "../../../contexts/DeckListContext";
import { DeckPlayer } from "../../DeckPlayer";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckPlayerPage: React.FC = ({}) => {
  const router = useRouter();
  const id = router.query.id;
  const { deckList } = useDeckList();
  const deck = deckList.find((deck) => deck.id === id);

  if (!deck) {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <Box minH="100vh">
      <Header />
      <PageTitle mt={5}>暗記</PageTitle>
      <Center w="700px" mt={5} mx="auto">
        <Text fontWeight="bold" fontSize="2xl" textAlign="center">
          {deck.name}
        </Text>
      </Center>
      <DeckPlayer mt={5} mx="auto" deck={deck} />
    </Box>
  );
};
