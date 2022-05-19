import { Deck, DeckCard, Tag } from "@/models";
import { first, isFirst, isLast, last, next, prev } from "@/utils/array";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

export type DeckFormFields = {
  name: string;
  cards: (Omit<DeckCard, "id"> & { cardId: string })[] | undefined;
  tags: Tag[];
  published: boolean;
};

export const useDeckForm = (defaultDeck: Deck, allTags: Tag[]) => {
  const defaultFields: DeckFormFields = {
    ...defaultDeck,
    cards: defaultDeck.cards.map((c) => ({ ...c, cardId: c.id })),
    tags: defaultDeck.tagIds.map((id) => {
      const tag = allTags.find((tag) => tag.id === id);
      if (!tag) {
        throw new Error("");
      }
      return tag;
    }),
  };

  const {
    control,
    setFocus,
    trigger: triggerValidation,
    formState: { errors },
    handleSubmit: innerHandleSubmit,
  } = useForm<DeckFormFields>({
    mode: "onChange",
    defaultValues: defaultFields,
  });

  const {
    // 文字が入力されてもappend,remove,moveが実行されないとcardFieldsには反映されない?
    // 入力で変更を反映させたければuseWatchを使う
    fields: cardFields,
    append,
    remove,
    move: moveCardField,
  } = useFieldArray({
    control,
    name: "cards",
  });

  const handleSubmit = useCallback(
    (callback: (deck: Omit<Deck, "id" | "userId">) => void) => {
      return innerHandleSubmit((fields) => {
        let cards: DeckCard[] =
          fields.cards?.map(({ cardId, question, answer }, i) => ({
            id: cardId,
            question,
            answer,
          })) ?? [];

        callback({
          name: fields.name,
          cards,
          tagIds: fields.tags.map((t) => t.id),
          cardLength: fields.cards?.length ?? 0,
          published: fields.published,
        });
      });
    },
    [innerHandleSubmit]
  );

  const appendCardField = useCallback(():
    | { type: "error"; message: string }
    | { type: "ok" } => {
    if (cardFields.length === 100) {
      return { type: "error", message: "カードは100枚までしか作れません。" };
    }

    append({ answer: "", cardId: uuid(), question: "" });
    return { type: "ok" };
  }, [append, cardFields.length]);

  const findCardIndex = useCallback(
    (cardId: string) => {
      return cardFields.findIndex((c) => c.cardId === cardId);
    },
    [cardFields]
  );

  const removeCardField = useCallback(
    (cardId: string) => {
      const index = findCardIndex(cardId);
      remove(index);
    },
    [findCardIndex, remove]
  );

  const focusDeckName = useCallback(() => {
    setFocus("name");
  }, [setFocus]);

  const focusPublished = useCallback(() => {
    setFocus("published");
  }, [setFocus]);

  const focusTagSelect = useCallback(() => {
    setFocus("tags");
  }, [setFocus]);

  const focusQuestion = useCallback(
    (cardId: string) => {
      const index = findCardIndex(cardId);
      if (index === -1) return;
      setFocus(`cards.${index}.question`);
    },
    [findCardIndex, setFocus]
  );

  const focusAnswer = useCallback(
    (cardId: string) => {
      const index = findCardIndex(cardId);
      if (index === -1) return;
      setFocus(`cards.${index}.answer`);
    },
    [findCardIndex, setFocus]
  );

  // 補完でリテラル型を表示させるために繰り返し書いた
  function focus(target: "deckName" | "tags" | "published"): void;
  function focus(target: "question" | "answer", cardId: string): void;
  function focus(
    target: "deckName" | "tags" | "question" | "answer" | "published",
    cardId?: string
  ): void {
    if (target === "deckName") {
      focusDeckName();
    } else if (target === "published") {
      focusPublished();
    } else if (target === "tags") {
      focusTagSelect();
    } else if (target === "question" && cardId !== undefined) {
      focusQuestion(cardId);
    } else if (target === "answer" && cardId !== undefined) {
      focusAnswer(cardId);
    }
  }

  const isFirstCard = useCallback(
    (id: string): boolean => isFirst(cardFields, "cardId", id),
    [cardFields]
  );

  const isLastCard = useCallback(
    (id: string): boolean => isLast(cardFields, "cardId", id),
    [cardFields]
  );

  const firstCardId = useCallback((): string => {
    const id = first(cardFields, "cardId");
    if (!id) {
      throw new Error("先頭の要素が見つかりませんでした");
    }
    return id;
  }, [cardFields]);

  const lastCardId = useCallback(() => {
    const id = last(cardFields, "cardId");
    if (!id) {
      throw new Error("末尾の要素が見つかりませんでした");
    }
    return id;
  }, [cardFields]);

  const prevCardId = useCallback(
    (id: string): string => {
      const cardId = prev(cardFields, "cardId", id);
      if (!cardId) {
        throw new Error("指定された要素の前の要素が見つかりませんでした");
      }
      return cardId;
    },
    [cardFields]
  );

  const nextCardId = useCallback(
    (id: string) => {
      const cardId = next(cardFields, "cardId", id);
      if (!cardId) {
        throw new Error("指定された要素の次の要素が見つかりませんでした");
      }
      return cardId;
    },
    [cardFields]
  );

  return {
    control,
    errors,
    cardFields,
    focus,

    isFirstCard,
    isLastCard,
    firstCardId,
    lastCardId,
    prevCardId,
    nextCardId,

    appendCardField,
    removeCardField,
    moveCardField,

    handleSubmit,
    triggerValidation,
  };
};
