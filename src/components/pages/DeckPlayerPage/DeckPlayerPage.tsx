import { useDeck } from "@/components/model/deck/useDeck";
import { DeckPlayerContent } from "@/components/pages/DeckPlayerPage/DeckPlayerContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useAppRouter } from "@/hooks/useAppRouter";
import { isRoute, routes } from "@/routes";
import { isErr, isLoading } from "@/utils/result";
import React from "react";

type DeckPlayerPageProps = {
  deckId: string;
  userId: string | undefined;
  settings: DeckPlaySettings;
};

export type DeckPlaySettings = {
  initialFront: "question" | "answer";
  isOrderRandom: boolean;
};

export const DeckPlayerPage: React.FC<DeckPlayerPageProps> = ({
  deckId,
  userId,
  settings,
}) => {
  const router = useAppRouter({ currentPage: routes.playDeckPage });
  const queryResult = router.query;
  const useDeckResult = useDeck(userId, deckId);

  if (isLoading(useDeckResult) || isLoading(queryResult)) {
    return <AppLoading />;
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
    const redirectToQuery = queryResult.data?.redirectTo;
    const redirectTo = isRoute(redirectToQuery)
      ? redirectToQuery
      : routes.rootPage;
    return (
      <DeckPlayerContent
        deck={useDeckResult.data}
        settings={settings}
        returnRoute={redirectTo}
      />
    );
  }
};
