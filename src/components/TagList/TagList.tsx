import { ListProps, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import { UseTagsResult } from "../../hooks/useTags";
import { TagListItem } from "./TagListItem";
import { TagListItemType, UseTagListItemsResult } from "./useTagListItems";

type Props = {
  tagListItems: TagListItemType[];
  selectedId?: string;
  onAddTagCreator: UseTagListItemsResult["addTagCreator"];
  onDeleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
  onAddTagData: UseTagListItemsResult["addTagData"];
  onSelectTag: (tagId: string) => void;
  onUpdateTag: UseTagsResult["updateTag"];
  onDeleteTag: UseTagsResult["deleteTag"];
} & ListProps;

export const TagList: React.FC<Props> = ({
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
            mx={2}
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
