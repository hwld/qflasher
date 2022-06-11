import { useTags } from "@/components/model/tag/useTags";
import { DeckCreationContent } from "@/components/pages/DeckCreationPage/DeckCreationContent";
import { AppLoading } from "@/components/ui/AppLoading";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import { isErr, isLoading } from "@/utils/result";
import React from "react";

type Props = { userId: string };

export const DeckCreationPage: React.FC<Props> = ({ userId }) => {
  const router = useAppRouter({ currentPage: routes.createDeckPage });
  const queryResult = router.query;
  const useTagsResult = useTags(userId);

  if (isLoading(useTagsResult) || isLoading(queryResult)) {
    return <AppLoading />;
  }
  if (isErr(useTagsResult) || isErr(queryResult)) {
    return <ErrorMessageBox mx="auto" mt={10} />;
  }

  return (
    <DeckCreationContent
      userId={userId}
      tagId={queryResult.data.tagId}
      allTags={useTagsResult.data}
    />
  );
};
