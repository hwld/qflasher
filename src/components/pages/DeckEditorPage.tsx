import {
  DeckForm,
  DeckFormProps,
} from "@/components/model/deck/DeckForm/DeckForm";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useMyDeck } from "@/components/model/deck/useMyDeck";
import { useTags } from "@/components/model/tag/useTags";
import { routes } from "@/routes";
import { Box } from "@chakra-ui/react";
import React from "react";
import { MdSave } from "react-icons/md";

type DeckEditPageProps = { deckId: string; userId: string };

export const DeckEditPage: React.FC<DeckEditPageProps> = ({
  deckId,
  userId,
}) => {
  const router = useAppRouter();
  const { tags, addTag, deleteTag } = useTags(userId);
  const { updateDeck } = useDeckOperation(userId);
  const useMyDeckResult = useMyDeck({ userId, deckId });
  const formId = "updateDeckForm";

  const handleUpdateDeck: DeckFormProps["onSubmit"] = useAppOperation(
    async ({ newDeck, oldCards }) => {
      await updateDeck(newDeck, oldCards);
      router.push({ path: routes.myDecksPage });
    }
  );

  const handleAddTag = useAppOperation(addTag);
  const handleDeleteTag = useAppOperation(deleteTag);

  switch (useMyDeckResult.status) {
    case "loading": {
      return <AppLoading isLoading={true} />;
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
              userId={userId}
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
