import {
  arrayRemove,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { doc, query } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { db } from "../firebase/config";
import { deckConverter, flagConverter } from "../firebase/firestoreConverters";
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
  const decksQuery = useMemo(
    () =>
      query(
        collection(db, `users/${userId}/decks`).withConverter(deckConverter),
        orderBy("createdAt", "desc")
      ),
    [userId]
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

      const decksSnapshot = await getDocs(
        query(decksQuery, where("tagIds", "array-contains", id))
      );
      const promises = decksSnapshot.docs.map((deckDoc) => {
        return updateDoc(deckDoc.ref, { tagIds: arrayRemove(id) });
      });
      await Promise.all(promises);
    },
    [decksQuery, tagsRef]
  );

  return { tags, addTag, updateTag, deleteTag };
};
