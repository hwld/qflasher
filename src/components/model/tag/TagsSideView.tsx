import { TagList } from "@/components/model/tag/TagList";
import { useTagListItems } from "@/components/model/tag/TagListItem/useTagListItems";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { useAppOperation } from "@/hooks/useAppOperation";
import { Tag } from "@/models";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";

export type TagsSideViewProps = {
  userId: string;
  selectedTagId: string | undefined;
  onSelectTagId: (id: string | undefined) => void;
  tags: Tag[];
};

export const TagsSideView: React.FC<TagsSideViewProps> = ({
  userId,
  selectedTagId,
  onSelectTagId,
  tags,
}) => {
  const { addTag, updateTag, deleteTag } = useTagOperation(userId);
  const appAddTag = useAppOperation(addTag);
  const appUpdateTag = useAppOperation(updateTag);
  const appDeleteTag = useAppOperation(deleteTag);

  const isAllSelected = selectedTagId === undefined;

  const { tagListItems, addTagCreator, addTagData, deleteTagCreator } =
    useTagListItems(tags, appAddTag);

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
    appDeleteTag(id);
  };

  return (
    <Grid h="100%" templateRows="auto auto auto 1fr">
      <Flex bgColor="gray.500" h="30px" alignItems="center">
        <Box flexGrow={1} />
        <Tooltip label="タグの追加">
          <Button
            boxSize="25px"
            variant={"outline"}
            borderColor="orange.300"
            color={"orange.300"}
            mr={1}
            minW="none"
            p={0}
            rounded={"sm"}
            onClick={handleClickAdd}
          >
            <RiAddFill size="90%" />
          </Button>
        </Tooltip>
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
        onUpdateTag={appUpdateTag}
      />
    </Grid>
  );
};
