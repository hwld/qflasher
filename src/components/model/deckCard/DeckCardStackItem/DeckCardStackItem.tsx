import { AnimationEvent } from "@/components/model/deck/DeckPlayer/DeckPlayer";
import { OneSideDeckCardItem } from "@/components/model/deckCard/DeckCardStackItem/OneSideDeckCardItem";
import { DeckCard } from "@/models";
import { Box, BoxProps } from "@chakra-ui/react";
import React, { useMemo } from "react";

type Props = {
  size: "sm" | "md";
  card: DeckCard;
  initialFront: "question" | "answer";
  front: "question" | "answer";
  isBackground?: boolean;
  animationEvent?: AnimationEvent;
  onRemoveEvent: (id: string) => void;
} & BoxProps;

export const DeckCardStackItem: React.FC<Props> = ({
  size,
  card,
  initialFront,
  front,
  isBackground,
  animationEvent,
  onRemoveEvent,
  ...styles
}) => {
  const frontText = initialFront === "question" ? card.question : card.answer;
  const frontType = initialFront;

  const backText = initialFront === "question" ? card.answer : card.question;
  const backType = initialFront === "question" ? "answer" : "question";

  const animation = useMemo(() => {
    if (!animationEvent) {
      return "";
    }
    return `${animationEvent.keyframe} ease-in 250ms`;
  }, [animationEvent]);

  const handleAnimationEnd = (event: React.AnimationEvent) => {
    if (
      !animationEvent ||
      animationEvent.keyframe.name !== event.animationName
    ) {
      return;
    }
    onRemoveEvent(card.id);
    animationEvent.onAfterAnimation();
  };

  return (
    <Box
      boxSize={"100%"}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
      bgColor="transparent"
      style={{ animationFillMode: "forwards" }}
      position="absolute"
      {...styles}
    >
      <Box
        // frontがinitialFrontと同じであれば表、違えば裏
        transform={front === initialFront ? "rotateY(0deg)" : "rotateY(180deg)"}
        transitionDuration="300ms"
        style={{ transformStyle: "preserve-3d" }}
        boxSize="100%"
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
    </Box>
  );
};
