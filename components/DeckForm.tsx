import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { Deck } from "../types";
import { CardEditor } from "./CardEditor";

type Props = {
  defaultDeck?: Deck;
  formId: string;
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

  const handleAddCard = () => {
    setCards((cards) => [
      ...cards,
      { id: Math.random().toString(), question: "", answer: "" },
    ]);
  };
  const handleDeleteCard = (id: string) => {
    setCards((cards) => cards.filter((c) => c.id !== id));
  };

  const handleKeyDownName: KeyboardEventHandler = () => {};
  const handlePrevFocus = (id: string) => {};
  const handleNextFocus = (id: string) => {};

  return (
    <Box>
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
