import { DeckListItemButton } from "@/components/model/deck/DeckListItem/DeckListItemButton";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { useCallback } from "react";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";

type Props = { userId: string; deck: DeckWithoutCards };
export const OwnerActions: React.VFC<Props> = ({ userId, deck }) => {
  const router = useAppRouter();
  const confirm = useConfirm();
  const { deleteDeck } = useDeckOperation(userId);

  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleDeleteDeck = useCallback(async () => {
    confirm({
      onContinue: () => deleteDeckOperation(deck.id),
      title: "単語帳の削除",
      body: "単語帳を削除しますか？",
      continueText: "削除する",
      cancelText: "キャンセル",
    });
  }, [confirm, deck.id, deleteDeckOperation]);

  const handleUpdateDeck = () => {
    router.push({
      path: routes.editDeckPage,
      query: { id: deck.id },
    });
  };

  return (
    <>
      <DeckListItemButton
        label="削除"
        aria-label="delete deck"
        onClick={handleDeleteDeck}
      >
        <MdOutlineDelete size="80%" />
      </DeckListItemButton>
      <DeckListItemButton
        ml={2}
        label="編集"
        aria-label="update deck"
        onClick={handleUpdateDeck}
      >
        <MdOutlineModeEditOutline size="80%" />
      </DeckListItemButton>
    </>
  );
};
