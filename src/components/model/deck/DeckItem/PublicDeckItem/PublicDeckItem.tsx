import { DeckItemBase } from "@/components/model/deck/DeckItem/DeckItemBase";
import { NotOwnerActions } from "@/components/model/deck/DeckItem/PublicDeckItem/NotOwnerActions";
import { OwnerActions } from "@/components/model/deck/DeckItem/PublicDeckItem/OwnerActions";
import { DeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import React, { useMemo } from "react";

export type PublicDeckItemProps = {
  cardStyle: DeckItemStyle;
  deck: DeckWithoutCards;
  returnRoutes: Route;
  userId: string | undefined;
};

export const PublicDeckItem: React.FC<PublicDeckItemProps> = ({
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
    <DeckItemBase
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
      menuButtons={menuButtons}
    />
  );
};
