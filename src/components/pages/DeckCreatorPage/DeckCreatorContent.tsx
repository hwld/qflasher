import {
  DeckForm,
  DeckFormProps,
} from "@/components/model/deck/DeckForm/DeckForm";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Tag } from "@/models";
import { routes } from "@/routes";
import { Box } from "@chakra-ui/react";
import { MdSave } from "react-icons/md";

type Props = { userId: string; allTags: Tag[] };

export const DeckCreatorContent: React.VFC<Props> = ({ userId, allTags }) => {
  const router = useAppRouter();
  const { addTag, deleteTag } = useTagOperation(userId);
  const { addDeck } = useDeckOperation(userId);
  const formId = "createDeckForm";

  const handleSubmit: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck }) => {
      await addDeck(newDeck);
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
          formId={formId}
          onSubmit={handleSubmit}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
      </Box>
      <Fab
        tooltipLabel="作成"
        type="submit"
        aria-label="add deck"
        form={formId}
      >
        <MdSave size="60%" />
      </Fab>
    </Box>
  );
};
