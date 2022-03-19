import {
  DeckCardStyle,
  DeckListItemButton,
} from "@/components/model/deck/DeckListItem";
import { DeckListItemBase } from "@/components/model/deck/DeckListItem/DeckListItemBase";
import { useTagDrop } from "@/hooks/useTagDnD";
import { routes } from "@/routes";
import { DeckWithoutCards } from "@/types";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export type DeckListItemProps = {
  cardStyle: DeckCardStyle;
  deck: DeckWithoutCards;
  onDeleteDeck: (id: string) => Promise<void>;
  onTagDeck: (deckId: string, tagId: string) => unknown;
};

export const DeckListItem: React.FC<DeckListItemProps> = ({
  cardStyle,
  deck,
  onDeleteDeck,
  onTagDeck,
}) => {
  const router = useRouter();
  const [{ hovered }, dropRef] = useTagDrop(() => ({
    drop: (tag) => {
      onTagDeck(deck.id, tag.id);
    },
    collect: (monitor) => {
      return { hovered: monitor.isOver() };
    },
  }));

  const handlePlayDeck = () => {
    router.push({ pathname: routes.playDeckPage, query: { id: deck.id } });
  };

  const handleUpdateDeck = () => {
    router.push({ pathname: routes.editDeckPage, query: { id: deck.id } });
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
          <DeckListItemButton label="削除" onClick={handleDelete}>
            <MdDelete size="60%" />
          </DeckListItemButton>
          <DeckListItemButton ml={2} label="編集" onClick={handleUpdateDeck}>
            <MdEdit size="60%" />
          </DeckListItemButton>
        </>
      }
    />
  );
};
