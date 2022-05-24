import { DeckItemBase } from "@/components/model/deck/DeckItem/DeckItemBase";
import { DeckItemButton } from "@/components/model/deck/DeckItem/DeckItemButton";
import { DeckItemStyle } from "@/components/model/deck/DeckItem/useDeckItemStyle";
import { useTagDrop } from "@/components/model/tag/useTagDnD";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import React from "react";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";

export type MyDeckItemProps = {
  cardStyle: DeckItemStyle;
  deck: DeckWithoutCards;
  returnRoutes: Route;
  onDeleteDeck: (id: string) => Promise<void>;
  onTagDeck?: (deckId: string, tagId: string) => void;
};

export const MyDeckItem: React.FC<MyDeckItemProps> = ({
  cardStyle,
  deck,
  onDeleteDeck,
  onTagDeck,
  returnRoutes,
}) => {
  const router = useAppRouter();
  const [{ hovered }, dropRef] = useTagDrop(() => ({
    drop: (tag) => {
      onTagDeck?.(deck.id, tag.id);
    },
    collect: (monitor) => {
      return { hovered: monitor.isOver() };
    },
  }));

  const handlePlayDeck = () => {
    router.push({
      path: routes.playSettingPage,
      query: { id: deck.id, redirectTo: returnRoutes },
    });
  };

  const handleUpdateDeck = () => {
    router.push({
      path: routes.editDeckPage,
      query: { id: deck.id },
    });
  };

  const handleDelete = () => {
    onDeleteDeck(deck.id);
  };

  return (
    <DeckItemBase
      ref={dropRef}
      opacity={hovered ? 0.5 : 1}
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
      menuButtons={
        <>
          <DeckItemButton
            label="削除"
            aria-label="delete deck"
            onClick={handleDelete}
          >
            <MdOutlineDelete size="80%" />
          </DeckItemButton>
          <DeckItemButton
            ml={2}
            label="編集"
            aria-label="update deck"
            onClick={handleUpdateDeck}
          >
            <MdOutlineModeEditOutline size="80%" />
          </DeckItemButton>
        </>
      }
    />
  );
};
