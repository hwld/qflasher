import {
  EditableTagName,
  EditableTagNameProps,
  UseTagListItemsResult,
} from "@/components/model/tag/TagListItem";
import React from "react";

export type TagCreatorProps = {
  creatorId: string;
  onAddTagData: UseTagListItemsResult["addTagData"];
  onAddTagCreator: UseTagListItemsResult["addTagCreator"];
  onDeleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
};

export const TagCreatorItem: React.FC<TagCreatorProps> = ({
  creatorId,
  onAddTagData,
  onAddTagCreator,
  onDeleteTagCreator,
}) => {
  const completeCreate = async (tagName: string) => {
    if (tagName !== "") {
      // TODO: エラーが発生したらonDeleteTagCreatorを実行したい
      const result = await onAddTagData({ name: tagName }, creatorId);
      if (result === "error") {
        onDeleteTagCreator(creatorId);
      }
    } else {
      onDeleteTagCreator(creatorId);
    }
  };

  const handleKeyDown: EditableTagNameProps["onKeyDown"] = async (
    { key, ctrlKey },
    tagName
  ) => {
    if (key === "Enter") {
      await completeCreate(tagName);
      if (ctrlKey) {
        onAddTagCreator();
      }
    }
  };

  const handleBlur = (tagName: string) => {
    completeCreate(tagName);
  };

  return <EditableTagName onKeyDown={handleKeyDown} onBlur={handleBlur} />;
};
