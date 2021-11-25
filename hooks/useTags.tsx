import {
  collection,
  deleteDoc,
  getDoc,
  orderBy,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { doc, query } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { db } from "../firebase/config";
import { flagConverter } from "../firebase/firestoreConverters";
import { Tag } from "../types";
import { useFirestoreCollectionData } from "./useFirestoreCollectionData";

export type UseTagsResult = {
  tags: Tag[];
  addTag: (tag: Tag) => Promise<Tag>;
  updateTag: (newTag: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
};

export const useTags = (userId: string): UseTagsResult => {
  const tagsRef = useMemo(
    () => collection(db, `users/${userId}/tags`).withConverter(flagConverter),
    [userId]
  );
  const tagsQuery = useMemo(
    () => query(tagsRef, orderBy("createdAt", "desc")),
    [tagsRef]
  );

  const tagsData = useFirestoreCollectionData(tagsQuery);

  const tags: Tag[] = useMemo(() => {
    return tagsData.value ?? [];
  }, [tagsData.value]);

  const addTag = useCallback(
    async (tag: Tag) => {
      const tagRef = doc(tagsRef, tag.id);
      await setDoc(tagRef, {
        id: tagRef.id,
        name: tag.name,
        createdAt: serverTimestamp(),
      });

      return { ...tag };
    },
    [tagsRef]
  );

  const updateTag = useCallback(
    async (newTag: Tag) => {
      const tagRef = doc(tagsRef, newTag.id);
      const tag = (await getDoc(tagRef)).data();
      if (!tag) {
        throw new Error("存在しないタグを更新しようとしました");
      }

      await setDoc(tagRef, {
        id: tagRef.id,
        name: newTag.name,
        createdAt: tag.createdAt,
      });
    },
    [tagsRef]
  );

  const deleteTag = useCallback(
    async (id: string) => {
      const tagRef = doc(tagsRef, id);
      await deleteDoc(tagRef);

      // TODO:　デッキから当該タグの削除を行う
    },
    [tagsRef]
  );

  return { tags, addTag, updateTag, deleteTag };
};
