import {
  DeckForm,
  DeckFormProps,
} from "@/components/model/deck/DeckForm/DeckForm";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Deck, Tag } from "@/models";
import { routes } from "@/routes";
import { Box } from "@chakra-ui/react";
import { MdSave } from "react-icons/md";

type Props = { userId: string; deck: Deck; allTags: Tag[] };

export const DeckEditorContent: React.VFC<Props> = ({
  userId,
  deck,
  allTags,
}) => {
  const router = useAppRouter();
  const { addTag, deleteTag } = useTagOperation(userId);
  const { updateDeck } = useDeckOperation(userId);
  const formId = "updateDeckForm";

  const handleUpdateDeck: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck, oldCards }) => {
      await updateDeck(newDeck, oldCards);
      router.push({ path: routes.myDecksPage });
    }
  );

  const handleAddTag = useAppOperation(addTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  return (
    <Box>
      <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
        <DeckForm
          userId={userId}
          tags={allTags}
          defaultDeck={deck}
          formId={formId}
          onSubmit={handleUpdateDeck}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
        <Fab tooltipLabel="更新" type="submit" form={formId}>
          <MdSave size="60%" />
        </Fab>
      </Box>
    </Box>
  );
};
