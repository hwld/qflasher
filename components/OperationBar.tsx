import { Box, Button, Flex, FlexProps, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { GrPowerCycle } from "react-icons/gr";
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
  onRight: () => void;
  onWrong: () => void;
  onReplayAll: () => void;
  onReplayWrong: () => void;
} & FlexProps;

const Component: React.FC<Props> = ({
  className,
  isEnd,
  onTurnOver,
  onRight,
  onWrong,
  onReplayAll,
  onReplayWrong,
  ...styleProps
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRight = () => {
    // TODO 仮
    setIsOpen(false);
    onRight();
  };

  const handleWrong = () => {
    // TODO 仮
    setIsOpen(false);
    onWrong();
  };

  const handleReplayAll = () => {
    setIsOpen(false);
    onReplayAll();
  };

  const handleReplayWrong = () => {
    setIsOpen(false);
    onReplayWrong();
  };

  const handleTurnOver = () => {
    setIsOpen(true);
    onTurnOver();
  };

  const handleBack = () => {
    router.push("/decks");
  };

  return (
    <Flex className={className} align="center" {...styleProps}>
      {isEnd ? (
        <>
          <Box boxSize="70px">
            <Tooltip label="戻る">
              <Button colorScheme="green" boxSize="100%" onClick={handleBack}>
                <MdArrowBack size={30} />
              </Button>
            </Tooltip>
          </Box>
          <Box boxSize="70px" mx={3}>
            <Tooltip label="間違えた問題を再暗記">
              <Button
                colorScheme="red"
                boxSize="100%"
                onClick={handleReplayWrong}
              >
                <MdReplay size={30} />
              </Button>
            </Tooltip>
          </Box>
          <Box boxSize="70px">
            <Tooltip label="すべての問題を再暗記">
              <Button
                colorScheme="blue"
                boxSize="100%"
                onClick={handleReplayAll}
              >
                <MdReplay size={30} />
              </Button>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <Box boxSize="70px">
            {isOpen && (
              <Tooltip label="正解">
                <Button
                  colorScheme="blue"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleRight}
                >
                  <MdPanoramaFishEye size={30} />
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box boxSize="70px" mx={3}>
            <Tooltip label="裏返す">
              <Button
                colorScheme="green"
                boxSize="100%"
                onClick={handleTurnOver}
              >
                <GrPowerCycle size={30} />
              </Button>
            </Tooltip>
          </Box>
          <Box boxSize="70px">
            {isOpen && (
              <Tooltip label="不正解">
                <Button
                  colorScheme="red"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleWrong}
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
