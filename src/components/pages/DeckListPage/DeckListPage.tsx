import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { DeckListContent } from "@/components/pages/DeckListPage/DeckListContent";
import { DeckListPageSideMenu } from "@/components/pages/DeckListPage/DeckListPageSideMenu";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Fab } from "@/components/ui/Fab";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";

type DeckListPageProps = { userId: string };
const sideMenuNames = ["tags", "search", "none"] as const;
export type SideMenuName = typeof sideMenuNames[number];
export const isSideMenuName = (arg: unknown): arg is SideMenuName => {
  return sideMenuNames.includes(arg as any);
};

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useAppRouter();
  const useDeckListResult = useMyDeckList(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();

  const handleAddDeck = () => {
    router.push({ path: routes.createDeckPage });
  };

  const content = useMemo(() => {
    switch (useDeckListResult.status) {
      case "loading": {
        return <AppLoading />;
      }
      case "error": {
        return (
          <ErrorMessageBox
            mx="auto"
            mt={10}
            header="エラー"
            description="自分のデッキを読み込むことができませんでした。"
          />
        );
      }
      case "ok": {
        return (
          <DeckListContent
            decks={useDeckListResult.data}
            userId={userId}
            selectedTagId={selectedTagId}
          />
        );
      }
    }
  }, [selectedTagId, useDeckListResult.data, useDeckListResult.status, userId]);

  return (
    <Flex h="100%">
      <DeckListPageSideMenu
        userId={userId}
        selectedTagId={selectedTagId}
        onSelectTag={setSelectedTagId}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
        {content}
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
