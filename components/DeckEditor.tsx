import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  RefObject,
  useRef,
} from "react";
import { MdAdd } from "react-icons/md";
import { Deck } from "../types";
import { CardEditor, CardEditorHandler } from "./CardEditor";

type Props = { deck: Deck; onChangeDeck: (deck: Deck) => void };

const Component: React.FC<Props> = ({ deck, onChangeDeck }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardsMap = useRef(new Map<string, RefObject<CardEditorHandler>>());

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeDeck({ ...deck, name: value });
  };
  const handleChangeQuestion = (id: string, value: string) => {
    onChangeDeck({
      ...deck,
      cards: deck.cards.map((card) => {
        if (card.id === id) {
          return { ...card, question: value };
        }
        return card;
      }),
    });
  };
  const handleChangeAnswer = (id: string, value: string) => {
    onChangeDeck({
      ...deck,
      cards: deck.cards.map((card) => {
        if (card.id === id) {
          return { ...card, answer: value };
        }
        return card;
      }),
    });
  };

  const handleAddCard = () => {
    onChangeDeck({
      ...deck,
      cards: [
        ...deck.cards,
        { id: Math.random().toString(), question: "", answer: "" },
      ],
    });
  };
  const handleDeleteCard = (id: string) => {
    onChangeDeck({
      ...deck,
      cards: deck.cards.filter((card) => card.id !== id),
    });
  };

  const handleKeyDownName: KeyboardEventHandler = () => {};
  const handlePrevFocus = (id: string) => {};
  const handleNextFocus = (id: string) => {};

  return (
    <Box>
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
          value={deck.name}
          onChange={handleChangeName}
          onKeyDown={handleKeyDownName}
        />
      </Box>
      {deck.cards.map((card) => {
        return (
          <CardEditor
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

export const DeckEditor = Component;
