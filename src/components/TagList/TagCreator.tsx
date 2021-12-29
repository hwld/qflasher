import React from "react";
import { EditableTagName, EditableTagNameProps } from "./EditableTagName";
import { UseTagListItemsResult } from "./useTagListItems";

export type TagCreatorProps = {
  creatorId: string;
  onAddTagData: UseTagListItemsResult["addTagData"];
  onAddTagCreator: UseTagListItemsResult["addTagCreator"];
  onDeleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
};

export const TagCreator: React.FC<TagCreatorProps> = ({
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
