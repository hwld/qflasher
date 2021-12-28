import React from "react";
import { useLoadingStateAction } from "../../context/LoadingStateContext";
import { EditableTagName, EditableTagNameProps } from "./EditableTagName";
import { UseTagListItemsResult } from "./useTagListItems";

type Props = {
  creatorId: string;
  onAddTagData: UseTagListItemsResult["addTagData"];
  onAddTagCreator: UseTagListItemsResult["addTagCreator"];
  onDeleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
};

export const TagCreator: React.FC<Props> = ({
  creatorId,
  onAddTagData,
  onAddTagCreator,
  onDeleteTagCreator,
}) => {
  const { startLoading, endLoading } = useLoadingStateAction();

  const completeCreate = async (tagName: string) => {
    if (tagName !== "") {
      let id = startLoading();
      await onAddTagData({ name: tagName }, creatorId);
      endLoading(id);
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
