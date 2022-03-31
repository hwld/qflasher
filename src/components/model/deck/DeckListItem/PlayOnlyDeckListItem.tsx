import { DeckCardStyle } from "@/components/model/deck/DeckListItem";
import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Route, routes } from "@/routes";
import { DeckWithoutCards } from "@/types";
import React from "react";

export type PlayOnlyDeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
  returnRoutes: Route;
};

export const PlayOnlyDeckListItem: React.FC<PlayOnlyDeckListItemProps> = ({
  cardStyle,
  deck,
  returnRoutes,
}) => {
  const router = useAppRouter();

  const handlePlayDeck = () => {
    router.push({
      path: routes.playSettingPage,
      query: {
        id: deck.id,
        redirectTo: returnRoutes,
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
