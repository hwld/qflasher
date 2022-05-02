import { useDeck } from "@/components/model/deck/useDeck";
import { DeckPlaySettings } from "@/components/pages/DeckPlayerPage/DeckPlayerPage";
import { SettingFormElement } from "@/components/pages/PlaySettingPage/SettingFormElement";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
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

  switch (queryResult.status) {
    case "loading": {
      return null;
    }
    case "error": {
      return <Redirect href={routes.rootPage} />;
    }
    default: {
      break;
    }
  }

  switch (useDeckResult.status) {
    case "loading": {
      return null;
    }
    case "error": {
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
    }
    case "ok": {
      return (
        <PlaySettingContent
          deck={useDeckResult.data}
          queryData={queryResult.data}
        />
      );
    }
  }
};
