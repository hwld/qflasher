import { Grid } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";
import { DeckWithoutCards } from "../../types";
import { SelectedTag } from "../pages/DeckListPage/DeckListPage";
import { DeckCard } from "./DeckCard";
import { useDeckCardStyle } from "./useDeckCardStyle";

type Props = {
  decks: DeckWithoutCards[];
  selectedTag: SelectedTag;
  onDelete: (id: string) => Promise<void>;
};

export const DeckList: React.FC<Props> = ({ decks, selectedTag, onDelete }) => {
  const decksView = selectedTag.isAllSelected
    ? decks
    : decks.filter((d) => d.tagIds.includes(selectedTag.selectedTagId));
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
