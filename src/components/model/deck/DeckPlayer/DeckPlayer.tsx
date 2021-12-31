import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";
import { Deck } from "../../../../types";
import { DeckPlayConfig } from "../../../pages/DeckPlayerPage/DeckPlayerPage";
import { FlashCardStack } from "../../flashCard/FlashCardStack/FlashCardStack";
import { OperationBar } from "./OperationBar";
import { useDeckPlayerState } from "./useDeckPlayerState";

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
        maxW="800px"
        w="100%"
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
        my={5}
        size={size}
        isEnd={cardStack.length === 0}
        wrongAnswerCount={wrongCards.length}
        onTurnOver={handleTurnOver}
        onRight={handleRight}
        onWrong={handleWrong}
        onReplayWrong={handleReplayWrong}
        onReplayAll={handleReplayAll}
        justify="center"
      />
    </Grid>
  );
};
