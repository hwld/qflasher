import { Box } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../types";
import { FlashCardItem } from "./FlashCardItem";

type Props = { cards: FlashCard[]; front: "question" | "answer" };

const Component: React.FC<Props> = ({ cards, front }) => {
  return (
    <Box
      bgColor="gray.700"
      boxShadow="dark-lg"
      position="relative"
      w="800px"
      h="500px"
      borderRadius="10px"
    >
      {cards.map((card, index) => (
        <FlashCardItem
          key={card.id}
          card={card}
          borderRadius="10px"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          margin="auto"
          // 最後のcard(一番全面にあるcard)のfrontのみを変化させる
          front={cards.length - 1 === index ? front : "question"}
        />
      ))}
    </Box>
  );
};

export const FlashCardViewer = Component;
