import { DeckList } from "@/components/model/deck/DeckList";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { DeckListHeader } from "@/components/pages/DeckListPage/DeckListHeader";
import { DeckListPageSideMenu } from "@/components/pages/DeckListPage/DeckListPageSideMenu";
import { Fab } from "@/components/ui/Fab";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards } from "@/models";
import { routes } from "@/routes";
import { Stack } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  userId: string;
  decks: DeckWithoutCards[];
};

export const DeckListContent: React.FC<Props> = ({ userId, decks }) => {
  const router = useAppRouter();

  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();

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

  const handleAddDeck = () => {
    router.push({ path: routes.createDeckPage });
  };

  return (
    <Flex h="100%">
      <DeckListPageSideMenu
        userId={userId}
        selectedTagId={selectedTagId}
        onSelectTag={setSelectedTagId}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
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
        <Fab
          tooltipLabel="デッキの追加"
          aria-label="go add deck"
          onClick={handleAddDeck}
        >
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
