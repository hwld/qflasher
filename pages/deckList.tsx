import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DeckListItem } from "../components/DeckListItem";
import { Header } from "../components/Header";
import { useDeckListContext } from "../contexts/DeckListContext";

const DeckListPage: NextPage = () => {
  const router = useRouter();
  const { deckList } = useDeckListContext();
  console.log(deckList.length);

  const handleAddDeck = () => {
    router.push("/deckEdit");
  };

  return (
    <Box h="100vh">
      <Header />
      <Button ml={5} colorScheme="green" onClick={handleAddDeck}>
        デッキ追加
      </Button>
      {deckList.map((deck) => {
        return <DeckListItem key={deck.id} deck={deck} m={5} />;
      })}
    </Box>
  );
};

export default DeckListPage;
