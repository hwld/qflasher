import {
  Box,
  Center,
  CircularProgress,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { useMyDeck } from "../../../hooks/useMyDeck";
import { DeckWithoutCards } from "../../../types";
import { DeckForm, FormFlashCard } from "../../DeckForm";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { updateDeck } = useDeckOperation(userId);
  const [isLoading, setIsLoading] = useState(false);
  const useMyDeckResult = useMyDeck(userId, deckId);
  const formId = "updateDeckForm";

  if (useMyDeckResult.status === "loading") {
    return (
      <Center minH="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (useMyDeckResult.status === "error") {
    return (
      <Center minH="100vh">
        <Heading>デッキの読み込みに失敗しました</Heading>
      </Center>
    );
  }

  const handleUpdateDeck = async (
    deckWithoutCards: DeckWithoutCards,
    formCards: FormFlashCard[]
  ) => {
    try {
      setIsLoading(true);
      await updateDeck(deckWithoutCards, formCards);
      router.push("/decks");
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      toast({
        title: "エラー",
        description: "エラーが発生しました",
        status: "error",
      });
    }
  };

  return (
    <Box minH="100vh">
      <Header isLoading={isLoading} />
      <PageTitle mt={5}>デッキ更新</PageTitle>
      <Box mt={5} maxW="800px" marginX="auto">
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
};
