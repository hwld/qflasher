import { useDeck } from "@/components/model/deck/useDeck";
import { PlaySettingContent } from "@/components/pages/PlaySettingPage/PlaySettingContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { isErr, isLoading } from "@/utils/result";
import React from "react";

type Props = {
  userId: string | undefined;
  deckId: string;
};

export type SettingFormData = { value: boolean; text: string };
export type SettingForm = {
  isAnswerFirst: SettingFormData;
  isOrderRandom: SettingFormData;
};

export const PlaySettingPage: React.FC<Props> = ({ userId, deckId }) => {
  const router = useAppRouter({ currentPage: routes.playSettingPage });
  const queryResult = router.query;
  const useDeckResult = useDeck(userId, deckId);

  if (isLoading(queryResult) || isLoading(useDeckResult)) {
    return <AppLoading />;
  } else if (isErr(queryResult)) {
    return <Redirect href={routes.rootPage} />;
  } else if (isErr(useDeckResult)) {
    if (useDeckResult.error === "not-found") {
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
  } else {
    return (
      <PlaySettingContent
        deck={useDeckResult.data}
        queryData={queryResult.data}
      />
    );
  }
};
