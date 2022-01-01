import { TagList, TagListProps } from "@/components/model/tag/TagList";
import { useTagListItems } from "@/components/model/tag/TagListItem";
import { UseTagsResult } from "@/hooks/useTags";
import { Tag } from "@/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Switch,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";

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
    <Grid h="100%" templateRows="auto auto auto 1fr">
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

      <Flex
        align="center"
        bgColor="whiteAlpha.200"
        color="gray.100"
        mt={3}
        mx={3}
        p={2}
        rounded="md"
        onClick={handleClickShowAll}
      >
        <Switch
          colorScheme={"green"}
          id="all-decks"
          isChecked={isAllSelected}
        />
        <FormLabel
          color={isAllSelected ? "gray.50" : "gray.300"}
          htmlFor="all-decks"
          userSelect={"none"}
          m={0}
          ml={1}
          fontWeight={"bold"}
        >
          すべてのデッキを表示する
        </FormLabel>
      </Flex>
      <Flex my={2} alignItems={"center"}>
        <Text
          ml={2}
          fontWeight={"bold"}
          overflowWrap={"unset"}
          flexGrow={1}
          flexShrink={0}
          userSelect={"none"}
        >
          タグ一覧
        </Text>
        <Divider ml={2} bgColor={"gray.500"} />
      </Flex>
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
