import { Box, Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useMyDeckList } from "../../../contexts/MyDeckListContext";
import { Deck } from "../../../types";
import { DeckForm } from "../../DeckForm";
import { Fab } from "../../Fab";
import { Header } from "../../Header";
import { PageTitle } from "../../PageTitle";

export const DeckEditPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id;
  const { myDeckList, updateDeck } = useMyDeckList();
  const deck = myDeckList.find((deck) => deck.id === id);

  const formId = "updateDeckForm";

  if (!deck) {
    return <Center>存在しません</Center>;
  }

  const handleUpdateDeck = async (deck: Deck) => {
    try {
      await updateDeck(deck);
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
      <PageTitle mt={5}>デッキ更新</PageTitle>
      <Box mt={5} maxW="800px" marginX="auto">
        <DeckForm
          defaultDeck={deck}
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
