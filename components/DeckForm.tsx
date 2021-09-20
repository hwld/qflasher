import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  createRef,
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Deck, DeckWithoutCards, FlashCard } from "../types";
import { CardEditor, CardEditorHandler } from "./CardEditor";

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

export const DeckForm: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [] },
  formId,
  onSubmit,
}) => {
  const [name, setName] = useState(defaultDeck.name);
  const [cards, setCards] = useState<FormFlashCard[]>(
    defaultDeck.cards.map((c) => ({ ...c, deleted: false }))
  );

  const existsCards = useMemo(() => {
    return cards.filter((c) => !c.deleted);
  }, [cards]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardMap = useRef(
    new Map(
      defaultDeck.cards.map((card) => [card.id, createRef<CardEditorHandler>()])
    )
  );

  const addCardTimer = useRef<NodeJS.Timeout>();

  const isFirstCard = (cardId: string) => {
    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    return cardIndex === 0;
  };

  const isLastCard = (cardId: string) => {
    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    return cardIndex === existsCards.length - 1;
  };

  const cardHandler = (cardId: string) => {
    return cardMap.current.get(cardId)?.current;
  };

  const firstCardHandler = () => {
    return cardMap.current.get(existsCards[0].id)?.current;
  };

  const prevCardHandler = (cardId: string) => {
    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    return cardMap.current.get(existsCards[cardIndex - 1].id)?.current;
  };

  const nextCardHandler = (cardId: string) => {
    const cardIndex = existsCards.findIndex((c) => c.id === cardId);
    return cardMap.current.get(existsCards[cardIndex + 1].id)?.current;
  };

  const lastCardHandler = () => {
    return cardMap.current.get(existsCards[existsCards.length - 1].id)?.current;
  };

  const submit = () => {
    onSubmit(
      {
        id: defaultDeck.id,
        name,
        cardLength: cards.filter((c) => !c.deleted).length,
      },
      cards
    );
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setName(value);
  };

  const handleChangeCardField = (
    field: Extract<keyof FlashCard, "answer" | "question">,
    id: string,
    value: string
  ) => {
    setCards((cards) =>
      cards.map((c): FormFlashCard => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const addCard = () => {
    const id = uuidv4();
    // addCardを非同期関数内でawaitのあとに呼び出すと、setCardsが呼び出されたあとにすぐrender関数が呼ばれ、
    // 更新前のcardMapを参照してしまうので必ずcardMapを更新したあとに呼び出す
    cardMap.current.set(id, createRef());
    setCards((cards) => [
      ...cards,
      { id, question: "", answer: "", deleted: false },
    ]);
    return id;
  };

  const handleDeleteCard = (id: string) => {
    cardMap.current.delete(id);
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
      submit();
      return;
    }
    handler();
  };

  const handleKeyDownInName: KeyboardEventHandler = (event) => {
    handleKeyDownTemplate(event, () => {
      if (event.key === "Enter") {
        if (existsCards.length === 0) {
          addCard();
        } else {
          firstCardHandler()?.focusQuestion();
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
          nameInputRef.current?.focus();
        } else {
          prevCardHandler(cardId)?.focusAnswer();
        }
        return;
      }

      if (event.key === "Enter") {
        cardHandler(cardId)?.focusAnswer();
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
        cardHandler(cardId)?.focusQuestion();
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
          nextCardHandler(cardId)?.focusQuestion();
        }
        return;
      }
    });
  };

  useEffect(() => {
    if (cardMap.current.size === 0) {
      nameInputRef.current?.focus();
    } else {
      lastCardHandler()?.focusQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {/* Enterが入力されてもsubmitが発生しないように独立させる。 */}
      <form id={formId} onSubmit={submit}></form>
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
        <Input
          ref={nameInputRef}
          mt={3}
          value={name}
          colorScheme="green"
          onChange={handleChangeName}
          onKeyDown={handleKeyDownInName}
        />
      </Box>
      {existsCards.map((card, i) => {
        return (
          <CardEditor
            index={i + 1}
            ref={cardMap.current.get(card.id)}
            mt={2}
            borderRadius="md"
            boxShadow="dark-lg"
            key={card.id}
            card={card}
            onChangeField={handleChangeCardField}
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
