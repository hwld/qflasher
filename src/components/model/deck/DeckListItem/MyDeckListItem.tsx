import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { DeckListItemButton } from "@/components/model/deck/DeckListItem/DeckListItemButton";
import { useDeckCardStyle } from "@/components/model/deck/DeckListItem/useDeckListItemStyle";
import { useTagDrop } from "@/components/model/tag/useTagDnD";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { Route, routes } from "@/routes";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export type MyDeckListItemProps = {
  deck: DeckWithoutCards;
  returnRoutes: Route;
  onDeleteDeck: (id: string) => Promise<void>;
  onTagDeck: (deckId: string, tagId: string) => void;
};

export const MyDeckListItem: React.FC<MyDeckListItemProps> = ({
  deck,
  onDeleteDeck,
  onTagDeck,
  returnRoutes,
}) => {
  const cardStyle = useDeckCardStyle();

  const router = useAppRouter();
  const [{ hovered }, dropRef] = useTagDrop(() => ({
    drop: (tag) => {
      onTagDeck(deck.id, tag.id);
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
    <DeckListItemBase
      ref={dropRef}
      opacity={hovered ? 0.5 : 1}
      deck={deck}
      cardStyle={cardStyle}
      onPlayDeck={handlePlayDeck}
      menuButtons={
        <>
          <DeckListItemButton
            label="削除"
            aria-label="delete deck"
            onClick={handleDelete}
          >
            <MdDelete size="60%" />
          </DeckListItemButton>
          <DeckListItemButton
            ml={2}
            label="編集"
            aria-label="update deck"
            onClick={handleUpdateDeck}
          >
            <MdEdit size="60%" />
          </DeckListItemButton>
        </>
      }
    />
  );
};
