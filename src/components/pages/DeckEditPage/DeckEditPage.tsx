import { useMyDeck } from "@/components/model/deck/useMyDeck";
import { useTags } from "@/components/model/tag/useTags";
import { DeckEditorContent } from "@/components/pages/DeckEditPage/DeckEditContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { isErr, isLoading } from "@/utils/result";
import React from "react";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const useMyDeckResult = useMyDeck({ userId, deckId });
  const useTagsResult = useTags(userId);

  if (isLoading(useTagsResult) || isLoading(useMyDeckResult)) {
    return <AppLoading />;
  } else if (isErr(useTagsResult) || isErr(useMyDeckResult)) {
    let errorMessage: string = "";

    if (isErr(useTagsResult)) {
      errorMessage = "タグを読み込むことができませんでした。";
    } else if (isErr(useMyDeckResult)) {
      if (useMyDeckResult.error === "not-found") {
        errorMessage = "デッキが存在しません。";
      } else {
        errorMessage = "デッキを読み込むことができませんでした。";
      }
    }

    return (
      <ErrorMessageBox
        mx="auto"
        mt={10}
        header="エラー"
        description={errorMessage}
      />
    );
  } else {
    return (
      <DeckEditorContent
        userId={userId}
        deck={useMyDeckResult.data}
        allTags={useTagsResult.data}
      />
    );
  }
};
