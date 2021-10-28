import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Deck, FlashCard } from "../../types";

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
    handleSubmit: innerHandleSubmit,
    trigger: triggerValidation,
    formState: { errors },
  } = useForm<DeckFormFields>({
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (callback: (deck: Omit<Deck, "id">) => void) => {
      return innerHandleSubmit((fields: DeckFormFields) => {
        let cards: FlashCard[];

        if (fields.cards === undefined) {
          cards = [];
        } else {
          const cardFields = fields.cards;
          // cardIdの順番とfieldsのcardの順番は対応している。
          cards = formCardIds.map((id, index) => {
            const field = cardFields[index];
            if (!field) {
              throw new Error("存在しないfieldです");
            }

            return { id, question: field.question, answer: field.answer };
          });
        }

        callback({ name: fields.name, cards, cardLength: cards.length });
      });
    },
    [formCardIds, innerHandleSubmit]
  );

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