import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useSetAppState } from "../../context/AppStateContextProvider";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { DeckWithoutCards } from "../../types";
import { DeckForm, FormFlashCard } from "../DeckForm";
import { Fab } from "./common/Fab";
import { PageTitle } from "./common/PageTitle";

type Props = { userId: string };

export const DeckCreatorPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const toast = useToast();
  const { addDeck } = useDeckOperation(userId);
  const { startLoading, endLoading } = useSetAppState();
  const formId = "createDeckForm";

  const handleSubmit = async (
    deckWithoutCards: DeckWithoutCards,
    formCards: FormFlashCard[]
  ) => {
    let id = startLoading();
    try {
      await addDeck({
        ...deckWithoutCards,
        // 削除されているcardsは除外する
        cards: formCards.filter((c) => !c.deleted),
      });
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
    <Box>
      <PageTitle mt={5}>デッキ作成</PageTitle>
      <Box mt={5} maxW="800px" marginX="auto">
        <DeckForm formId={formId} onSubmit={handleSubmit} />
      </Box>
      <Fab tooltipLabel="作成" type="submit" form={formId}>
        <MdSave size="60%" />
      </Fab>
    </Box>
  );
};
