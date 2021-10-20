import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { FlashCard } from "../../types";
import { OneSideFlashCardItem } from "./OneSideFlashCardItem";

type Props = {
  card: FlashCard;
  initialFront: "question" | "answer";
  front: "question" | "answer";
  isBackground?: boolean;
} & BoxProps;

export const FlashCardItem: React.FC<Props> = ({
  card,
  initialFront,
  front,
  isBackground,
  ...styleProps
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
      {...styleProps}
    >
      <OneSideFlashCardItem
        text={frontText}
        type={frontType}
        isBackground={isBackground}
      />
      <OneSideFlashCardItem
        transform="rotateY(180deg)"
        text={backText}
        type={backType}
        isBackground={isBackground}
      />
    </Box>
  );
};
