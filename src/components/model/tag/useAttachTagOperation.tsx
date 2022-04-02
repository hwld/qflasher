import { useWithLoading } from "@/context/LoadingStateContext";
import { DeckOperation } from "@/components/model/deck/useDeckOperation";
import { useWithAppErrorHandler } from "@/hooks/useWithAppErrorHandler";
import { useWithAppSuccessHandler } from "@/hooks/useWithAppSuccessHandler";
import { useWithResult } from "@/hooks/useWithResult";
import { Text } from "@chakra-ui/react";

export const useAttachTagOperation = (
  attachTag: DeckOperation["attachTag"]
) => {
  const withResult = useWithResult(attachTag);
  const withError = useWithAppErrorHandler(withResult);
  const withSuccess = useWithAppSuccessHandler(withError, {
    getMessage: ({ tagName, deckName, alreadyExisted }) => {
      if (alreadyExisted) {
        return (
          <Text display={"inline"}>
            既にデッキ:<strong>{deckName}</strong>にタグ:
            <strong>{tagName}</strong>は存在しています。
          </Text>
        );
      }
      return (
        <Text display={"inline"}>
          デッキ:<strong>{deckName}</strong> に タグ:<strong>{tagName}</strong>
          を追加しました
        </Text>
      );
    },
    isWarning: ({ alreadyExisted }) => alreadyExisted,
  });
  return useWithLoading(withSuccess);
};
