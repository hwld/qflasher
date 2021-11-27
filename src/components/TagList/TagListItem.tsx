import Icon from "@chakra-ui/icon";
import { Flex, ListItem } from "@chakra-ui/layout";
import React, { useMemo } from "react";
import { AiFillTag } from "react-icons/ai";
import { UseTagsResult } from "../../hooks/useTags";
import { assertNever } from "../../utils/assertNever";
import { TagCreator } from "./TagCreator";
import { TagData } from "./TagData";
import { TagListItemType, UseTagListItemsResult } from "./useTagListItems";

type Props = {
  tagListItem: TagListItemType;
  onSelect: (id: string) => void;
  selected: boolean;
  addTagCreator: UseTagListItemsResult["addTagCreator"];
  deleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
  addTagData: UseTagListItemsResult["addTagData"];
  updateTag: UseTagsResult["updateTag"];
  deleteTag: UseTagsResult["deleteTag"];
};

export const TagListItem: React.FC<Props> = ({
  tagListItem,
  onSelect,
  selected,
  addTagCreator,
  deleteTagCreator,
  addTagData,
  updateTag,
  deleteTag,
}) => {
  const itemClass = "tagListItem";

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
            itemClassName={itemClass}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />
        );
      }
      case "tagCreator": {
        return (
          <TagCreator
            creatorId={tagListItem.id}
            addTagData={addTagData}
            addTagCreator={addTagCreator}
            deleteTagCreator={deleteTagCreator}
          />
        );
      }
      default: {
        assertNever(tagListItem);
      }
    }
  }, [
    addTagCreator,
    addTagData,
    deleteTag,
    deleteTagCreator,
    selected,
    tagListItem,
    updateTag,
  ]);

  return (
    <ListItem
      className="tagListItem"
      rounded="md"
      key={tagListItem.id}
      aria-selected={selected}
      mx={1}
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
  );
};
