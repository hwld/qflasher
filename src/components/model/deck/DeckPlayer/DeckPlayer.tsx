import {
  OperationBar,
  useDeckPlayerState,
} from "@/components/model/deck/DeckPlayer";
import { FlashCardStack } from "@/components/model/flashCard/FlashCardStack";
import { DeckPlayConfig } from "@/components/pages/DeckPlayerPage";
import { Deck } from "@/types";
import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  deck: Deck;
  config: DeckPlayConfig;
  size: "sm" | "md";
} & GridProps;

export const DeckPlayer: React.FC<Props> = ({
  deck,
  config,
  size,
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
  } = useDeckPlayerState(deck, config);

  return (
    <Grid templateRows="1fr auto" {...styles}>
      <FlashCardStack
        maxW="1000px"
        w="100%"
        mx="auto"
        mb={3}
        size={size}
        initialFront={config.initialFront}
        totalCardsCount={totalCardsCount}
        rightAnswersCount={rightAnswerCount}
        cards={cardStack}
        progress={progress}
        topFront={front}
      />
      <OperationBar
        size={size}
        isEnd={cardStack.length === 0}
        wrongAnswerCount={wrongCards.length}
        onTurnOver={handleTurnOver}
        onRight={handleRight}
        onWrong={handleWrong}
        onReplayWrong={handleReplayWrong}
        onReplayAll={handleReplayAll}
      />
    </Grid>
  );
};
