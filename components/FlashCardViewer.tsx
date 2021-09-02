import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";
import { FlashCardItem } from "./FlashCardItem";

type Props = { cards: FlashCard[]; front: "question" | "answer" };

const Component: React.FC<Props> = ({ cards, front }) => {
  return (
    <Box w="850px" h="550px" bgColor="gray.800" position="relative" m="0 auto">
      {cards.map((card, index) => (
        <FlashCardItem
          key={card.id}
          card={card}
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          m="auto"
          // 最後のcard(一番全面にあるcard)のfrontのみを変化させる
          front={cards.length - 1 === index ? front : "question"}
        />
      ))}
    </Box>
  );
};

export const FlashCardViewer = Component;
