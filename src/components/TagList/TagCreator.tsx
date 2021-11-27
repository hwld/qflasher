import React from "react";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { EditableTagName, EditableTagNameProps } from "./EditableTagName";
import { UseTagListItemsResult } from "./useTagListItems";

type Props = {
  creatorId: string;
  addTagData: UseTagListItemsResult["addTagData"];
  addTagCreator: UseTagListItemsResult["addTagCreator"];
  deleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
};

export const TagCreator: React.FC<Props> = ({
  creatorId,
  addTagData,
  addTagCreator,
  deleteTagCreator,
}) => {
  const { startLoading, endLoading } = useSetAppState();

  const completeCreate = async (tagName: string) => {
    if (tagName !== "") {
      let id = startLoading();
      await addTagData({ name: tagName }, creatorId);
      endLoading(id);
    } else {
      deleteTagCreator(creatorId);
    }
  };

  const handleKeyDown: EditableTagNameProps["onKeyDown"] = async (
    { key, ctrlKey },
    tagName
  ) => {
    if (key === "Enter") {
      await completeCreate(tagName);
      if (ctrlKey) {
        addTagCreator();
      }
    }
  };

  const handleBlur = (tagName: string) => {
    completeCreate(tagName);
  };

  return <EditableTagName onKeyDown={handleKeyDown} onBlur={handleBlur} />;
};
