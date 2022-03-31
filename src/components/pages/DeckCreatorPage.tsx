import { DeckForm, DeckFormProps } from "@/components/model/deck/DeckForm";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useDeckOperation } from "@/hooks/useDeckOperation";
import { useTags } from "@/hooks/useTags";
import { routes } from "@/routes";
import { Box } from "@chakra-ui/react";
import React from "react";
import { MdSave } from "react-icons/md";

type Props = { userId: string };

export const DeckCreatorPage: React.FC<Props> = ({ userId }) => {
  const router = useAppRouter();
  const { tags, addTag, deleteTag } = useTags(userId);
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
          tags={tags}
          formId={formId}
          onSubmit={handleSubmit}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
      </Box>
      <Fab tooltipLabel="作成" type="submit" form={formId}>
        <MdSave size="60%" />
      </Fab>
    </Box>
  );
};
