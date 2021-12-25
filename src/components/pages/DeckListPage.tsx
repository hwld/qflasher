import { Box, Center, Flex, Heading, Tag } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useMemo, useState } from "react";
import { AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useAppState } from "../../context/AppStateContext";
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

  const { menuSelected, selectMenu, sideAreaWidth, setSideAreaWidth } =
    useAppState();
  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const selectedTagName = tags.find((t) => t.id === selectedTagId)?.name;
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);

  const handleSelectTagId = (id: string | undefined) => {
    setSelectedTagId(id);
  };

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  const handleSelect = (name: DeckListSideMenuNames) => {
    if (menuSelected === name) {
      selectMenu("none");
    } else {
      selectMenu(name);
    }
  };

  useLoadingEffect(useDeckListResult.status === "loading");

  const deckList = useMemo(() => {
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
            onDelete={deleteDeck}
          />
        );
      }
    }
  }, [
    deleteDeck,
    selectedTagId,
    useDeckListResult.decks,
    useDeckListResult.status,
  ]);

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
                addTag={addTag}
                updateTag={updateTag}
                deleteTag={deleteTag}
              />
            )}
          </SideArea>
        )}
      </Flex>
      <Box flexGrow={1} overflow="auto">
        <Tag m={3} size="lg" fontWeight="bold">
          {selectedTagName ? selectedTagName : "全てのデッキ"}
        </Tag>
        <Box my={{ base: 3, md: 5 }}>{deckList}</Box>
        <Fab tooltipLabel="追加" onClick={handleAddDeck}>
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
