import { ListProps, UnorderedList } from "@chakra-ui/layout";
import React from "react";
import { Tag } from "../../types";
import { TagListItem } from "./TagListItem";

type Props = {
  tags: Tag[];
  selectedId: string;
  selectTag: (tagId: string) => void;
  updateTag: (tag: Tag) => void;
  deleteTag: (id: string) => void;
} & ListProps;

export const TagList: React.FC<Props> = ({
  tags,
  selectedId,
  selectTag,
  updateTag,
  deleteTag,
  ...styles
}) => {
  return (
    <UnorderedList listStyleType="none" m={0} p={0} {...styles}>
      {tags.map((tag) => {
        return (
          <TagListItem
            key={tag.id}
            tag={tag}
            onSelect={selectTag}
            selected={selectedId === tag.id}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />
        );
      })}
    </UnorderedList>
  );
};
