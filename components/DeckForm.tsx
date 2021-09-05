import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  createRef,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { Deck } from "../types";
import { CardEditor, CardEditorHandler } from "./CardEditor";

type Props = {
  defaultDeck?: Deck;
  formId: string;
  // ctrl+EnterでもSubmitされるようにする
  onSubmit: (deck: Deck) => void;
};

const Component: React.FC<Props> = ({
  defaultDeck = { id: "", name: "", cards: [] },
  formId,
  onSubmit,
}) => {
  const [name, setName] = useState(defaultDeck.name);
  const [cards, setCards] = useState(defaultDeck.cards);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardMap = useRef(
    new Map(
      defaultDeck.cards.map((card) => [card.id, createRef<CardEditorHandler>()])
    )
  );

  const handleKeyDown: KeyboardEventHandler = ({ key, ctrlKey }) => {
    if (ctrlKey && key === "Enter") {
      onSubmit({ id: defaultDeck.id, name, cards });
    }
  };

  const handleSubmit: FormEventHandler = () => {
    onSubmit({ id: defaultDeck.id, name, cards });
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setName(value);
  };
  const handleChangeQuestion = (id: string, question: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, question };
        }
        return c;
      })
    );
  };
  const handleChangeAnswer = (id: string, answer: string) => {
    setCards((cards) =>
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, answer };
        }
        return c;
      })
    );
  };

  const addCard = () => {
    const id = Math.random().toString();
    setCards((cards) => [...cards, { id, question: "", answer: "" }]);
    cardMap.current.set(id, createRef());
    return id;
  };
  const handleAddCard = () => {
    addCard();
  };
  const handleDeleteCard = (id: string) => {
    setCards((cards) => cards.filter((c) => c.id !== id));
    cardMap.current.delete(id);
  };

  const handleKeyDownName: KeyboardEventHandler = ({ key }) => {
    if (key === "Enter") {
      if (cards.length === 0) {
        addCard();
      } else {
        cardMap.current.get(cards[0].id)?.current?.focusFirst();
      }
    }
  };
  const handlePrevFocus = (id: string) => {
    const cardIndex = cards.findIndex((c) => c.id === id);
    if (cardIndex === 0) {
      nameInputRef.current?.focus();
    } else {
      cardMap.current.get(cards[cardIndex - 1].id)?.current?.focusLast();
    }
  };
  const handleNextFocus = (id: string) => {
    const cardIndex = cards.findIndex((c) => c.id === id);
    if (cardIndex === cards.length - 1) {
      addCard();
    } else {
      cardMap.current.get(cards[cardIndex + 1].id)?.current?.focusFirst();
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Box onKeyDown={handleKeyDown}>
      {/* Enterが入力されてもsubmitが発生しないように独立させる。 */}
      <form id={formId} onSubmit={handleSubmit} />
      <Box
        bgColor="gray.700"
        paddingX={5}
        paddingY={3}
        borderTopRadius="3xl"
        boxShadow="dark-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          暗記帳の名前
        </Text>
        <Input
          ref={nameInputRef}
          mt={2}
          value={name}
          onChange={handleChangeName}
          onKeyDown={handleKeyDownName}
        />
      </Box>
      {cards.map((card) => {
        return (
          <CardEditor
            ref={cardMap.current.get(card.id)}
            mt={2}
            boxShadow="dark-lg"
            key={card.id}
            card={card}
            onChangeQuestion={handleChangeQuestion}
            onChangeAnswer={handleChangeAnswer}
            onPrevFocus={handlePrevFocus}
            onNextFocus={handleNextFocus}
            onDelete={handleDeleteCard}
          />
        );
      })}
      <Button
        mt={2}
        w="100%"
        h="50px"
        rounded="none"
        boxShadow="dark-lg"
        onClick={handleAddCard}
      >
        <MdAdd size="100%" />
      </Button>
    </Box>
  );
};

export const DeckForm = Component;
