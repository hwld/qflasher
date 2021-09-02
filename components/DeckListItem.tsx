import { Box, BoxProps, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDeckListContext } from "../contexts/DeckListContext";
import { Deck } from "../types";

type Props = { className?: string; deck: Deck } & BoxProps;

const Component: React.FC<Props> = ({ className, deck, ...styleProps }) => {
  const router = useRouter();
  const { setDeckList } = useDeckListContext();
  const handlePlayDeck = () => {
    router.push(`/deck/${deck.id}/play`);
  };

  const handleDelete = () => {
    setDeckList((decks) => decks.filter((d) => d.id !== deck.id));
  };

  return (
    <Box w="300px" h="150px" bgColor="gray.300" {...styleProps}>
      <Text>名前: {deck.name}</Text>
      <Text>枚数: {deck.cards.length}</Text>
      <Button onClick={handlePlayDeck}>Play</Button>
      <Button colorScheme="red" onClick={handleDelete}>
        削除
      </Button>
    </Box>
  );
};

export const DeckListItem = Component;
