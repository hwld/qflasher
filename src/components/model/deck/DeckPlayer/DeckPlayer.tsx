import { OperationBar } from "@/components/model/deck/DeckPlayer/OperationBar";
import { useDeckPlayerState } from "@/components/model/deck/DeckPlayer/useDeckPlayerState";
import { DeckCardStack } from "@/components/model/deckCard/DeckCardStack";
import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage/DeckPlayerPage";
import { Deck } from "@/models";
import { Route } from "@/routes";
import { Grid, GridProps, keyframes } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

type Keyframes = ReturnType<typeof keyframes>;

type Props = {
  deck: Deck;
  settings: DeckPlaySettings;
  size: "sm" | "md";
  returnRoute: Route;
} & GridProps;

const slideLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-120%); }
`;

const slideRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(120%); }
`;

export type AnimationEvent = {
  cardId: string;
  keyframe: Keyframes;
  onAfterAnimation: Function;
};

export const DeckPlayer: React.FC<Props> = ({
  deck,
  settings,
  size,
  returnRoute,
  ...styles
}) => {
  const {
    cardStack,
    rightAnswerCount,
    wrongCards,
    totalCardsCount,
    progress,
    front,
    handleTurnOver,
    handleRight,
    handleWrong,
    handleReplayAll,
    handleReplayWrong,
  } = useDeckPlayerState(deck, settings);
  const [animationEvents, setAnimationEvents] = useState<AnimationEvent[]>([]);

  const topCard = cardStack[cardStack.length - 1];

  const handleClickRightButton = useCallback(() => {
    setAnimationEvents((events) => {
      // 一番上のカードを対象とするeventsが存在すれば何もしない
      if (!topCard || events.find((e) => e.cardId === topCard.id)) {
        return events;
      }
      return [
        ...events,
        {
          cardId: topCard.id,
          keyframe: slideLeft,
          onAfterAnimation: handleRight,
        },
      ];
    });
  }, [handleRight, topCard]);

  const handleClickWrongButton = useCallback(() => {
    setAnimationEvents((events) => {
      if (!topCard || events.find((e) => e.cardId === topCard.id)) {
        return events;
      }

      return [
        ...events,
        {
          cardId: topCard.id,
          keyframe: slideRight,
          onAfterAnimation: handleWrong,
        },
      ];
    });
  }, [handleWrong, topCard]);

  const handleRemoveEvent = (id: string) => {
    setAnimationEvents((events) => {
      if (!topCard || !events.find((e) => e.cardId === id)) {
        return events;
      }

      return events.filter((e) => e.cardId !== id);
    });
  };

  return (
    <Grid templateRows="1fr auto" {...styles}>
      <DeckCardStack
        maxW="1000px"
        w="100%"
        mx="auto"
        mb={3}
        size={size}
        initialFront={settings.initialFront}
        totalCardsCount={totalCardsCount}
        rightAnswersCount={rightAnswerCount}
        cards={cardStack}
        progress={progress}
        topFront={front}
        animationEvents={animationEvents}
        onRemoveEvent={handleRemoveEvent}
      />
      <OperationBar
        size={size}
        returnRoute={returnRoute}
        isEnd={cardStack.length === 0}
        wrongAnswerCount={wrongCards.length}
        onTurnOver={handleTurnOver}
        onRight={handleClickRightButton}
        onWrong={handleClickWrongButton}
        onReplayWrong={handleReplayWrong}
        onReplayAll={handleReplayAll}
      />
    </Grid>
  );
};
