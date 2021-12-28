import { Box, Center, Flex, Heading, Tag, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useMemo, useState } from "react";
import { AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useAppState } from "../../context/AppStateContext";
import { useConfirm } from "../../context/ConfirmContext";
import { useLoadingStateAction } from "../../context/LoadingStateContext";
import { useDeckList } from "../../hooks/useDeckList";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useTags } from "../../hooks/useTags";
import { DeckList } from "../DeckList";
import { Fab } from "../Fab";
import { SideArea } from "../SideArea";
import { SideMenu } from "../SideMenu/SideMenu";
import { TagsSideView } from "../TagsSideView";

type DeckListPageProps = { userId: string };
export type DeckListSideMenuNames = "tags" | "search" | "none";

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const { startLoading, endLoading } = useLoadingStateAction();
  const { menuSelected, selectMenu, sideAreaWidth, setSideAreaWidth } =
    useAppState();
  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);

  const selectedTagName = tags.find((t) => t.id === selectedTagId)?.name;

  const handleSelectTagId = (id: string | undefined) => {
    setSelectedTagId(id);
  };

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  const handleDeleteDeck = useCallback(
    async (deckId: string) => {
      const deleteDeckWithLoading = async (deckId: string) => {
        let id = startLoading();
        try {
          await deleteDeck(deckId);
        } catch (e) {
          console.error(e);
          toast({
            title: "エラー",
            description: "エラーが発生しました",
            status: "error",
          });
        } finally {
          endLoading(id);
        }
      };

      confirm({
        onContinue: () => deleteDeckWithLoading(deckId),
        title: "単語帳の削除",
        body: "単語帳を削除しますか？",
        continueText: "削除する",
        cancelText: "キャンセル",
      });
    },
    [confirm, deleteDeck, endLoading, startLoading, toast]
  );

  const handleSelect = (name: DeckListSideMenuNames) => {
    if (menuSelected === name) {
      selectMenu("none");
    } else {
      selectMenu(name);
    }
  };

  const content = useMemo(() => {
    switch (useDeckListResult.status) {
      case "error": {
        return (
          <Center>
            <Heading>読み込みに失敗しました</Heading>
          </Center>
        );
      }
      case "loading": {
        return undefined;
      }
      case "success": {
        return (
          <DeckList
            selectedTagId={selectedTagId}
            decks={useDeckListResult.decks}
            onDelete={handleDeleteDeck}
          />
        );
      }
    }
  }, [
    handleDeleteDeck,
    selectedTagId,
    useDeckListResult.decks,
    useDeckListResult.status,
  ]);

  useLoadingEffect(useDeckListResult.status === "loading");

  return (
    <Flex h="100%">
      <Flex>
        <SideMenu
          selected={menuSelected}
          onSelect={handleSelect}
          items={[
            { name: "tags", icon: AiFillTags },
            { name: "search", icon: AiOutlineSearch },
          ]}
        />
        {menuSelected !== "none" && (
          <SideArea width={sideAreaWidth} setWidth={setSideAreaWidth}>
            {menuSelected === "tags" && (
              <TagsSideView
                selectedTagId={selectedTagId}
                onSelectTagId={handleSelectTagId}
                tags={tags}
                onAddTag={addTag}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
              />
            )}
          </SideArea>
        )}
      </Flex>
      <Box flexGrow={1} overflow="auto">
        <Tag m={3} size="lg" fontWeight="bold">
          {selectedTagName ? selectedTagName : "全てのデッキ"}
        </Tag>
        <Box my={{ base: 3, md: 5 }}>{content}</Box>
        <Fab tooltipLabel="追加" onClick={handleAddDeck}>
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
