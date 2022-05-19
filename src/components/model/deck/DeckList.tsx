import {
  MyDeckListItem,
  MyDeckListItemProps,
} from "@/components/model/deck/DeckListItem/MyDeckListItem";
import { PublicDeckListItem } from "@/components/model/deck/DeckListItem/PublicDeckListItem";
import { useDeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { DeckWithoutCards } from "@/models";
import { Route } from "@/routes";
import { Grid, GridProps } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { List } from "@chakra-ui/react";
import React, { useMemo } from "react";

export type DeckListProps = {
  decks: DeckWithoutCards[];
  returnRoute: Route;
  styleProps?: GridProps;
} & (
  | {
      onDeleteDeck: MyDeckListItemProps["onDeleteDeck"];
      onTagDeck: MyDeckListItemProps["onTagDeck"];
      playOnly?: false;
    }
  | { playOnly: true }
);

export const DeckList: React.VFC<DeckListProps> = ({
  decks,
  returnRoute,
  styleProps,
  ...others
}) => {
  const cardSize =
    useBreakpointValue<"sm" | "md">({ base: "sm", md: "md" }) ?? "md";
  const cardStyle = useDeckCardStyle(cardSize);

  const deckItems = useMemo(() => {
    return decks.map((deck) => {
      if (others.playOnly) {
        return (
          <PublicDeckListItem
            key={deck.id}
            deck={deck}
            cardStyle={cardStyle}
            returnRoutes={returnRoute}
          />
        );
      } else {
        return (
          <MyDeckListItem
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
  }, [cardStyle, decks, others, returnRoute]);

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
