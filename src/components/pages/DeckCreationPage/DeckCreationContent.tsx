import {
  DeckForm,
  DeckFormProps,
} from "@/components/model/deck/DeckForm/DeckForm";
import { useDeckOperation } from "@/components/model/deck/useDeckOperation";
import { useTagOperation } from "@/components/model/tag/useTagOperation";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { Fab } from "@/components/ui/Fab";
import { useAppOperation } from "@/hooks/useAppOperation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { createDefaultDeck, Tag } from "@/models";
import { routes } from "@/routes";
import { isErr, isLoading } from "@/utils/result";
import { Box } from "@chakra-ui/react";
import { MdSave } from "react-icons/md";

type Props = { userId: string; allTags: Tag[] };

export const DeckCreationContent: React.VFC<Props> = ({ userId, allTags }) => {
  const router = useAppRouter({ currentPage: routes.createDeckPage });
  const queryResult = router.query;

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

  if (isLoading(queryResult)) {
    return <AppLoading />;
  } else if (isErr(queryResult)) {
    return <ErrorMessageBox mx="auto" mt={10} />;
  }

  return (
    <Box>
      <Box my={{ base: 3, md: 5 }} maxW="800px" marginX="auto">
        <DeckForm
          userId={userId}
          tags={allTags}
          formId={formId}
          defaultDeck={{
            ...createDefaultDeck(),
            tagIds: queryResult.data.tagId ? [queryResult.data.tagId] : [],
          }}
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
