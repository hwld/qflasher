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
          transform={
            initialFront === "question" ? "rotateY(0deg)" : "rotateY(180deg)"
          }
          text={card.question}
          type={"question"}
          isBackground={isBackground}
        />
        <OneSideDeckCardItem
          size={size}
          transform={
            initialFront === "answer" ? "rotateY(0deg)" : "rotateY(180deg)"
          }
          text={card.answer}
          type={"answer"}
          isBackground={isBackground}
        />
      </Box>
    </Box>
  );
};
