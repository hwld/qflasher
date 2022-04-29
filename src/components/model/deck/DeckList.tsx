import {
  DeckListItem,
  DeckListItemProps,
} from "@/components/model/deck/DeckListItem/DeckListItem";
import { PlayOnlyDeckListItem } from "@/components/model/deck/DeckListItem/PlayOnlyDeckListItem";
import { useDeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { DeckWithoutCards } from "@/models";
import { Route } from "@/routes";
import { Grid, GridProps } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { List } from "@chakra-ui/react";
import React, { useMemo } from "react";

export type DeckListProps = {
  decks: DeckWithoutCards[];
  selectedTagId?: string;
  returnRoute: Route;
  styleProps?: GridProps;
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
  styleProps,
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
      as={List}
      templateColumns={`repeat(auto-fill,${
        cardStyle.ringWidth + cardStyle.cardWidth
      }px)`}
      gap={5}
      w="100%"
      {...styleProps}
    >
      {deckItems}
    </Grid>
  );
};
