import { DeckCardStyle } from "@/components/model/deck/DeckListItem";
import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { Routes, routes } from "@/routes";
import { DeckWithoutCards } from "@/types";
import { useRouter } from "next/router";
import React from "react";

export type PlayOnlyDeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
  returnRoutes: Routes;
};

export const PlayOnlyDeckListItem: React.FC<PlayOnlyDeckListItemProps> = ({
  cardStyle,
  deck,
  returnRoutes,
}) => {
  const router = useRouter();

  const handlePlayDeck = () => {
    router.push({
      pathname: routes.playSettingPage,
      query: {
        id: deck.id,
        returnTo: returnRoutes,
      },
    });
  };

  return (
    <DeckListItemBase
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
    />
  );
};
