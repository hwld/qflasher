import { TagsSideView } from "@/components/model/tag/TagsSideView/TagsSideView";
import { SideMenuName } from "@/components/pages/MyDeckListPage/MyDeckListPage";
import { SideMenu } from "@/components/ui/SideMenu/SideMenu";
import { useSideMenu } from "@/context/SideMenuContext";
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

export const MyDeckListPageSideMenu: React.VFC<Props> = ({
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

  const handleSelectMenu = (name: SideMenuName) => {
    storeMenuSelected(name);
    setMenuSelected(name);
  };

  const handleDeselectMenu = () => {
    storeMenuSelected("none");
    setMenuSelected("none");
  };

  return (
    <SideMenu
      selected={menuSelected}
      onSelectMenu={handleSelectMenu}
      onDeselectMenu={handleDeselectMenu}
      defaultWidth={defaultMenuWidth}
      items={[
        {
          name: "tags",
          label: "タグ一覧",
          icon: AiFillTags,
          content: (
            <TagsSideView
              userId={userId}
              selectedTagId={selectedTagId}
              onSelectTagId={onSelectTag}
              tags={allTags}
            />
          ),
        },
      ]}
    />
  );
};
