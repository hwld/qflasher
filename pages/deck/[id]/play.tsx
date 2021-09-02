import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DeckPlayer } from "../../../components/DeckPlayer";
import { Header } from "../../../components/Header";
import { useDeckListContext } from "../../../contexts/DeckListContext";

type Props = {};

const Component: NextPage = ({}) => {
  const router = useRouter();
  const { id } = router.query;
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
      <Text>名前: {deck.name}</Text>
      <DeckPlayer deck={deck} />
    </Box>
  );
};

const DeckPlayPage = Component;
export default DeckPlayPage;
