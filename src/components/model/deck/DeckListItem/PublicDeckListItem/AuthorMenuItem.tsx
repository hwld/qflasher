import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { MenuItem } from "@chakra-ui/react";
import React, { useCallback } from "react";

type Props = { userId: string; deckId: string };

export const AuthorMenuList: React.FC<Props> = ({ userId, deckId }) => {
  const router = useAppRouter();
  const { deleteDeck, updateDeck } = useDeckOperation(userId);
  const confirm = useConfirm();
  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleDeleteDeck = useCallback(async () => {
    confirm({
      onContinue: () => deleteDeckOperation(deckId),
      title: "単語帳の削除",
      body: "単語帳を削除しますか？",
      continueText: "削除する",
      cancelText: "キャンセル",
    });
  }, [confirm, deckId, deleteDeckOperation]);

  const handleUpdateDeck = () => {
    router.push({
      path: routes.editDeckPage,
      query: { id: deckId },
    });
  };

  return (
    <>
      <MenuItem onClick={handleUpdateDeck}>更新する</MenuItem>
      <MenuItem onClick={handleDeleteDeck}>削除する</MenuItem>
    </>
  );
};
