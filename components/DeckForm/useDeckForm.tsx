import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FlashCard } from "../../types";

export type DeckFormFields = {
  name: string;
  cards: Omit<FlashCard, "id">[] | undefined;
};

type UseDeckFormArg = {
  formCardIds: string[];
};

export const useDeckForm = ({ formCardIds }: UseDeckFormArg) => {
  const {
    control,
    setFocus,
    handleSubmit,
    trigger: triggerValidation,
    formState: { errors },
  } = useForm<DeckFormFields>({
    mode: "onChange",
  });

  const focusDeckName = useCallback(() => {
    setFocus("name");
  }, [setFocus]);

  const focusQuestion = useCallback(
    (targetId: string) => {
      const index = formCardIds.findIndex((id) => id === targetId);
      if (index === -1) return;

      setFocus(`cards.${index}.question`);
    },
    [formCardIds, setFocus]
  );

  const focusAnswer = useCallback(
    (targetId: string) => {
      const index = formCardIds.findIndex((id) => id === targetId);
      if (index === -1) return;

      setFocus(`cards.${index}.answer`);
    },
    [formCardIds, setFocus]
  );

  return {
    control,
    focusDeckName,
    focusQuestion,
    focusAnswer,
    handleSubmit,
    triggerValidation,
    errors,
  };
};
