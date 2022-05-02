import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { useTags } from "@/components/model/tag/useTags";
import { DeckListContent } from "@/components/pages/DeckListPage/DeckListContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import React from "react";

type DeckListPageProps = { userId: string };
const sideMenuNames = ["tags", "search", "none"] as const;
export type SideMenuName = typeof sideMenuNames[number];
export const isSideMenuName = (arg: unknown): arg is SideMenuName => {
  return sideMenuNames.includes(arg as any);
};

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const useDeckListResult = useMyDeckList(userId);
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
          description="タグの一覧を読み込むことができませんでした。"
        />
      );
    }
  }

  switch (useDeckListResult.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="自分のデッキを読み込むことができませんでした。"
        />
      );
    }
    case "ok": {
      return (
        <DeckListContent
          userId={userId}
          decks={useDeckListResult.data}
          allTags={useTagsResult.data}
        />
      );
    }
  }
};
