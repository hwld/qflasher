import { DeckList } from "@/components/model/deck/DeckList";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { DeckListHeader } from "@/components/pages/DeckListPage/DeckListHeader";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useCallback, useState } from "react";

type DeckListViewProps = {
  userId: string;
  selectedTagId: string | undefined;
  selectedTagName: string | undefined;
  decks: DeckWithoutCards[];
  canReadMore: boolean;
  readMore: () => void;
  isLoading: boolean;
};

export const DeckListView: React.VFC<DeckListViewProps> = ({
  userId,
  selectedTagId,
  selectedTagName,
  decks,
  canReadMore,
  readMore,
  isLoading,
}) => {
  const [searchText, setSearchText] = useState("");
  const viewDecks = decks.filter((deck) => deck.name.includes(searchText));

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
