import { Grid } from "@chakra-ui/layout";
import React from "react";
import { DeckWithoutCards } from "../../types";
import { DeckListItem } from "./DeckListItem";

type Props = {
  decks: DeckWithoutCards[];
  onDelete: (id: string) => Promise<void>;
};

export const DeckList: React.FC<Props> = ({ decks, onDelete }) => {
  return (
    <Grid
      templateColumns="repeat(auto-fill,500px)"
      gap={5}
      justifyContent="center"
    >
      {decks.map((deck) => {
        return (
          <DeckListItem key={deck.id} deck={deck} onDeleteDeck={onDelete} />
        );
      })}
    </Grid>
  );
};
