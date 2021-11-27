import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { UseTagsResult } from "../../hooks/useTags";
import { Tag } from "../../types";
import { TagData } from "./TagData";

type TagData = { type: "tagData" } & Tag;
type TagCreator = { type: "tagCreator"; id: string };
export type TagListItemType = TagData | TagCreator;

export type UseTagListItemsResult = {
  tagListItems: TagListItemType[];
  addTagCreator: () => void;
  addTagData: (formTag: Omit<Tag, "id">, creatorId: string) => Promise<void>;
  deleteTagCreator: (id: string) => void;
};

export const useTagListItems = (
  tags: Tag[],
  addTag: UseTagsResult["addTag"]
): UseTagListItemsResult => {
  const [tagCreators, setTagCreators] = useState<TagCreator[]>([]);

  const tagListItems: TagListItemType[] = [
    // tagのidと同じidを持つtagCreatorを除外する。
    ...tagCreators.filter(
      (creator) => !tags.find((tag) => tag.id === creator.id)
    ),
    ...tags.map((tag) => ({ ...tag, type: "tagData" as const })),
  ];

  useEffect(() => {
    setTagCreators((creators) =>
      creators.filter((creator) => !tags.find((tag) => tag.id === creator.id))
    );
  }, [tags]);

  const addTagCreator = useCallback(() => {
    setTagCreators((items) => [{ type: "tagCreator", id: uuid() }, ...items]);
  }, []);

  const deleteTagCreator = useCallback((id: string) => {
    setTagCreators((items) =>
      items.filter((item) => !(item.type === "tagCreator" && item.id === id))
    );
  }, []);

  const addTagData = useCallback(
    async (formTag: Omit<Tag, "id">, creatorId: string) => {
      await addTag({ ...formTag, id: creatorId });
    },
    [addTag]
  );

  return {
    tagListItems,
    addTagCreator,
    addTagData,
    deleteTagCreator,
  };
};