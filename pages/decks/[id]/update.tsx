import { Box, Button, Center, Tooltip } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdUpdate } from "react-icons/md";
import { DeckForm } from "../../../components/DeckForm";
import { Header } from "../../../components/Header";
import { useDeckListContext } from "../../../contexts/DeckListContext";
import { Deck } from "../../../types";

const DeckEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { deckList, setDeckList } = useDeckListContext();
  const deck = deckList.find((deck) => deck.id === id);

  const formId = "updateDeckForm";

  if (!deck) {
    return <Center>存在しません</Center>;
  }

  const handleUpdateDeck = (deck: Deck) => {
    setDeckList((decks) =>
      decks.map((d) => {
        if (d.id === deck.id) {
          return deck;
        }
        return d;
      })
    );
    router.push("/decks");
  };

  return (
    <Box minH="100vh">
      <Header />
      <Box mt={10} maxW="800px" marginX="auto">
        <DeckForm
          defaultDeck={deck}
          formId={formId}
          onSubmit={handleUpdateDeck}
        />
        <Tooltip label="作成">
          <Button
            type="submit"
            form={formId}
            zIndex="1"
            position="fixed"
            colorScheme="green"
            color="gray.700"
            bottom="20px"
            right="20px"
            padding={0}
            boxSize="70px"
            rounded="full"
            boxShadow="dark-lg"
          >
            <MdUpdate size="60%" />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DeckEditPage;
