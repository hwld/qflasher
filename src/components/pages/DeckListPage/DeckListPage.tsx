import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { useTags } from "@/components/model/tag/useTags";
import { DeckListContent } from "@/components/pages/DeckListPage/DeckListContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useSideMenu } from "@/context/SideMenuContext";
import { useResult } from "@/hooks/useResult";
import { isErr, isLoading } from "@/utils/result";
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
  const { readMenuSelected, readWidth } = useSideMenu();
  const readMenuSelectedResult = useResult(readMenuSelected);
  const readWidthResult = useResult(readWidth);

  if (
    isLoading(readMenuSelectedResult) ||
    isLoading(readWidthResult) ||
    isLoading(useTagsResult) ||
    useDeckListResult.isInitialLoading
  ) {
    return <AppLoading />;
  } else if (useDeckListResult.isError) {
    return (
      <ErrorMessageBox
        mx="auto"
        mt={10}
        header="エラー"
        description="自分のデッキを読み込むことができませんでした。"
      />
    );
  } else if (isErr(useTagsResult)) {
    return (
      <ErrorMessageBox
        mx="auto"
        mt={10}
        header="エラー"
        description="タグの一覧を読み込むことができませんでした。"
      />
    );
  } else {
    return (
      <DeckListContent
        userId={userId}
        decks={useDeckListResult.data}
        allTags={useTagsResult.data}
        defaultMenuSelected={readMenuSelectedResult.data}
        defaultMenuWidth={readWidthResult.data}
        isLoading={useDeckListResult.isLoading}
        readMore={useDeckListResult.readMore}
        canReadMore={useDeckListResult.canReadMore}
      />
    );
  }
};
