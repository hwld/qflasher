import {
  TagCreatorItem,
  TagCreatorProps,
  TagDataItem,
  TagDataProps,
  TagListItemType,
} from "@/components/model/tag/TagListItem";
import { assertNever } from "@/utils/assertNever";
import { BoxProps } from "@chakra-ui/layout";
import React from "react";

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
  switch (tagListItem.type) {
    case "tagData": {
      return (
        <TagDataItem
          tag={tagListItem}
          selected={selected}
          onSelectTag={onSelect}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
          {...props}
        />
      );
    }
    case "tagCreator": {
      return (
        <TagCreatorItem
          creatorId={tagListItem.id}
          onAddTagData={onAddTagData}
          onAddTagCreator={onAddTagCreator}
          onDeleteTagCreator={onDeleteTagCreator}
          {...props}
        />
      );
    }
    default: {
      assertNever(tagListItem);
    }
  }
};
