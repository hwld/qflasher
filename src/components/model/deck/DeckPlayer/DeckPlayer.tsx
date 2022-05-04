import { OperationBar } from "@/components/model/deck/DeckPlayer/OperationBar";
import { useDeckPlayer } from "@/components/model/deck/DeckPlayer/useDeckPlayer";
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
    currentPlay,
    currentTopCard,
    handleTurnOver,
    handleRight,
    handleWrong,
    handleReplayAll,
    handleReplayWrong,
  } = useDeckPlayer(deck, settings);

  const [animationEvents, setAnimationEvents] = useState<AnimationEvent[]>([]);

  const handleClickRightButton = useCallback(() => {
    setAnimationEvents((events) => {
      // 一番上のカードを対象とするeventsが存在すれば何もしない
      if (
        !currentTopCard ||
        events.find((e) => e.cardId === currentTopCard.id)
      ) {
        return events;
      }
      return [
        ...events,
        {
          cardId: currentTopCard.id,
          keyframe: slideLeft,
          onAfterAnimation: handleRight,
        },
      ];
    });
  }, [currentTopCard, handleRight]);

  const handleClickWrongButton = useCallback(() => {
    setAnimationEvents((events) => {
      if (
        !currentTopCard ||
        events.find((e) => e.cardId === currentTopCard.id)
      ) {
        return events;
      }

      return [
        ...events,
        {
          cardId: currentTopCard.id,
          keyframe: slideRight,
          onAfterAnimation: handleWrong,
        },
      ];
    });
  }, [currentTopCard, handleWrong]);

  const handleRemoveEvent = (id: string) => {
    setAnimationEvents((events) => {
      if (!currentTopCard || !events.find((e) => e.cardId === id)) {
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
        currentPlay={currentPlay}
        animationEvents={animationEvents}
        onRemoveEvent={handleRemoveEvent}
      />
      <OperationBar
        size={size}
        returnRoute={returnRoute}
        currentPlay={currentPlay}
        onClickWrong={handleClickWrongButton}
        onClickRight={handleClickRightButton}
        onClickReplayAll={handleReplayAll}
        onClickReplayWrong={handleReplayWrong}
        onClickTrunOver={handleTurnOver}
      />
    </Grid>
  );
};
