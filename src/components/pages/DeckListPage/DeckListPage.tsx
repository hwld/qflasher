import { Box, Center, Flex, Heading, Tag } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { Reducer, useMemo, useReducer, useState } from "react";
import { AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useDeckList } from "../../../hooks/useDeckList";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../../hooks/useLoadingEffect";
import { useTags } from "../../../hooks/useTags";
import { assertNever } from "../../../utils/assertNever";
import { DeckList } from "../../DeckList";
import { Fab } from "../common/Fab";
import { SideArea } from "./SideMenu/SideArea";
import { SideMenuItem } from "./SideMenu/SideMenuItem";
import { TagsSideView } from "./SideMenu/TagsSideView/TagsSideView";

type DeckListPageProps = { userId: string };
type SideMenuChoices = "tags" | "search" | "none";

export type SelectedTag =
  | { isAllSelected: true; selectedTagId: undefined }
  | { isAllSelected: false; selectedTagId: string };
export type SelectedTagAction =
  | { type: "selectTag"; tagId: string }
  | { type: "selectAll" };

const reducer: Reducer<SelectedTag, SelectedTagAction> = (state, action) => {
  switch (action.type) {
    case "selectTag": {
      return { isAllSelected: false, selectedTagId: action.tagId };
    }
    case "selectAll": {
      return { isAllSelected: true, selectedTagId: undefined };
    }
    default: {
      return assertNever(action);
    }
  }
};

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();

  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTag, dispatch] = useReducer(reducer, {
    isAllSelected: true,
    selectedTagId: undefined,
  });
  const selectedTagName = tags.find(
    (t) => t.id === selectedTag.selectedTagId
  )?.name;
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  const [selected, setSelected] = useState<SideMenuChoices>("none");

  const handleSelectTags = () => {
    if (selected === "tags") {
      setSelected("none");
    } else {
      setSelected("tags");
    }
  };

  const handleSelectSearch = () => {
    if (selected === "search") {
      setSelected("none");
    } else {
      setSelected("search");
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
            selectedTag={selectedTag}
            decks={useDeckListResult.decks}
            onDelete={deleteDeck}
          />
        );
      }
    }
  }, [
    deleteDeck,
    selectedTag,
    useDeckListResult.decks,
    useDeckListResult.status,
  ]);

  return (
    <Flex h="100%">
      <Flex>
        <Box w="60px" h="100%" bgColor="gray.600" boxShadow="xl">
          <SideMenuItem
            selected={selected === "tags"}
            icon={AiFillTags}
            onClick={handleSelectTags}
          />
          <SideMenuItem
            selected={selected === "search"}
            icon={AiOutlineSearch}
            onClick={handleSelectSearch}
          />
        </Box>
        {selected !== "none" && (
          <SideArea>
            {selected === "tags" && (
              <TagsSideView
                selectedTag={selectedTag}
                dispatch={dispatch}
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
