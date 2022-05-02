import { db } from "@/firebase/config";
import { tagConverter } from "@/firebase/firestoreConverters";
import { useFirestoreCollectionData } from "@/hooks/useFirestoreCollectionData";
import { Tag } from "@/models";
import { Result } from "@/utils/result";
import { collection, orderBy, query } from "firebase/firestore";
import { useMemo } from "react";

export const useTags = (userId: string) => {
  const tagsRef = useMemo(
    () => collection(db, `users/${userId}/tags`).withConverter(tagConverter),
    [userId]
  );

  const tagsQuery = useMemo(
    () => query(tagsRef, orderBy("createdAt", "desc")),
    [tagsRef]
  );

  const tagsData = useFirestoreCollectionData(tagsQuery);
  const tagsResult = useMemo((): Result<Tag[]> => {
    switch (tagsData.status) {
      case "loading": {
        return Result.Loading();
      }
      case "error": {
        return Result.Err();
      }
      case "ok": {
        const tags: Tag[] = tagsData.data.map(({ id, name }) => ({
          id,
          name,
        }));
        return Result.Ok(tags);
      }
    }
  }, [tagsData.data, tagsData.status]);

  return tagsResult;
};
