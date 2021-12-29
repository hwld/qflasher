import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useAppOperation } from "../../hooks/useAppOperation";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useTags } from "../../hooks/useTags";
import { DeckForm, DeckFormProps } from "../DeckForm";
import { Fab } from "../Fab";

type Props = { userId: string };

export const DeckCreatorPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const { tags, addTag, deleteTag } = useTags(userId);
  const { addDeck } = useDeckOperation(userId);
  const formId = "createDeckForm";

  const handleSubmit: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck }) => {
      await addDeck(newDeck);
      router.push("/decks");
    }
  );

  const handleAddTag = useAppOperation(addTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  return (
    <Box>
      <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
        <DeckForm
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
