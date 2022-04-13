import {
  EditableTagName,
  EditableTagNameProps,
} from "@/components/model/tag/TagListItem/EditableTagName";
import {
  TagListItemBase,
  TagListItemLayoutProps,
} from "@/components/model/tag/TagListItem/TagListItemBase";
import { UseTagListItemsResult } from "@/components/model/tag/TagListItem/useTagListItems";
import { isIME } from "@/utils/isIME";
import { isErr } from "@/utils/result";
import React from "react";

export type TagCreatorProps = {
  creatorId: string;
  onAddTagData: UseTagListItemsResult["addTagData"];
  onAddTagCreator: UseTagListItemsResult["addTagCreator"];
  onDeleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
} & TagListItemLayoutProps;

export const TagCreatorItem: React.FC<TagCreatorProps> = ({
  creatorId,
  onAddTagData,
  onAddTagCreator,
  onDeleteTagCreator,
  ...props
}) => {
  const completeCreate = async (tagName: string) => {
    if (tagName !== "") {
      const result = await onAddTagData({ name: tagName }, creatorId);
      if (isErr(result)) {
        onDeleteTagCreator(creatorId);
      }
    } else {
      onDeleteTagCreator(creatorId);
    }
  };

  const handleKeyDown: EditableTagNameProps["onKeyDown"] = async (
    event,
    tagName
  ) => {
    if (isIME(event)) {
      return;
    }
    if (event.key === "Enter") {
      await completeCreate(tagName);
      if (event.ctrlKey) {
        onAddTagCreator();
      }
    }
  };

  const handleBlur = (tagName: string) => {
    completeCreate(tagName);
  };

  return (
    <TagListItemBase {...props}>
      <EditableTagName onKeyDown={handleKeyDown} onBlur={handleBlur} />
    </TagListItemBase>
  );
};
