import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { NotOwnerActions } from "@/components/model/deck/DeckListItem/PublicDeckListItem/NotOwnerActions";
import { OwnerActions } from "@/components/model/deck/DeckListItem/PublicDeckListItem/OwnerActions";
import { DeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import React, { useMemo } from "react";

export type PublicDeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
  returnRoutes: Route;
  userId: string | undefined;
};

export const PublicDeckListItem: React.FC<PublicDeckListItemProps> = ({
  cardStyle,
  deck,
  returnRoutes,
  userId,
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

  const menuButtons = useMemo(() => {
    // ログインしていないときは何も表示しない
    if (userId === undefined) {
      return undefined;
    }

    if (deck.userId === userId) {
      return <OwnerActions deck={deck} userId={userId} />;
    } else {
      return <NotOwnerActions deck={deck} userId={userId} />;
    }
  }, [deck, userId]);

  return (
    <DeckListItemBase
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
      menuButtons={menuButtons}
    />
  );
};
