import { DeckListPageMain } from "@/components/pages/DeckListPage/DeckListPageMain";
import { DeckListPageSideMenu } from "@/components/pages/DeckListPage/DeckListPageSideMenu";
import { Fab } from "@/components/ui/Fab";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

type DeckListPageProps = { userId: string };
const sideMenuNames = ["tags", "search", "none"] as const;
export type SideMenuName = typeof sideMenuNames[number];
export const isSideMenuName = (arg: unknown): arg is SideMenuName => {
  return sideMenuNames.includes(arg as any);
};

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useAppRouter();
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();

  const handleAddDeck = () => {
    router.push({ path: routes.createDeckPage });
  };

  return (
    <Flex h="100%">
      <DeckListPageSideMenu
        userId={userId}
        selectedTagId={selectedTagId}
        onSelectTag={setSelectedTagId}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
        <DeckListPageMain userId={userId} selectedTagId={selectedTagId} />
        <Fab
          tooltipLabel="デッキの追加"
          aria-label="go add deck"
          onClick={handleAddDeck}
        >
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
