import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useMyDeckList } from "@/components/model/deck/useMyDeckList";
import { TagsSideView } from "@/components/model/tag/TagsSideView";
import { useAttachTagOperation } from "@/components/model/tag/useAttachTagOperation";
import { useTags } from "@/components/model/tag/useTags";
import { DeckListPageMain } from "@/components/pages/DeckListPage";
import { Fab } from "@/components/ui/Fab";
import { SideMenu } from "@/components/ui/SideMenu/SideMenu";
import { useConfirm } from "@/context/ConfirmContext";
import { useSideMenu } from "@/context/SideMenuContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillTags } from "react-icons/ai";
import { MdAdd } from "react-icons/md";

type DeckListPageProps = { userId: string };
const sideMenuNames = ["tags", "search", "none"] as const;
export type SideMenuNames = typeof sideMenuNames[number];
export const isSideMenuName = (arg: unknown): arg is SideMenuNames => {
  return sideMenuNames.includes(arg as any);
};

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useAppRouter();
  const confirm = useConfirm();

  const { readMenuSelected, storeMenuSelected } = useSideMenu();
  const [menuSelected, setMenuSelected] = useState<SideMenuNames>("none");

  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const selectedTagName = tags.find((t) => t.id === selectedTagId)?.name;
  const [searchText, setSearchText] = useState("");
  const useDeckListResult = useMyDeckList(userId);
  const { deleteDeck, attachTag } = useDeckOperation(userId);

  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleAddTag = useAppOperation(addTag);
  const handleUpdateTag = useAppOperation(updateTag);
  const handleDeleteTag = useAppOperation(deleteTag);
  const handleTagDeck = useAttachTagOperation(attachTag);

  useEffect(() => {
    const init = async () => {
      const menu = await readMenuSelected();
      if (menu) {
        setMenuSelected(menu);
      }
    };
    init();
  }, [readMenuSelected]);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const handleSelectTagId = (id: string | undefined) => {
    setSelectedTagId(id);
  };

  const handleAddDeck = () => {
    router.push({ path: routes.createDeckPage });
  };

  const handleDeleteDeck = useCallback(
    async (deckId: string) => {
      confirm({
        onContinue: () => deleteDeckOperation(deckId),
        title: "単語帳の削除",
        body: "単語帳を削除しますか？",
        continueText: "削除する",
        cancelText: "キャンセル",
      });
    },
    [confirm, deleteDeckOperation]
  );

  const handleSelectMenu = (name: SideMenuNames) => {
    if (menuSelected === name) {
      storeMenuSelected("none");
      setMenuSelected("none");
    } else {
      storeMenuSelected(name);
      setMenuSelected(name);
    }
  };

  return (
    <Flex h="100%">
      <SideMenu
        selected={menuSelected}
        onSelect={handleSelectMenu}
        items={[
          {
            name: "tags",
            label: "タグ一覧",
            icon: AiFillTags,
            content: (
              <TagsSideView
                selectedTagId={selectedTagId}
                onSelectTagId={handleSelectTagId}
                tags={tags}
                onAddTag={handleAddTag}
                onUpdateTag={handleUpdateTag}
                onDeleteTag={handleDeleteTag}
              />
            ),
          },
        ]}
      />
      <Box flexGrow={1} overflowY={"scroll"}>
        <DeckListPageMain
          deckListData={useDeckListResult}
          searchText={searchText}
          selectedTagId={selectedTagId}
          selectedTagName={selectedTagName}
          onChangeSearchText={handleChangeSearchText}
          onDeleteDeck={handleDeleteDeck}
          onTagDeck={handleTagDeck}
        />
        <Fab tooltipLabel="デッキの追加" onClick={handleAddDeck}>
          <MdAdd size="70%" />
        </Fab>
      </Box>
    </Flex>
  );
};
