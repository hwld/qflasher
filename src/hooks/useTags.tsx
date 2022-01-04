import { db } from "@/firebase/config";
import { deckConverter, tagConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { Tag } from "@/types";
import { collection, doc, orderBy, setDoc } from "@firebase/firestore";
import {
  arrayRemove,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";

export type UseTagsResult = {
  tags: Tag[];
  addTag: (tag: Tag) => Promise<unknown>;
  updateTag: (newTag: Tag) => Promise<unknown>;
  deleteTag: (id: string) => Promise<unknown>;
};

export const useTags = (userId: string): UseTagsResult => {
  const tagsRef = useMemo(
    () => collection(db, `users/${userId}/tags`).withConverter(tagConverter),
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
