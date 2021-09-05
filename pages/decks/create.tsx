import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { DeckEditor } from "../../components/DeckEditor";
import { Header } from "../../components/Header";
import { useDeckListContext } from "../../contexts/DeckListContext";
import { Deck } from "../../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();
  const [deck, setDeck] = useState<Deck>({
    id: Math.random().toString(),
    name: "",
    cards: [],
  });

  const handleAddDeck = () => {
    setDeckList((decks) => [...decks, deck]);
    router.push("/decks");
  };

  return (
    <Box minH="100vh">
      <Header />
      <Box mt={10} maxW="800px" marginX="auto">
        <DeckEditor deck={deck} onChangeDeck={setDeck} />
        <Button mt={5} colorScheme="green" onClick={handleAddDeck}>
          暗記帳を作成
        </Button>
      </Box>
    </Box>
  );
};

export default DeckEditPage;
