import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { useDeckListContext } from "../../../contexts/DeckListContext";
import { FlashCard } from "../../../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();
  const [name, setName] = useState("");
  const [cards, setCards] = useState<FlashCard[]>([]);

  // TODO
  const handleUpdateDeck = () => {
    setDeckList((decks) => {
      return decks;
    });
    router.push("/decks");
  };

  return (
    <Box minH="100vh">
      <Header />
      <Box mt={10} maxW="800px" marginX="auto">
        <Button mt={5} colorScheme="green" onClick={handleUpdateDeck}>
          暗記帳を更新
        </Button>
      </Box>
    </Box>
  );
};

export default DeckEditPage;
