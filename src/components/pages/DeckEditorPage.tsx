import { DeckForm, DeckFormProps } from "@/components/model/deck/DeckForm";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useDeckOperation } from "@/hooks/useDeckOperation";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useMyDeck } from "@/hooks/useMyDeck";
import { useTags } from "@/hooks/useTags";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const router = useRouter();
  const { tags, addTag, deleteTag } = useTags(userId);
  const { updateDeck } = useDeckOperation(userId);
  const useMyDeckResult = useMyDeck(userId, deckId);
  const formId = "updateDeckForm";

  const handleUpdateDeck: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck, oldCards }) => {
      await updateDeck(newDeck, oldCards);
      router.push("/decks");
    }
  );

  const handleAddTag = useAppOperation(addTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  useLoadingEffect(useMyDeckResult.status === "loading");

  switch (useMyDeckResult.status) {
    case "loading": {
      return null;
    }
    case "error": {
      if (useMyDeckResult.error === "not-found") {
        return (
          <ErrorMessageBox
            mx="auto"
            mt={10}
            header="エラー"
            description="デッキが存在しません。"
          />
        );
      }
      return (
        <ErrorMessageBox
          mx="auto"
          mt={10}
          header="エラー"
          description="デッキの読み込みに失敗しましfた。"
        />
      );
    }
    case "success": {
      return (
        <Box>
          <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
            <DeckForm
              tags={tags}
              defaultDeck={useMyDeckResult.data}
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
    }
  }
};
