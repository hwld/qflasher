import { Box, Center, Flex, Heading, Tag as ChakraTag } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useMemo, useState } from "react";
import { AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useAppState } from "../../../context/AppStateContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useAppOperation } from "../../../hooks/useAppOperation";
import { useDeckList } from "../../../hooks/useDeckList";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../../hooks/useLoadingEffect";
import { useTags } from "../../../hooks/useTags";
import { DeckList } from "../../model/deck/DeckList/DeckList";
import { Fab } from "../../ui/Fab";
import { SearchBar } from "../../ui/SearchBar/SearchBar";
import { SideArea } from "../../ui/SideArea";
import { SideMenu } from "../../ui/SideMenu/SideMenu";
import { TagsSideView } from "../../ui/TagsSideView";

type DeckListPageProps = { userId: string };
export type DeckListSideMenuNames = "tags" | "search" | "none";

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();
  const confirm = useConfirm();

  const { menuSelected, selectMenu, sideAreaWidth, setSideAreaWidth } =
    useAppState();
  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const selectedTagName = tags.find((t) => t.id === selectedTagId)?.name;

  const handleSelectTagId = (id: string | undefined) => {
    setSelectedTagId(id);
  };

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

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

  const handleAddTag = useAppOperation(addTag);
  const handleUpdateTag = useAppOperation(updateTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  const handleSelectMenu = (name: DeckListSideMenuNames) => {
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
        const viewDecks = useDeckListResult.decks.filter((decks) =>
          decks.name.includes(searchText)
        );
        return (
          <DeckList
            selectedTagId={selectedTagId}
            decks={viewDecks}
            onDelete={handleDeleteDeck}
          />
        );
      }
    }
  }, [
    handleDeleteDeck,
    searchText,
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
          onSelect={handleSelectMenu}
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
                onAddTag={handleAddTag}
                onUpdateTag={handleUpdateTag}
                onDeleteTag={handleDeleteTag}
              />
            )}
          </SideArea>
        )}
      </Flex>
      <Box flexGrow={1} overflowY={"scroll"}>
        <ChakraTag m={3} size="lg" fontWeight="bold">
          {selectedTagName ? selectedTagName : "全てのデッキ"}
        </ChakraTag>
        <SearchBar
          w={"60%"}
          mx={"auto"}
          text={searchText}
          onChange={handleChangeSearchText}
        />
        <Box my={{ base: 3, md: 5 }}>{content}</Box>
        <Fab tooltipLabel="追加" onClick={handleAddDeck}>
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
