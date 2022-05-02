import { useTags } from "@/components/model/tag/useTags";
import { DeckCreationContent } from "@/components/pages/DeckCreationPage/DeckCreationContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import React from "react";

type Props = { userId: string };

export const DeckCreationPage: React.FC<Props> = ({ userId }) => {
  const useTagsResult = useTags(userId);

  switch (useTagsResult.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      return (
        <ErrorMessageBox
          mx={"auto"}
          mt={10}
          header="エラー"
          description="タグ一覧の読み込みに失敗しました。"
        />
      );
    }
    case "ok": {
      return (
        <DeckCreationContent userId={userId} allTags={useTagsResult.data} />
      );
    }
  }
};
