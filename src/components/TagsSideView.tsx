import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import { UseTagsResult } from "../hooks/useTags";
import { Tag } from "../types";
import { TagList, TagListProps } from "./TagList/TagList";
import { useTagListItems } from "./TagList/useTagListItems";

export type TagsSideViewProps = {
  selectedTagId: string | undefined;
  onSelectTagId: (id: string | undefined) => void;
} & {
  tags: UseTagsResult["tags"];
  onAddTag: (tag: Tag) => Promise<"success" | "error">;
  onUpdateTag: TagListProps["onUpdateTag"];
  onDeleteTag: TagListProps["onDeleteTag"];
};

export const TagsSideView: React.FC<TagsSideViewProps> = ({
  selectedTagId,
  onSelectTagId,
  tags,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
}) => {
  const isAllSelected = selectedTagId === undefined;

  const { tagListItems, addTagCreator, addTagData, deleteTagCreator } =
    useTagListItems(tags, onAddTag);

  const handleClickShowAll = () => {
    onSelectTagId(undefined);
  };

  const handleClickAdd = () => {
    addTagCreator();
  };

  const handleDeleteTag = async (id: string) => {
    if (id === selectedTagId) {
      onSelectTagId(undefined);
    }
    onDeleteTag(id);
  };

  return (
    <Grid h="100%" templateRows="auto auto 1fr">
      <Flex bgColor="gray.500" h="30px" alignItems="center">
        <Box flexGrow={1} />
        <Button
          boxSize="25px"
          bgColor="blackAlpha.400"
          _hover={{ bgColor: "blackAlpha.500" }}
          _active={{ bgColor: "blackAlpha.600" }}
          mr={1}
          minW="none"
          p={0}
          onClick={handleClickAdd}
        >
          <RiAddFill size="100%" />
        </Button>
      </Flex>
      <Box
        bgColor="whiteAlpha.200"
        aria-selected={isAllSelected}
        _selected={{ bgColor: "whiteAlpha.400" }}
        m={3}
        rounded="md"
        onClick={handleClickShowAll}
      >
        <Box
          _hover={{ bgColor: "whiteAlpha.300" }}
          _active={{ bgColor: "whiteAlpha.200" }}
          p={2}
        >
          <Text
            fontWeight="bold"
            textAlign="center"
            color={isAllSelected ? "gray.50" : "gray.300"}
            userSelect="none"
          >
            全てのデッキ
          </Text>
        </Box>
      </Box>
      <TagList
        overflow="auto"
        tagListItems={tagListItems}
        selectedId={selectedTagId}
        onAddTagData={addTagData}
        onAddTagCreator={addTagCreator}
        onDeleteTagCreator={deleteTagCreator}
        onDeleteTag={handleDeleteTag}
        onSelectTag={onSelectTagId}
        onUpdateTag={onUpdateTag}
      />
    </Grid>
  );
};
