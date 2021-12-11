import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useLoadingStateAction } from "../../context/LoadingStateContext";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useTags } from "../../hooks/useTags";
import { DeckForm, DeckFormProps } from "../DeckForm";
import { Fab } from "../Fab";

type Props = { userId: string };

export const DeckCreatorPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const toast = useToast();
  const { tags, addTag, deleteTag } = useTags(userId);
  const { addDeck } = useDeckOperation(userId);
  const { startLoading, endLoading } = useLoadingStateAction();
  const formId = "createDeckForm";

  const handleSubmit: DeckFormProps["onSubmit"] = async ({ newDeck }) => {
    const id = startLoading();
    try {
      await addDeck(newDeck);
      endLoading(id);
      router.push("/decks");
    } catch (e) {
      endLoading(id);
      console.error(e);
      toast({
        title: "エラー",
        description: "エラーが発生しました",
        status: "error",
      });
    }
  };

  return (
    <Box>
      <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
        <DeckForm
          tags={tags}
          formId={formId}
          onSubmit={handleSubmit}
          onAddTag={addTag}
          onDeleteTag={deleteTag}
        />
      </Box>
      <Fab tooltipLabel="作成" type="submit" form={formId}>
        <MdSave size="60%" />
      </Fab>
    </Box>
  );
};
