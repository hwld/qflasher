import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { MyDeckList } from "@/components/pages/MyDeckListPage/MyDeckList";
import { MyDeckListHeader } from "@/components/pages/MyDeckListPage/MyDeckListHeader";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useCallback, useState } from "react";

type MyDeckListViewProps = {
  userId: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
};

export const MyDeckListView: React.VFC<MyDeckListViewProps> = ({
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
      <MyDeckListHeader
        selectedTagName={selectedTagName}
        searchText={searchText}
        onChangeSearchText={setSearchText}
      />
      <MyDeckList
        decks={viewDecks}
        onDeleteDeck={handleDeleteDeck}
        onTagDeck={handleTagDeck}
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
