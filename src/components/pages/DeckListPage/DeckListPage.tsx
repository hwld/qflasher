import { TagsSideView } from "@/components/model/tag/TagsSideView";
import { DeckListPageMain } from "@/components/pages/DeckListPage";
import { Fab } from "@/components/ui/Fab";
import { SideMenu } from "@/components/ui/SideMenu";
import { useConfirm } from "@/context/ConfirmContext";
import { useSideMenu, useSideMenuWidth } from "@/context/SideMenuContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAttachTagOperation } from "@/hooks/useAttachTagOperation";
import { useDeckList } from "@/hooks/useDeckList";
import { useDeckOperation } from "@/hooks/useDeckOperation";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useTags } from "@/hooks/useTags";
import { routes } from "@/routes";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import { AiFillTags } from "react-icons/ai";
import { MdAdd } from "react-icons/md";

type DeckListPageProps = { userId: string };
export type DeckListSideMenuNames = "tags" | "search" | "none";

export const DeckListPage: React.FC<DeckListPageProps> = ({ userId }) => {
  const router = useRouter();
  const confirm = useConfirm();

  const sideAreaWidth = useSideMenuWidth();
  const { menuSelected, selectMenu, changeWidth } = useSideMenu();

  const { tags, addTag, updateTag, deleteTag } = useTags(userId);
  const [selectedTagId, setSelectedTagId] = useState<string | undefined>();
  const selectedTagName = tags.find((t) => t.id === selectedTagId)?.name;
  const [searchText, setSearchText] = useState("");
  const useDeckListResult = useDeckList(userId);
  const { deleteDeck, attachTag } = useDeckOperation(userId);

  const deleteDeckOperation = useAppOperation(deleteDeck);
  const handleAddTag = useAppOperation(addTag);
  const handleUpdateTag = useAppOperation(updateTag);
  const handleDeleteTag = useAppOperation(deleteTag);
  const handleTagDeck = useAttachTagOperation(attachTag);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const handleSelectTagId = (id: string | undefined) => {
    setSelectedTagId(id);
  };

  const handleAddDeck = () => {
    router.push(routes.createDeckPage);
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

  const handleSelectMenu = (name: DeckListSideMenuNames) => {
    if (menuSelected === name) {
      selectMenu("none");
    } else {
      selectMenu(name);
    }
  };

  useLoadingEffect(useDeckListResult.status === "loading");

  return (
    <Flex h="100%">
      <SideMenu
        selected={menuSelected}
        onSelect={handleSelectMenu}
        contentWidth={sideAreaWidth}
        onChangeContentWitdh={changeWidth}
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
