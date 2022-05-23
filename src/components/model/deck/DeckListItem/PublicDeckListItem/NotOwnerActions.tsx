import { DeckListItemButton } from "@/components/model/deck/DeckListItem/DeckListItemButton";
import { ImportPublicDeck } from "@/components/model/deck/DeckListItem/PublicDeckListItem/ImportPublicDeck";
import { DeckWithoutCards } from "@/models";
import { useDisclosure } from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";

type Props = { userId: string; deck: DeckWithoutCards };
export const NotOwnerActions: React.VFC<Props> = ({ userId, deck }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  return (
    <>
      <DeckListItemButton label="インポート" onClick={onOpen}>
        <MdDownload size="80%" />
      </DeckListItemButton>
      {/* クリックしたときにだけusePublicDeckを実行するために、機能を実行するだけのコンポーネントに分割する */}
      {isOpen && (
        <ImportPublicDeck userId={userId} deck={deck} onComplete={onClose} />
      )}
    </>
  );
};
