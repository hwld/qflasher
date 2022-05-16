import { DeckList } from "@/components/model/deck/DeckList";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { DeckListHeader } from "@/components/pages/DeckListPage/DeckListHeader";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { routes } from "@/routes";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useCallback, useState } from "react";

type DeckListViewProps = {
  userId: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
};

export const DeckListView: React.VFC<DeckListViewProps> = ({
  userId,
  selectedTagId,
  selectedTagName,
}) => {
  const [searchText, setSearchText] = useState("");
  const {
    data: decks,
    isInitialLoading,
    isLoading,
    isError,
    canReadMore,
    readMore,
  } = useMyDeckList(userId, selectedTagId);

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

  if (isInitialLoading) {
    return <AppLoading />;
  } else if (isError) {
    return (
      <ErrorMessageBox
        mx="auto"
        mt={5}
        header="エラー"
        description="自分のデッキを読み込むことができませんでした。"
      />
    );
  }

  const viewDecks = decks.filter((deck) => deck.name.includes(searchText));

  return (
    <Stack mt={5} ml={{ base: 4, md: 12 }} spacing={5}>
      <DeckListHeader
        selectedTagName={selectedTagName}
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
      <Box>
        {canReadMore && (
          <Button
            onClick={readMore}
            w="fit-content"
            ml={5}
            bgColor={"orange.300"}
            _hover={{ bgColor: "orange.400" }}
            _active={{ bgColor: "orange.500" }}
            color="gray.800"
            justifyContent="center"
            isLoading={isLoading}
          >
            もっと読み込む
          </Button>
        )}
      </Box>
    </Stack>
  );
};
