import React from "react";
import { EditableTagName } from "./EditableTagName";
import { UseTagListItemsResult } from "./useTagListItems";

type Props = {
  creatorId: string;
  addTagData: UseTagListItemsResult["addTagData"];
  deleteTagCreator: UseTagListItemsResult["deleteTagCreator"];
};

export const TagCreator: React.FC<Props> = ({
  creatorId,
  addTagData,
  deleteTagCreator,
}) => {
  const handleCompleteCreate = (tagName: string) => {
    if (tagName !== "") {
      addTagData({ name: tagName }, creatorId);
    } else {
      deleteTagCreator(creatorId);
    }
  };

  return <EditableTagName onComplete={handleCompleteCreate} />;
};
