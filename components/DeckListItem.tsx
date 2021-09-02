import { Box, BoxProps, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Deck } from "../types";

type Props = { className?: string; deck: Deck } & BoxProps;

const Component: React.FC<Props> = ({ className, deck, ...styleProps }) => {
  const router = useRouter();
  const handlePlayDeck = () => {
    router.push(`/deck/${deck.id}/play`);
  };

  return (
    <Box w="300px" h="150px" bgColor="gray.300" {...styleProps}>
      <Text>名前: {deck.name}</Text>
      <Text>枚数: {deck.cards.length}</Text>
      <Button onClick={handlePlayDeck}>Play</Button>
    </Box>
  );
};

export const DeckListItem = Component;
