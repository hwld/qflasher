import { usePublicDeckList } from "@/components/model/deck/usePublicDeckList";
import { PublicDeckListContent } from "@/components/pages/PublicDeckListPage/PublicDeckListContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";

export const PublicDeckListPage: React.FC = () => {
  const publicDecks = usePublicDeckList();

  switch (publicDecks.status) {
    case "loading": {
      return <AppLoading />;
    }
    case "error": {
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="公開デッキの読み込みに失敗しました。"
        />
      );
    }
    case "ok": {
      return <PublicDeckListContent decks={publicDecks.data} />;
    }
  }
};
