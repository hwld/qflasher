import {
  DeckListItem,
  DeckListItemProps,
  useDeckCardStyle,
} from "@/components/model/deck/DeckListItem";
import { PlayOnlyDeckListItem } from "@/components/model/deck/DeckListItem/PlayOnlyDeckListItem";
import { Route } from "@/routes";
import { DeckWithoutCards } from "@/types";
import { FlexProps, Grid } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useMemo } from "react";

export type DeckListProps = {
  decks: DeckWithoutCards[];
  selectedTagId?: string;
  returnRoute: Route;
  justifyContent?: FlexProps["justify"];
} & (
  | {
      onDeleteDeck: DeckListItemProps["onDeleteDeck"];
      onTagDeck: DeckListItemProps["onTagDeck"];
      playOnly?: false;
    }
  | { playOnly: true }
);

export const DeckList: React.VFC<DeckListProps> = ({
  decks,
  selectedTagId,
  returnRoute,
  justifyContent = "center",
  ...others
}) => {
  const decksView = selectedTagId
    ? decks.filter((d) => d.tagIds.includes(selectedTagId))
    : decks;
  const cardSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  const cardStyle = useDeckCardStyle(cardSize);

  const deckItems = useMemo(() => {
    return decksView.map((deck) => {
      if (others.playOnly) {
        return (
          <PlayOnlyDeckListItem
            key={deck.id}
            deck={deck}
            cardStyle={cardStyle}
            returnRoutes={returnRoute}
          />
        );
      } else {
        return (
          <DeckListItem
            key={deck.id}
            cardStyle={cardStyle}
            deck={deck}
            returnRoutes={returnRoute}
            onDeleteDeck={others.onDeleteDeck}
            onTagDeck={others.onTagDeck}
          />
        );
      }
    });
  }, [cardStyle, decksView, others, returnRoute]);

  return (
    <Grid
      templateColumns={`repeat(auto-fill,${
        cardStyle.ringWidth + cardStyle.cardWidth
      }px)`}
      gap={5}
      w="100%"
      justifyContent={justifyContent}
    >
      {deckItems}
    </Grid>
  );
};
