import { useTags } from "@/components/model/tag/useTags";
import { MyDeckListContent } from "@/components/pages/MyDeckListPage/MyDeckListContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useSideMenu } from "@/context/SideMenuContext";
import { useResult } from "@/hooks/useResult";
import { isErr, isLoading } from "@/utils/result";
import React, { useState } from "react";

type MyDeckListPageProps = { userId: string };
const sideMenuNames = ["tags", "search", "none"] as const;
export type SideMenuName = typeof sideMenuNames[number];
export const isSideMenuName = (arg: unknown): arg is SideMenuName => {
  return sideMenuNames.includes(arg as any);
};

export const MyDeckListPage: React.FC<MyDeckListPageProps> = ({ userId }) => {
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const useTagsResult = useTags(userId);
  const { readMenuSelected, readWidth } = useSideMenu();
  const readMenuSelectedResult = useResult(readMenuSelected);
  const readWidthResult = useResult(readWidth);

  if (
    isLoading(readMenuSelectedResult) ||
    isLoading(readWidthResult) ||
    isLoading(useTagsResult)
  ) {
    return <AppLoading />;
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
      <MyDeckListContent
        userId={userId}
        allTags={useTagsResult.data}
        defaultMenuSelected={readMenuSelectedResult.data}
        defaultMenuWidth={readWidthResult.data}
        selectedTagId={selectedTagId}
        onSelectTagId={setSelectedTagId}
      />
    );
  }
};
