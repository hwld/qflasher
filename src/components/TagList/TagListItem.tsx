import Icon from "@chakra-ui/icon";
import { BoxProps, Flex, ListItem } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { AiFillTag } from "react-icons/ai";
import { assertNever } from "../../utils/assertNever";
import { TagCreator, TagCreatorProps } from "./TagCreator";
import { TagData, TagDataProps } from "./TagData";
import { TagListItemType } from "./useTagListItems";

type Props = {
  tagListItem: TagListItemType;
  onSelect: (id: string) => void;
  selected: boolean;
  onAddTagCreator: TagCreatorProps["onAddTagCreator"];
  onDeleteTagCreator: TagCreatorProps["onDeleteTagCreator"];
  onAddTagData: TagCreatorProps["onAddTagData"];
  onUpdateTag: TagDataProps["onUpdateTag"];
  onDeleteTag: TagDataProps["onDeleteTag"];
};

export type TagListItemProps = Props & Omit<BoxProps, keyof Props>;

export const TagListItem: React.FC<TagListItemProps> = ({
  tagListItem,
  onSelect,
  selected,
  onAddTagCreator,
  onDeleteTagCreator,
  onAddTagData,
  onUpdateTag,
  onDeleteTag,
  ...props
}) => {
  const handleItemClick = () => {
    onSelect(tagListItem.id);
  };

  const content = useMemo(() => {
    switch (tagListItem.type) {
      case "tagData": {
        return (
          <TagData
            tag={tagListItem}
            selected={selected}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
          />
        );
      }
      case "tagCreator": {
        return (
          <TagCreator
            creatorId={tagListItem.id}
            onAddTagData={onAddTagData}
            onAddTagCreator={onAddTagCreator}
            onDeleteTagCreator={onDeleteTagCreator}
          />
        );
      }
      default: {
        assertNever(tagListItem);
      }
    }
  }, [
    onAddTagCreator,
    onAddTagData,
    onDeleteTag,
    onDeleteTagCreator,
    selected,
    tagListItem,
    onUpdateTag,
  ]);

  return (
    <Box role="group" {...props}>
      <ListItem
        rounded="md"
        key={tagListItem.id}
        aria-selected={selected}
        _selected={{ bgColor: "whiteAlpha.400" }}
      >
        <Flex
          rounded="md"
          p={1}
          align="center"
          _hover={{ bgColor: "whiteAlpha.300" }}
          // 子要素がクリックされたときにactiveが適用されないようにする
          sx={{ "&:active:not(:focus-within)": { bgColor: "whiteAlpha.200" } }}
          onClick={handleItemClick}
        >
          <Icon as={AiFillTag} mr={2} />
          {content}
        </Flex>
      </ListItem>
    </Box>
  );
};
