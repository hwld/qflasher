import { DeckList } from "@/components/model/deck/DeckList";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { useTags } from "@/components/model/tag/useTags";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { SearchBar } from "@/components/ui/SearchBar";
import { useConfirm } from "@/context/ConfirmContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { routes } from "@/routes";
import { Flex, Stack } from "@chakra-ui/layout";
import { Button, Tag, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallback, useMemo, useState } from "react";

type Props = {
  userId: string;
  selectedTagId: string | undefined;
};

export const DeckListPageMain: React.FC<Props> = ({
  userId,
  selectedTagId,
}) => {
  const confirm = useConfirm();

  const { getTagName } = useTags(userId);
  const selectedTagName = useMemo(() => {
    return getTagName(selectedTagId);
  }, [getTagName, selectedTagId]);

  const [searchText, setSearchText] = useState("");
  const useDeckListResult = useMyDeckList(userId);
  const { deleteDeck, attachTag } = useDeckOperation(userId);

  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleTagDeck = useAttachTagOperation(attachTag);

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

  const tagSize = useBreakpointValue({ base: "md", md: "lg" });

  switch (useDeckListResult.status) {
    case "error": {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="自分のデッキを読み込むことができませんでした。"
        />
      );
    }
    case "loading": {
      return <AppLoading />;
    }
    case "ok": {
      const viewDecks = useDeckListResult.data.filter((decks) =>
        decks.name.includes(searchText)
      );
      return (
        // 5
        <Stack
          mt={5}
          ml={{ base: 4, md: 12 }}
          mr={{ base: 4, md: 5 }}
          spacing={5}
        >
          <Stack
            w={"90%"}
            maxW={"600px"}
            bgColor={"gray.600"}
            p={5}
            rounded={"md"}
            ml={"25px"}
          >
            <Stack spacing={5}>
              <Flex justify={"space-between"} flexWrap={"wrap"} gridGap={3}>
                <Tag size={tagSize} fontWeight="bold" alignSelf={"flex-start"}>
                  {selectedTagName ? selectedTagName : "全てのデッキ"}
                </Tag>
                <NextLink href={routes.publicDecksPage} passHref>
                  <Button
                    as={"a"}
                    variant={"outline"}
                    borderColor="orange.300"
                    color={"orange.300"}
                    fontSize={{ base: "xs", md: "sm" }}
                    border="2px"
                  >
                    公開されているデッキを見に行く
                  </Button>
                </NextLink>
              </Flex>
              <SearchBar text={searchText} onChange={setSearchText} />
            </Stack>
          </Stack>
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
    }
  }
};
