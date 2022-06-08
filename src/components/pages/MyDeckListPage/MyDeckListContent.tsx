import { SideMenuName } from "@/components/pages/MyDeckListPage/MyDeckListPage";
import { MyDeckListPageSideMenu } from "@/components/pages/MyDeckListPage/MyDeckListPageSideMenu";
import { MyDeckListView } from "@/components/pages/MyDeckListPage/MyDeckListView";
import { Fab } from "@/components/ui/Fab";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Tag } from "@/models";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  userId: string;
  allTags: Tag[];
  defaultMenuSelected?: SideMenuName;
  defaultMenuWidth?: number;
  selectedTagId: string | undefined;
  onSelectTagId: (value: string | undefined) => void;
};

export const MyDeckListContent: React.FC<Props> = ({
  userId,
  allTags,
  defaultMenuSelected,
  defaultMenuWidth,
  selectedTagId,
  onSelectTagId,
}) => {
  const router = useAppRouter();

  const selectedTagName = useMemo(() => {
    return allTags.find((tag) => tag.id === selectedTagId)?.name;
  }, [allTags, selectedTagId]);

  const handleAddDeck = () => {
    router.push({
      path: routes.createDeckPage,
      query: { tagId: selectedTagId },
    });
  };

  return (
    <Flex h="100%">
      <MyDeckListPageSideMenu
        userId={userId}
        allTags={allTags}
        defaultMenuSelected={defaultMenuSelected}
        defaultMenuWidth={defaultMenuWidth}
        selectedTagId={selectedTagId}
        onSelectTag={onSelectTagId}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
        <MyDeckListView
          userId={userId}
          selectedTagId={selectedTagId}
          selectedTagName={selectedTagName}
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
