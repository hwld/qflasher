import {
  DeckListItem,
  DeckListItemProps,
  useDeckCardStyle,
} from "@/components/model/deck/DeckListItem";
import { DeckWithoutCards } from "@/types";
import { Grid, GridProps } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";

export type DeckListProps = {
  decks: DeckWithoutCards[];
  selectedTagId: string | undefined;
  onDeleteDeck: DeckListItemProps["onDeleteDeck"];
  onTagDeck: DeckListItemProps["onTagDeck"];
} & GridProps;

export const DeckList: React.FC<DeckListProps> = ({
  decks,
  selectedTagId,
  onDeleteDeck,
  onTagDeck,
  ...props
}) => {
  const decksView = selectedTagId
    ? decks.filter((d) => d.tagIds.includes(selectedTagId))
    : decks;
  const cardSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  const cardStyle = useDeckCardStyle(cardSize);

  return (
    <Grid
      templateColumns={`repeat(auto-fill,${
        cardStyle.ringWidth + cardStyle.cardWidth
      }px)`}
      gap={5}
      justifyContent="center"
      {...props}
    >
      {decksView.map((deck) => {
        return (
          <DeckListItem
            key={deck.id}
            style={cardStyle}
            deck={deck}
            onDeleteDeck={onDeleteDeck}
            onTagDeck={onTagDeck}
          />
        );
      })}
    </Grid>
  );
};
