import { Grid } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";
import { DeckWithoutCards } from "../../types";
import { DeckCard } from "./DeckCard";
import { useDeckCardStyle } from "./useDeckCardStyle";

type Props = {
  decks: DeckWithoutCards[];
  selectedTagId: string | undefined;
  onDelete: (id: string) => Promise<void>;
};

export const DeckList: React.FC<Props> = ({
  decks,
  selectedTagId,
  onDelete,
}) => {
  const decksView =
    selectedTagId === undefined
      ? decks
      : decks.filter((d) => d.tagIds.includes(selectedTagId));
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
    >
      {decksView.map((deck) => {
        return (
          <DeckCard
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
