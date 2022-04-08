import { OneSideDeckCardItem } from "@/components/model/deckCard/DeckCardStackItem/OneSideDeckCardItem";
import { DeckCard } from "@/models";
import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  size: "sm" | "md";
  card: DeckCard;
  initialFront: "question" | "answer";
  front: "question" | "answer";
  isBackground?: boolean;
} & BoxProps;

export const DeckCardStackItem: React.FC<Props> = ({
  size,
  card,
  initialFront,
  front,
  isBackground,
  ...styles
}) => {
  const frontText = initialFront === "question" ? card.question : card.answer;
  const frontType = initialFront;

  const backText = initialFront === "question" ? card.answer : card.question;
  const backType = initialFront === "question" ? "answer" : "question";

  return (
    <Box
      // frontがinitialFrontと同じであれば表、違えば裏
      transform={front === initialFront ? "rotateY(0deg)" : "rotateY(180deg)"}
      transitionDuration="300ms"
      style={{ transformStyle: "preserve-3d" }}
      position="absolute"
      boxSize="100%"
      {...styles}
    >
      <OneSideDeckCardItem
        size={size}
        text={frontText}
        type={frontType}
        isBackground={isBackground}
      />
      <OneSideDeckCardItem
        size={size}
        transform="rotateY(180deg)"
        text={backText}
        type={backType}
        isBackground={isBackground}
      />
    </Box>
  );
};
