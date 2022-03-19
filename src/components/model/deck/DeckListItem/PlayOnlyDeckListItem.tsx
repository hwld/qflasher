import { DeckCardStyle } from "@/components/model/deck/DeckListItem";
import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { routes } from "@/routes";
import { DeckWithoutCards } from "@/types";
import { useRouter } from "next/dist/client/router";
import React from "react";

export type PlayOnlyDeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
};

export const PlayOnlyDeckListItem: React.FC<PlayOnlyDeckListItemProps> = ({
  cardStyle,
  deck,
}) => {
  const router = useRouter();

  const handlePlayDeck = () => {
    router.push({ pathname: routes.playDeckPage, query: { id: deck.id } });
  };

  return (
    <DeckListItemBase
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
    />
  );
};
