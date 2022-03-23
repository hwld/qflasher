import {
  OperationBar,
  useDeckPlayerState,
} from "@/components/model/deck/DeckPlayer";
import { FlashCardStack } from "@/components/model/flashCard/FlashCardStack";
import { DeckPlayConfig } from "@/components/pages/DeckPlayerPage";
import { Deck } from "@/types";
import { BoxProps, Grid, GridProps } from "@chakra-ui/react";
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

  let buttonSize: BoxProps["boxSize"];
  let barHeight: BoxProps["height"];
  switch (size) {
    case "sm": {
      buttonSize = "50px";
      barHeight = "70px";
      break;
    }
    case "md": {
      buttonSize = "70px";
      barHeight = "90px";
      break;
    }
  }

  return (
    <Grid templateRows="1fr auto" {...styles}>
      <FlashCardStack
        maxW="1000px"
        w="100%"
        h={`calc(100% - (${barHeight} + 20px))`}
        mx="auto"
        size={size}
        initialFront={config.initialFront}
        totalCardsCount={totalCardsCount}
        rightAnswersCount={rightAnswerCount}
        cards={cardStack}
        progress={progress}
        topFront={front}
      />
      <OperationBar
        buttonSize={buttonSize}
        barHeight={barHeight}
        bgColor="gray.700"
        pos="fixed"
        bottom={0}
        left={0}
        right={0}
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
