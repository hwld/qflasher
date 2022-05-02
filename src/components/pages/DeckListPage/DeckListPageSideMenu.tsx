import { TagsSideView } from "@/components/model/tag/TagsSideView";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenu } from "@/components/ui/SideMenu/SideMenu";
import { useSideMenu } from "@/context/SideMenuContext";
import { useAppOperation } from "@/hooks/useAppOperation";
import { Tag } from "@/models";
import { useEffect, useState } from "react";
import { AiFillTags } from "react-icons/ai";

type Props = {
  userId: string;
  selectedTagId: string | undefined;
  onSelectTag: (id: string | undefined) => void;
};

export const DeckListPageSideMenu: React.VFC<Props> = ({
  userId,
  selectedTagId,
  onSelectTag,
}) => {
  const { readMenuSelected, storeMenuSelected } = useSideMenu();
  const [menuSelected, setMenuSelected] = useState<SideMenuName>("none");

  const { addTag, updateTag, deleteTag } = useTagOperation(userId);
  // TODO
  const tags: Tag[] = [];
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

  useEffect(() => {
    const init = async () => {
      const menu = await readMenuSelected();
      if (menu) {
        setMenuSelected(menu);
      }
    };
    init();
  }, [readMenuSelected]);

  return (
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
              onSelectTagId={onSelectTag}
              tags={tags}
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
