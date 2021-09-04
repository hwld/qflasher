import { Box, Button, Flex, FlexProps, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import {
  MdArrowBack,
  MdClear,
  MdPanoramaFishEye,
  MdReplay,
} from "react-icons/md";

type Props = {
  className?: string;
  isEnd: boolean;
  onTurnOver: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
} & FlexProps;

const Component: React.FC<Props> = ({
  className,
  isEnd,
  onTurnOver,
  onCorrect,
  onIncorrect,
  ...styleProps
}) => {
  const router = useRouter();
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

  const handleBack = () => {
    router.push("/deckList");
  };

  return (
    <Flex className={className} align="center" {...styleProps}>
      {isEnd ? (
        <Box boxSize="70px">
          <Tooltip label="戻る">
            <Button colorScheme="blue" boxSize="100%" onClick={handleBack}>
              <MdArrowBack size={30} />
            </Button>
          </Tooltip>
        </Box>
      ) : (
        <>
          <Box boxSize="70px">
            {isOpen && (
              <Tooltip label="正解">
                <Button
                  colorScheme="blue"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleCorrect}
                >
                  <MdPanoramaFishEye size={30} />
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box boxSize="70px">
            {!isOpen && (
              <Tooltip label="裏返す">
                <Button
                  colorScheme="green"
                  boxSize="100%"
                  onClick={handleTurnOver}
                >
                  <MdReplay size={30} />
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box boxSize="70px">
            {isOpen && (
              <Tooltip label="不正解">
                <Button
                  colorScheme="red"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleInCorrect}
                >
                  <MdClear size={30} />
                </Button>
              </Tooltip>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};

export const OperationBar = Component;
