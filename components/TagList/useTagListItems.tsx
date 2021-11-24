import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { UseTagsResult } from "../../hooks/useTags";
import { Tag } from "../../types";

type TagData = { type: "tagData" } & Tag;
type TagCreator = { type: "tagCreator"; id: string };
export type TagListItemType = TagData | TagCreator;

export type UseTagListItemsResult = {
  tagListItems: TagListItemType[];
  addTagCreator: () => void;
  addTagData: (formTag: Omit<Tag, "id">, creatorId: string) => void;
  deleteTagCreator: (id: string) => void;
};

// Tagのほかに、タグ入力のためのアイテムを受け入れるリスト。
// タグ入力のためのアイテムの追加・削除のみを許可し、Tagの追加、更新、削除はhookの引数であるtagsに対して行う。
// 引数であるtagsが変更されると、tagListItemも変更される。
export const useTagListItems = (
  tags: Tag[],
  addTag: UseTagsResult["addTag"]
): UseTagListItemsResult => {
  const [tagListItems, setTagListItems] = useState<TagListItemType[]>(
    tags.map((tag) => ({ type: "tagData", ...tag }))
  );

  // tagsが変更されたときにlistItemsを変更する
  useEffect(() => {
    setTagListItems((items) => {
      // tagsに存在しないtagDataを削除する
      const deleted: TagListItemType[] = items.filter((item) => {
        if (item.type === "tagCreator") {
          return true;
        }
        if (item.type === "tagData" && tags.find((tag) => tag.id === item.id)) {
          return true;
        }
        return false;
      });

      // tagsと同じidをもつtagDataを更新する
      const updated: TagListItemType[] = deleted.map((item) => {
        if (item.type === "tagCreator") {
          return item;
        }
        const tag = tags.find((tag) => tag.id === item.id);
        if (!tag) {
          throw new Error();
        }
        return { type: "tagData", ...tag };
      });

      // tagsにだけあるtagDataを追加する
      const newTags: TagListItemType[] = tags
        .filter((tag) => !items.find((item) => item.id === tag.id))
        .map((newTag) => ({ type: "tagData" as const, ...newTag }))
        .reverse();
      const added = [...newTags, ...updated];

      return added;
    });
  }, [tags]);

  const addTagCreator = useCallback(() => {
    setTagListItems((items) => [{ type: "tagCreator", id: uuid() }, ...items]);
  }, []);

  const addTagData = useCallback(
    async (formTag: Omit<Tag, "id">, creatorId: string) => {
      // 下のaddTagが実行されると同期的に再レンダリングが発生する。
      // その時、tagCreatorを削除してしまうと、次のレンダリングでタグが追加されたときにちらつきが発生してしまう。
      setTagListItems((items) =>
        items.map((item) => {
          if (item.type === "tagCreator" && item.id === creatorId) {
            // tagCreatorのidを一時的に付与する
            return { ...item, type: "tagData", ...formTag };
          }
          return item;
        })
      );

      // addTagを呼ぶと、内部でsetDocが実行され、すぐにfirestoreのonSnapshotのコールバックが呼ばれ、setStateが実行され、その後同期的に再レンダリングが行われる。
      // そのため、この呼出後に同期的に再レンダリングが起こることになり、その後useEffectも動く。
      // addTagでtagsを追加すると、次のレンダリングのあとのuseEffectでtagsに追加されたデータがlistに反映される。
      const newTag = await addTag(formTag);

      setTagListItems((items) =>
        items.map((item) => {
          if (item.type === "tagCreator" && item.id === creatorId) {
            // 実際のidを使用する
            return { ...item, id: newTag.id };
          }
          return item;
        })
      );
    },
    [addTag]
  );

  const deleteTagCreator = useCallback((id: string) => {
    setTagListItems((items) =>
      items.filter((item) => !(item.type === "tagCreator" && item.id === id))
    );
  }, []);

  return {
    tagListItems,
    addTagCreator,
    addTagData,
    deleteTagCreator,
  };
};
