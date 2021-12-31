import { Grid, GridProps } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";
import { DeckWithoutCards } from "../../../../types";
import { DeckListItem } from "../DeckListItem/DeckListItem";
import { useDeckCardStyle } from "../DeckListItem/useDeckListItemStyle";

type Props = {
  decks: DeckWithoutCards[];
  selectedTagId: string | undefined;
  onDelete: (id: string) => Promise<void>;
} & GridProps;

export const DeckList: React.FC<Props> = ({
  decks,
  selectedTagId,
  onDelete,
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
            onDeleteDeck={onDelete}
          />
        );
      })}
    </Grid>
  );
};
