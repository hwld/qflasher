import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { DeckListItemButton } from "@/components/model/deck/DeckListItem/DeckListItemButton";
import { AuthorMenuList } from "@/components/model/deck/DeckListItem/PublicDeckListItem/AuthorMenuItem";
import { PublicMenuList } from "@/components/model/deck/DeckListItem/PublicDeckListItem/PublicMenuItem";
import { DeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";

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

  const menuItem = useMemo(() => {
    if (userId !== undefined && deck.userId === userId) {
      return <AuthorMenuList userId={userId} deckId={deck.id} />;
    }
    return <PublicMenuList />;
  }, [deck.id, deck.userId, userId]);

  return (
    <DeckListItemBase
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
      menuButtons={
        <Menu>
          <MenuButton
            as={DeckListItemButton}
            label=""
            css={{ "&>span": { flexGrow: 0 } }}
          >
            <BsThreeDots />
          </MenuButton>
          <MenuList>{menuItem}</MenuList>
        </Menu>
      }
    />
  );
};
