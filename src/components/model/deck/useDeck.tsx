import { useMyDeck } from "@/components/model/deck/useMyDeck";
import { usePublicDeck } from "@/components/model/deck/usePublicDeck";
import { Deck, Result } from "@/types";
import { displayErrors } from "@/utils/displayError";
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

    if (myDeck.status === "loading" || publicDeck.status === "loading") {
      return { status: "loading", data: undefined, error: undefined };
    }
    if (myDeck.status === "error" && publicDeck.status === "error") {
      displayErrors(myDeck.error, publicDeck.error);
      return { status: "error", data: undefined, error: "unknown" };
    }
    if (myDeck.status === "success" && publicDeck.status === "success") {
      return myDeck;
    }

    if (myDeck.status === "success") {
      return myDeck;
    }
    if (publicDeck.status === "success") {
      return publicDeck;
    }

    // ここには到達しない？
    return { status: "error", data: undefined, error: "unknown" };
  }, [myDeck, publicDeck, userId]);

  return deck;
};
