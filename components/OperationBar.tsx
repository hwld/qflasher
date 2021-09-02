import { Button, Flex, FlexProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdClear, MdPanoramaFishEye, MdReplay } from "react-icons/md";

type Props = {
  className?: string;
  onTurnOver: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
} & FlexProps;

const Component: React.FC<Props> = ({
  className,
  onTurnOver,
  onCorrect,
  onIncorrect,
  ...styleProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCorrect = () => {
    // TODO 仮
    setIsOpen(false);
    onCorrect();
  };

  const handleInCorrect = () => {
    // TODO 仮
    setIsOpen(false);
    onIncorrect();
  };

  const handleTurnOver = () => {
    setIsOpen(true);
    onTurnOver();
  };

  return (
    <Flex className={className} justify="center" align="center" {...styleProps}>
      {isOpen && (
        <Button
          colorScheme="blue"
          boxSize="70px"
          borderRadius="100%"
          mr={3}
          onClick={handleCorrect}
        >
          <MdPanoramaFishEye size={30} />
        </Button>
      )}
      {!isOpen && (
        <Button colorScheme="green" boxSize="70px" onClick={handleTurnOver}>
          <MdReplay size={30} />
        </Button>
      )}
      {isOpen && (
        <Button
          colorScheme="red"
          boxSize="70px"
          borderRadius="100%"
          ml={3}
          onClick={handleInCorrect}
        >
          <MdClear size={30} />
        </Button>
      )}
    </Flex>
  );
};

export const OperationBar = Component;
