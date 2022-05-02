import { OperationBar } from "@/components/model/deck/DeckPlayer/OperationBar";
import { useDeckPlayerState } from "@/components/model/deck/DeckPlayer/useDeckPlayerState";
import { DeckCardStack } from "@/components/model/deckCard/DeckCardStack";
import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage/DeckPlayerPage";
import { Deck } from "@/models";
import { Route } from "@/routes";
import { Grid, GridProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  deck: Deck;
  settings: DeckPlaySettings;
  size: "sm" | "md";
  returnRoute: Route;
} & GridProps;

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
      />
      <OperationBar
        size={size}
        returnRoute={returnRoute}
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
