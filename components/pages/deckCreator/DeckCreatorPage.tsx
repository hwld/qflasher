import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useMyDeckList } from "../../../contexts/MyDeckListContext";
import { Deck } from "../../../types";
import { DeckForm } from "../../DeckForm";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckCreatorPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { addDeck } = useMyDeckList();

  const formId = "createDeckForm";

  const handleSubmit = async (deck: Deck) => {
    try {
      await addDeck({ ...deck, id: Math.random().toString() });
      router.push("/decks");
    } catch (e) {
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
      <Header />
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
