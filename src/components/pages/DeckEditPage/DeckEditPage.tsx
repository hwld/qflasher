import { useMyDeck } from "@/components/model/deck/useMyDeck";
import { useTags } from "@/components/model/tag/useTags";
import { DeckEditorContent } from "@/components/pages/DeckEditPage/DeckEditContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import React from "react";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const useMyDeckResult = useMyDeck({ userId, deckId });
  const useTagsResult = useTags(userId);

  switch (useTagsResult.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="デッキが存在しません。"
        />
      );
    }
  }

  switch (useMyDeckResult.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      if (useMyDeckResult.error === "not-found") {
        return (
          <ErrorMessageBox
            mx="auto"
            mt={10}
            header="エラー"
            description="デッキが存在しません。"
          />
        );
      }
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="デッキの読み込みに失敗しましfた。"
        />
      );
    }
    case "ok": {
      return (
        <DeckEditorContent
          userId={userId}
          deck={useMyDeckResult.data}
          allTags={useTagsResult.data}
        />
      );
    }
  }
};
