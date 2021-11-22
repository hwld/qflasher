import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDeckList } from "../../../hooks/useDeckList";
import { useDeckOperation } from "../../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../../hooks/useLoadingEffect";
import { useTags } from "../../../hooks/useTags";
import { DeckList } from "../../DeckList";
import { Fab } from "../common/Fab";
import { PageTitle } from "../common/PageTitle";
import { SideMenu, SideMenuChoices } from "./SideMenu/SideMenu";

type DeckListPageProps = { userId: string };

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();

  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
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

  const [selected, setSelected] = useState<SideMenuChoices>("none");
  const handleSelect = (selected: SideMenuChoices) => {
    setSelected(selected);
  };

  return (
    <Flex h="100%">
      <SideMenu
        selected={selected}
        onSelect={handleSelect}
        tags={tags}
        addTag={addTag}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
      <Box flexGrow={1} overflow="auto">
        <PageTitle my={{ base: 3, md: 5 }} mx="auto">
          デッキ一覧
        </PageTitle>
        {deckList}
        <Fab tooltipLabel="追加" onClick={handleAddDeck}>
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
