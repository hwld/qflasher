import { Box, Text } from "@chakra-ui/layout";
import { Button, Input, useToast } from "@chakra-ui/react";
import React, {
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Deck, DeckWithoutCards, FlashCard } from "../../types";
import { CardEditor } from "./CardEditor";

// リストから削除すると削除すべきカードが特定できないので論理削除にする
export type FormFlashCard = FlashCard & { deleted: boolean };

type Props = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (
    deckWithoutCards: DeckWithoutCards,
    cards: FormFlashCard[]
  ) => void;
};

export type DeckFormFields = {
  name: string;
  // cardsがそんざいしない可能性があるのでundefinedとのunionを取る
  cards: Omit<FlashCard, "id">[] | undefined;
};

export const DeckForm: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [], cardLength: 0 },
  formId,
  onSubmit,
}) => {
  // form用のFlashCards[]とexistsCards[]は対応させる
  const {
    control,
    setFocus,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<DeckFormFields>({
    mode: "onChange",
  });

  const toast = useToast();

  // questionやanswerはreact-hook-formで管理する
  const [cards, setCards] = useState<{ id: string; deleted: boolean }[]>(
    defaultDeck.cards.map((c) => ({ id: c.id, deleted: false }))
  );

  const existingCards = useMemo(() => {
    return cards.filter((c) => !c.deleted);
  }, [cards]);

  const addCardTimer = useRef<NodeJS.Timeout>();

  const isFirstCard = (cardId: string) => {
    const cardIndex = existingCards.findIndex((c) => c.id === cardId);
    return cardIndex === 0;
  };

  const isLastCard = (cardId: string) => {
    const cardIndex = existingCards.findIndex((c) => c.id === cardId);
    return cardIndex === existingCards.length - 1;
  };

  const focusQuestion = (cardId: string) => {
    const index = existingCards.findIndex((field) => field.id === cardId);
    if (index === -1) return;

    setFocus(`cards.${index}.question`);
  };
  const focusAnswer = (cardId: string) => {
    const index = existingCards.findIndex((field) => field.id === cardId);
    if (index === -1) return;

    setFocus(`cards.${index}.answer`);
  };

  const firstCardId = () => {
    return existingCards[0].id;
  };

  const prevCardId = (cardId: string) => {
    const cardIndex = existingCards.findIndex((c) => c.id === cardId);
    return existingCards[cardIndex - 1].id;
  };

  const nextCardId = (cardId: string) => {
    const cardIndex = existingCards.findIndex((c) => c.id === cardId);
    return existingCards[cardIndex + 1].id;
  };

  const lastCardId = () => {
    return existingCards[existingCards.length - 1].id;
  };

  const submit = (fields: DeckFormFields) => {
    if (fields.cards === undefined) {
      addCard();
      trigger();
      return;
    }

    // cardsの情報とreact-hook-formの情報からFormFlashCardsを作成する
    const formCards: FormFlashCard[] = cards.map((card) => {
      const index = existingCards.findIndex((c) => c.id === card.id);
      if (index === -1) {
        // 削除されている場合は情報が存在しないので空文字にする
        return { ...card, question: "", answer: "" };
      }

      if (fields.cards === undefined) {
        throw new Error();
      }

      const field = fields.cards[index];
      if (!fields) {
        throw new Error();
      }

      return { ...card, question: field.question, answer: field.answer };
    });

    onSubmit(
      {
        id: defaultDeck.id,
        name: fields.name,
        cardLength: existingCards.length,
      },
      formCards
    );
  };

  const addCard = () => {
    if (existingCards.length >= 5) {
      toast({
        title: "エラー",
        description: "カードは100枚までしか作れません",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const id = uuidv4();
    // addCardを非同期関数内でawaitのあとに呼び出すと、setCardsが呼び出されたあとにすぐrender関数が呼ばれ、
    // 更新前のcardMapを参照してしまうので必ずcardMapを更新したあとに呼び出す
    setCards((cards) => [
      ...cards,
      { id, question: "", answer: "", deleted: false },
    ]);
    return id;
  };

  const handleDeleteCard = (id: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, deleted: true };
        }
        return c;
      })
    );
  };

  const handleKeyDownTemplate = (event: KeyboardEvent, handler: () => void) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSubmit(submit)();
      return;
    }
    handler();
  };

  const handleKeyDownInName: KeyboardEventHandler = (event) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter") {
        if (existingCards.length === 0) {
          addCard();
        } else {
          focusQuestion(firstCardId());
        }
        return;
      }
    });
  };

  const handleKeyDownInQuestion = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter" && event.shiftKey) {
        if (isFirstCard(cardId)) {
          setFocus("name");
        } else {
          focusAnswer(prevCardId(cardId));
        }
        return;
      }

      if (event.key === "Enter") {
        focusAnswer(cardId);
        return;
      }
    });
  };

  const handleKeyDownInAnswer = (
    cardId: string,
    event: KeyboardEvent<Element>
  ) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter" && event.shiftKey) {
        focusQuestion(cardId);
        return;
      }

      if (event.key === "Enter") {
        if (isLastCard(cardId)) {
          if (addCardTimer.current) {
            clearTimeout(addCardTimer.current);
          }
          addCardTimer.current = setTimeout(() => {
            addCard();
          }, 50);
        } else {
          focusQuestion(nextCardId(cardId));
        }
        return;
      }
    });
  };

  useEffect(() => {
    if (cards.length === 0) {
      setFocus("name");
    } else {
      focusQuestion(lastCardId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {/* Enterが入力されてもsubmitが発生しないように独立させる。 */}
      <form id={formId} onSubmit={handleSubmit(submit)}></form>
      <Box
        bgColor="gray.700"
        padding={5}
        borderTopRadius="3xl"
        borderBottomRadius="md"
        boxShadow="dark-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          名前
        </Text>
        <Controller
          control={control}
          name="name"
          defaultValue={defaultDeck.name}
          rules={{
            required: { value: true, message: "文字を入力してください" },
            maxLength: { value: 50, message: "50文字以下で入力してください" },
          }}
          render={({ field }) => (
            <Input
              mt={3}
              autoComplete="off"
              spellCheck={false}
              isInvalid={!!errors.name}
              colorScheme="green"
              onKeyDown={handleKeyDownInName}
              {...field}
            />
          )}
        />
        {errors.name?.message && (
          <Text ml={3} my={2} color="red">
            ※{errors.name.message}
          </Text>
        )}
      </Box>
      {existingCards.map((card, i) => {
        return (
          <CardEditor
            mt={2}
            borderRadius="md"
            boxShadow="dark-lg"
            index={i}
            formControl={control}
            cardErrors={errors.cards}
            key={card.id}
            id={card.id}
            defaultValue={defaultDeck.cards.find((c) => c.id === card.id)}
            onFocusQuestion={focusQuestion}
            onKeyDownInQuestion={handleKeyDownInQuestion}
            onKeyDownInAnswer={handleKeyDownInAnswer}
            onDelete={handleDeleteCard}
          />
        );
      })}
      <Button
        mt={2}
        w="100%"
        h="50px"
        borderTopRadius="md"
        borderBottomRadius="3xl"
        boxShadow="dark-lg"
        onClick={addCard}
      >
        <MdAdd size="100%" />
      </Button>
    </Box>
  );
};
