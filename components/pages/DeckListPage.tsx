import { Center, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { useDeckList } from "../../hooks/useDeckList";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { DeckList } from "../DeckList";
import { Fab } from "./common/Fab";
import { PageTitle } from "./common/PageTitle";

type DeckListPageProps = { userId: string };

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck } = useDeckOperation(userId);

  const handleAddDeck = () => {
    router.push("/decks/create");
  };

  useLoadingEffect(useDeckListResult.status === "loading");

  const deckList = useMemo(() => {
    switch (useDeckListResult.status) {
      case "error": {
        return (
          <Center>
            <Heading>読み込みに失敗しました</Heading>
          </Center>
        );
      }
      case "loading": {
        return undefined;
      }
      case "success": {
        return (
          <DeckList decks={useDeckListResult.decks} onDelete={deleteDeck} />
        );
      }
    }
  }, [deleteDeck, useDeckListResult.decks, useDeckListResult.status]);

  return (
    <>
      <PageTitle mt={5} mb={5}>
        デッキ一覧
      </PageTitle>
      {deckList}
      <Fab tooltipLabel="追加" onClick={handleAddDeck}>
        <MdAdd size="70%" />
      </Fab>
    </>
  );
};
