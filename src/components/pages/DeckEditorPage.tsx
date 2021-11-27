import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useMyDeck } from "../../hooks/useMyDeck";
import { DeckForm, DeckFormProps } from "../DeckForm";
import { Fab } from "./common/Fab";
import { PageTitle } from "./common/PageTitle";
import { DeckLoadingErrorPage } from "./DeckLoadingErrorPage";
import { NotFoundDeckPage } from "./NotFoundDeckPage";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { updateDeck } = useDeckOperation(userId);
  const { startLoading, endLoading } = useSetAppState();
  const useMyDeckResult = useMyDeck(userId, deckId);
  const formId = "updateDeckForm";

  useLoadingEffect(useMyDeckResult.status === "loading");

  const handleUpdateDeck: DeckFormProps["onSubmit"] = async ({
    newDeck,
    oldCards,
  }) => {
    const id = startLoading();
    try {
      await updateDeck(newDeck, oldCards);
      endLoading(id);
      router.push("/decks");
    } catch (e) {
      endLoading(id);
      console.error(e);
      toast({
        title: "エラー",
        description: "エラーが発生しました",
        status: "error",
      });
    }
  };

  switch (useMyDeckResult.status) {
    case "loading": {
      return null;
    }
    case "error": {
      if (useMyDeckResult.error === "not-found") {
        return <NotFoundDeckPage />;
      }
      return <DeckLoadingErrorPage />;
    }
    case "success": {
      return (
        <Box>
          <PageTitle my={{ base: 3, md: 5 }} mx="auto">
            デッキ更新
          </PageTitle>
          <Box maxW="800px" marginX="auto">
            <DeckForm
              defaultDeck={useMyDeckResult.deck}
              formId={formId}
              onSubmit={handleUpdateDeck}
            />
            <Fab tooltipLabel="更新" type="submit" form={formId}>
              <MdSave size="60%" />
            </Fab>
          </Box>
        </Box>
      );
    }
  }
};