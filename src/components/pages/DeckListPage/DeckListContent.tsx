import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { DeckListPageSideMenu } from "@/components/pages/DeckListPage/DeckListPageSideMenu";
import { DeckListView } from "@/components/pages/DeckListPage/DeckListView";
import { Fab } from "@/components/ui/Fab";
import { useAppRouter } from "@/hooks/useAppRouter";
import { DeckWithoutCards, Tag } from "@/models";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  userId: string;
  decks: DeckWithoutCards[];
  allTags: Tag[];
  defaultMenuSelected?: SideMenuName;
  defaultMenuWidth?: number;
  isLoading: boolean;
  canReadMore: boolean;
  readMore: () => void;
  selectedTagId: string | undefined;
  onSelectTagId: (value: string | undefined) => void;
};

export const DeckListContent: React.FC<Props> = ({
  userId,
  decks,
  allTags,
  defaultMenuSelected,
  defaultMenuWidth,
  isLoading,
  canReadMore,
  readMore,
  selectedTagId,
  onSelectTagId,
}) => {
  const router = useAppRouter();

  const selectedTagName = useMemo(() => {
    return allTags.find((tag) => tag.id === selectedTagId)?.name;
  }, [allTags, selectedTagId]);

  const handleAddDeck = () => {
    router.push({ path: routes.createDeckPage });
  };

  return (
    <Flex h="100%">
      <DeckListPageSideMenu
        userId={userId}
        allTags={allTags}
        defaultMenuSelected={defaultMenuSelected}
        defaultMenuWidth={defaultMenuWidth}
        selectedTagId={selectedTagId}
        onSelectTag={onSelectTagId}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
        <DeckListView
          userId={userId}
          decks={decks}
          selectedTagId={selectedTagId}
          selectedTagName={selectedTagName}
          canReadMore={canReadMore}
          readMore={readMore}
          isLoading={isLoading}
        />

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
