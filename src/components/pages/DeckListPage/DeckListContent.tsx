import { DeckList } from "@/components/model/deck/DeckList";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { DeckListHeader } from "@/components/pages/DeckListPage/DeckListHeader";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Stack } from "@chakra-ui/layout";
import { useCallback, useState } from "react";

type Props = {
  userId: string;
  selectedTagId: string | undefined;
  decks: DeckWithoutCards[];
};

export const DeckListContent: React.FC<Props> = ({
  userId,
  selectedTagId,
  decks,
}) => {
  const [searchText, setSearchText] = useState("");
  const { deleteDeck, attachTag } = useDeckOperation(userId);

  const confirm = useConfirm();
  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleDeleteDeck = useCallback(
    async (deckId: string) => {
      confirm({
        onContinue: () => deleteDeckOperation(deckId),
        title: "単語帳の削除",
        body: "単語帳を削除しますか？",
        continueText: "削除する",
        cancelText: "キャンセル",
      });
    },
    [confirm, deleteDeckOperation]
  );

  const handleTagDeck = useAttachTagOperation(attachTag);

  const viewDecks = decks.filter((deck) => deck.name.includes(searchText));

  return (
    <Stack mt={5} ml={{ base: 4, md: 12 }} spacing={5}>
      <DeckListHeader
        userId={userId}
        selectedTagId={selectedTagId}
        searchText={searchText}
        onChangeSearchText={setSearchText}
      />
      <DeckList
        selectedTagId={selectedTagId}
        decks={viewDecks}
        returnRoute={routes.myDecksPage}
        onDeleteDeck={handleDeleteDeck}
        onTagDeck={handleTagDeck}
        styleProps={{ justifyContent: "flex-start" }}
      />
    </Stack>
  );
};
