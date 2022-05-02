import { TagsSideView } from "@/components/model/tag/TagsSideView";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenu } from "@/components/ui/SideMenu/SideMenu";
import { useSideMenu } from "@/context/SideMenuContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { Tag } from "@/models";
import { useState } from "react";
import { AiFillTags } from "react-icons/ai";

type Props = {
  userId: string;
  allTags: Tag[];
  defaultMenuSelected?: SideMenuName;
  defaultMenuWidth?: number;
  selectedTagId: string | undefined;
  onSelectTag: (id: string | undefined) => void;
};

export const DeckListPageSideMenu: React.VFC<Props> = ({
  userId,
  allTags,
  defaultMenuSelected = "none",
  defaultMenuWidth,
  selectedTagId,
  onSelectTag,
}) => {
  const { storeMenuSelected } = useSideMenu();
  const [menuSelected, setMenuSelected] =
    useState<SideMenuName>(defaultMenuSelected);

  const { addTag, updateTag, deleteTag } = useTagOperation(userId);
  const handleAddTag = useAppOperation(addTag);
  const handleUpdateTag = useAppOperation(updateTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  const handleSelectMenu = (name: SideMenuName) => {
    if (menuSelected === name) {
      storeMenuSelected("none");
      setMenuSelected("none");
    } else {
      storeMenuSelected(name);
      setMenuSelected(name);
    }
  };

  return (
    <SideMenu
      selected={menuSelected}
      onSelect={handleSelectMenu}
      defaultWidth={defaultMenuWidth}
      items={[
        {
          name: "tags",
          label: "タグ一覧",
          icon: AiFillTags,
          content: (
            <TagsSideView
              selectedTagId={selectedTagId}
              onSelectTagId={onSelectTag}
              tags={allTags}
              onAddTag={handleAddTag}
              onUpdateTag={handleUpdateTag}
              onDeleteTag={handleDeleteTag}
            />
          ),
        },
      ]}
    />
  );
};
