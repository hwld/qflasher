import { db } from "@/firebase/config";
import {
  privateFieldOnDeckConverter,
  tagConverter,
} from "@/firebase/firestoreConverters";
import { Tag } from "@/models";
import {
  collection,
  collectionGroup,
  doc,
  setDoc,
  writeBatch,
} from "@firebase/firestore";
import {
  arrayRemove,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";

export type UseTagOperationResult = {
  addTag: (tag: Tag) => Promise<unknown>;
  updateTag: (newTag: Tag) => Promise<unknown>;
  deleteTag: (id: string) => Promise<unknown>;
};

export const useTagOperation = (userId: string): UseTagOperationResult => {
  const tagsRef = useMemo(
    () => collection(db, `users/${userId}/tags`).withConverter(tagConverter),
    [userId]
  );

  const privateRef = useMemo(() => {
    return collectionGroup(db, "private").withConverter(
      privateFieldOnDeckConverter
    );
  }, []);

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
      const batch = writeBatch(db);

      const tagRef = doc(tagsRef, id);
      batch.delete(tagRef);

      const privatesSnapshot = await getDocs(
        query(
          privateRef,
          where("uid", "==", userId),
          where("tagIds", "array-contains", id)
        )
      );

      privatesSnapshot.docs.map((privateField) => {
        batch.update(privateField.ref, { tagIds: arrayRemove(id) });
      });

      await batch.commit();
    },
    [privateRef, tagsRef, userId]
  );

  return { addTag, updateTag, deleteTag };
};