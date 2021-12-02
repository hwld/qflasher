import { ListProps, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import { UseTagsResult } from "../../hooks/useTags";
import { TagListItem } from "./TagListItem";
import { TagListItemType, UseTagListItemsResult } from "./useTagListItems";

type Props = {
  tagListItems: TagListItemType[];
  selectedId?: string;
  addTagCreator: UseTagListItemsResult["addTagCreator"];
  deleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
  addTagData: UseTagListItemsResult["addTagData"];
  selectTag: (tagId: string) => void;
  updateTag: UseTagsResult["updateTag"];
  deleteTag: UseTagsResult["deleteTag"];
} & ListProps;

export const TagList: React.FC<Props> = ({
  tagListItems,
  selectedId,
  addTagCreator,
  deleteTagCreator,
  addTagData,
  selectTag,
  updateTag,
  deleteTag,
  ...styles
}) => {
  return (
    <UnorderedList listStyleType="none" m={0} p={0} {...styles}>
      {tagListItems.map((tag) => {
        return (
          <TagListItem
            key={tag.id}
            tagListItem={tag}
            onSelect={selectTag}
            selected={selectedId === tag.id}
            addTagCreator={addTagCreator}
            deleteTagCreator={deleteTagCreator}
            addTagData={addTagData}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />
        );
      })}
    </UnorderedList>
  );
};
