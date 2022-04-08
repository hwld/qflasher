import { useMyDeck } from "@/components/model/deck/useMyDeck";
import { usePublicDeck } from "@/components/model/deck/usePublicDeck";
import { Deck } from "@/models";
import { displayErrors } from "@/utils/displayError";
import { isErr, isLoading, isOk, Result } from "@/utils/result";
import { useMemo } from "react";

export type UseDeckResult = Result<Deck, "not-found" | "unknown">;

export const useDeck = (userId: string | undefined, deckId: string) => {
  const publicDeck = usePublicDeck(deckId);
  const myDeck = useMyDeck({ userId, deckId });

  const deck = useMemo((): UseDeckResult => {
    // 未ログイン時は公開デッキの結果を渡す
    if (!userId) {
      return publicDeck;
    }

    if (isLoading(myDeck) || isLoading(publicDeck)) {
      return Result.Loading();
    }
    if (isErr(myDeck) && isErr(publicDeck)) {
      displayErrors(myDeck.error, publicDeck.error);
      return Result.Err("unknown");
    }
    if (isOk(myDeck) && isOk(publicDeck)) {
      return myDeck;
    }

    if (isOk(myDeck)) {
      return myDeck;
    }
    if (isOk(publicDeck)) {
      return publicDeck;
    }

    // ここには到達しないと思うけど、型で表現できなかった
    return Result.Err("unknown");
  }, [myDeck, publicDeck, userId]);

  return deck;
};
