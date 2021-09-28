import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import { useMyDeckListOperations } from "../../../contexts/MyDeckListContext";
import { DeckWithoutCards } from "../../../types";
import { DeckForm, FormFlashCard } from "../../DeckForm";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckCreatorPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { addDeck } = useMyDeckListOperations();
  const [isLoading, setIsLoading] = useState(false);

  const formId = "createDeckForm";

  const handleSubmit = async (
    deckWithoutCards: DeckWithoutCards,
    formCards: FormFlashCard[]
  ) => {
    try {
      setIsLoading(true);
      await addDeck({
        ...deckWithoutCards,
        // 削除されているcardsは除外する
        cards: formCards.filter((c) => !c.deleted),
      });
      router.push("/decks");
    } catch (e) {
      // 処理が成功したらページを移動するので失敗したときにのみ状態を変更する
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
