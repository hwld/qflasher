import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { MdSave } from "react-icons/md";
import { useSetAppState } from "../../../context/AppStateContextProvider";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { DeckWithoutCards } from "../../../types";
import { DeckForm, FormFlashCard } from "../../DeckForm";
import { Fab } from "../../Fab";
import { PageTitle } from "../../PageTitle";

type Props = { userId: string };

export const DeckCreatorPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const toast = useToast();
  const { addDeck } = useDeckOperation(userId);
  const { setIsLoading } = useSetAppState();
  const formId = "createDeckForm";

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

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
