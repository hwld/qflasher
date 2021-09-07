import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DeckPlayer } from "../../components/DeckPlayer";
import { Header } from "../../components/Header";
import { PageTitle } from "../../components/PageTitle";
import { useDeckListContext } from "../../contexts/DeckListContext";

const Component: NextPage = ({}) => {
  const router = useRouter();
  const id = router.query.id;
  const { deckList } = useDeckListContext();
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

const DeckPlayPage = Component;
export default DeckPlayPage;