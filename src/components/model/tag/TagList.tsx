import {
  TagListItem,
  TagListItemProps,
  TagListItemType,
} from "@/components/model/tag/TagListItem";
import { useDraggingTag } from "@/hooks/useTagDnD";
import { Box, ListProps, UnorderedList } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";
import React from "react";

export type TagListProps = {
  tagListItems: TagListItemType[];
  selectedId?: string;
  onAddTagCreator: TagListItemProps["onAddTagCreator"];
  onDeleteTagCreator: TagListItemProps["onDeleteTagCreator"];
  onAddTagData: TagListItemProps["onAddTagData"];
  onSelectTag: TagListItemProps["onSelect"];
  onUpdateTag: TagListItemProps["onUpdateTag"];
  onDeleteTag: TagListItemProps["onDeleteTag"];
} & ListProps;

export const TagList: React.FC<TagListProps> = ({
  tagListItems,
  selectedId,
  onAddTagCreator,
  onDeleteTagCreator,
  onAddTagData,
  onSelectTag,
  onUpdateTag,
  onDeleteTag,
  ...styles
}) => {
  const dragObj = useDraggingTag();

  return (
    <UnorderedList listStyleType="none" m={0} p={0} {...styles}>
      {tagListItems.map((tag) => {
        return (
          <TagListItem
            key={tag.id}
            mx={1}
            tagListItem={tag}
            onSelect={onSelectTag}
            selected={selectedId === tag.id}
            onAddTagCreator={onAddTagCreator}
            onDeleteTagCreator={onDeleteTagCreator}
            onAddTagData={onAddTagData}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
          />
        );
      })}
      {dragObj && (
        <Box
          pos={"fixed"}
          top={0}
          left={0}
          transform={`translate(${dragObj.currentOffset.x + 10}px,${
            dragObj.currentOffset?.y
          }px)`}
          pointerEvents={"none"}
          zIndex={1}
        >
          <Tag>{dragObj.tag.name}</Tag>
        </Box>
      )}
    </UnorderedList>
  );
};
