import { Box, Center, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useMyDeck } from "../../hooks/useMyDeck";
import { DeckForm, DeckFormProps } from "../DeckForm";
import { Fab } from "./common/Fab";
import { PageTemplate } from "./common/PageTemplate";

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

  if (useMyDeckResult.status === "loading") {
    return <></>;
  }
  if (useMyDeckResult.status === "error") {
    return (
      <Center minH="100vh">
        <Heading>デッキの読み込みに失敗しました</Heading>
      </Center>
    );
  }

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

  return (
    <PageTemplate title="デッキ更新">
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
    </PageTemplate>
  );
};
