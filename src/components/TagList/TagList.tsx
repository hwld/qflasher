import { ListProps, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import { TagListItem, TagListItemProps } from "./TagListItem";
import { TagListItemType } from "./useTagListItems";

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
  return (
    <UnorderedList listStyleType="none" m={0} p={0} {...styles}>
      {tagListItems.map((tag) => {
        return (
          <TagListItem
            key={tag.id}
            mx={3}
            mb={1}
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
    </UnorderedList>
  );
};
