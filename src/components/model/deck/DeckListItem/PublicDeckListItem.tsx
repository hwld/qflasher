import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { DeckListItemButton } from "@/components/model/deck/DeckListItem/DeckListItemButton";
import { DeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

export type PublicDeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
  returnRoutes: Route;
};

export const PublicDeckListItem: React.FC<PublicDeckListItemProps> = ({
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
      menuButtons={
        <Menu>
          <MenuButton
            as={DeckListItemButton}
            label=""
            css={{ "&>span": { flexGrow: 0 } }}
          >
            <BsThreeDots />
          </MenuButton>
          <MenuList>
            <MenuItem>デッキをコピーする</MenuItem>
            <MenuItem>更新</MenuItem>
            <MenuItem>削除</MenuItem>
          </MenuList>
        </Menu>
      }
    />
  );
};
