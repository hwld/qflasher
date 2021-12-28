import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdSave } from "react-icons/md";
import { useAppOperation } from "../../hooks/useAppOperation";
import { useDeckOperation } from "../../hooks/useDeckOperation";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
import { useMyDeck } from "../../hooks/useMyDeck";
import { useTags } from "../../hooks/useTags";
import { DeckForm, DeckFormProps } from "../DeckForm";
import { Fab } from "../Fab";
import { DeckLoadingErrorPage } from "./DeckLoadingErrorPage";
import { NotFoundDeckPage } from "./NotFoundDeckPage";

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

  useLoadingEffect(useMyDeckResult.status === "loading");

  const handleUpdateDeck: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck, oldCards }) => {
      await updateDeck(newDeck, oldCards);
      router.push("/decks");
    }
  );

  switch (useMyDeckResult.status) {
    case "loading": {
      return null;
    }
    case "error": {
      if (useMyDeckResult.error === "not-found") {
        return <NotFoundDeckPage />;
      }
      return <DeckLoadingErrorPage />;
    }
    case "success": {
      return (
        <Box>
          <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
            <DeckForm
              tags={tags}
              defaultDeck={useMyDeckResult.deck}
              formId={formId}
              onSubmit={handleUpdateDeck}
              onAddTag={addTag}
              onDeleteTag={deleteTag}
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
