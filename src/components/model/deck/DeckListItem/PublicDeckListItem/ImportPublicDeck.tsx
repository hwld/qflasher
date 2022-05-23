import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { usePublicDeck } from "@/components/model/deck/usePublicDeck";
import { AppLoading } from "@/components/ui/AppLoading";
import { useAppOperation } from "@/hooks/useAppOperation";
import { DeckWithoutCards } from "@/models";
import { isOk } from "@/utils/result";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = { userId: string; deck: DeckWithoutCards; onComplete: () => void };
export const ImportPublicDeck: React.VFC<Props> = ({
  userId,
  deck,
  onComplete,
}) => {
  const toast = useToast();
  const { addDeck } = useDeckOperation(userId);
  const handleAddDeck = useAppOperation(addDeck, {
    title: "追加エラー",
    description: "デッキを追加することができませんでした。",
  });
  const deckResult = usePublicDeck(deck.id);

  useEffect(() => {
    (async () => {
      switch (deckResult.status) {
        case "loading": {
          break;
        }
        case "error": {
          toast({
            title: "読み込みエラー",
            description: "デッキを読み込むことができませんでした",
            status: "error",
          });
          onComplete();
          break;
        }
        case "ok": {
          const result = await handleAddDeck({
            ...deckResult.data,
            published: false,
          });
          if (isOk(result)) {
            toast({
              title: "インポート成功",
              description: "デッキをインポートしました。",
              status: "success",
            });
          }
          onComplete();
          break;
        }
      }
    })();
  }, [
    addDeck,
    deckResult.data,
    deckResult.status,
    handleAddDeck,
    onComplete,
    toast,
  ]);

  return <AppLoading />;
};
