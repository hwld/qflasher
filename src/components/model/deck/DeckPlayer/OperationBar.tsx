import { isRoute, routes } from "@/routes";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GrPowerCycle } from "react-icons/gr";
import {
  MdArrowBack,
  MdClear,
  MdPanoramaFishEye,
  MdReplay,
} from "react-icons/md";

type Props = {
  buttonSize: BoxProps["boxSize"];
  barHeight: BoxProps["height"];
  isEnd: boolean;
  wrongAnswerCount: number;
  onTurnOver: () => void;
  onRight: () => void;
  onWrong: () => void;
  onReplayAll: () => void;
  onReplayWrong: () => void;
} & FlexProps;

export const OperationBar: React.FC<Props> = ({
  buttonSize,
  barHeight,
  isEnd,
  wrongAnswerCount,
  onTurnOver,
  onRight,
  onWrong,
  onReplayAll,
  onReplayWrong,
  ...styles
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = "50%";

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
    const returnTo = router.query.returnTo;
    if (typeof returnTo === "string" && isRoute(returnTo)) {
      router.push(returnTo);
    } else {
      router.push(routes.rootPage);
    }
  };

  return (
    <Flex align="center" justify={"center"} h={barHeight} {...styles}>
      {isEnd ? (
        <>
          <Box boxSize={buttonSize}>
            <Tooltip label="戻る">
              <Button
                p={0}
                colorScheme="green"
                boxSize="100%"
                onClick={handleBack}
              >
                <MdArrowBack size={iconSize} />
              </Button>
            </Tooltip>
          </Box>

          {wrongAnswerCount !== 0 && (
            <Box boxSize={buttonSize} mx={3}>
              <Tooltip label="間違えた問題を再暗記">
                <Button
                  p={0}
                  colorScheme="red"
                  boxSize="100%"
                  onClick={handleReplayWrong}
                >
                  <MdReplay size={iconSize} />
                </Button>
              </Tooltip>
            </Box>
          )}

          <Box boxSize={buttonSize} mx={wrongAnswerCount === 0 ? 3 : 0}>
            <Tooltip label="すべての問題を再暗記">
              <Button
                p={0}
                colorScheme="blue"
                boxSize="100%"
                onClick={handleReplayAll}
              >
                <MdReplay size={iconSize} />
              </Button>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <Box boxSize={buttonSize}>
            {isOpen && (
              <Tooltip label="正解">
                <Button
                  p={0}
                  colorScheme="blue"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleRight}
                >
                  <MdPanoramaFishEye size={iconSize} />
                </Button>
              </Tooltip>
            )}
          </Box>
          <Box boxSize={buttonSize} mx={3}>
            <Tooltip label="裏返す">
              <Button
                p={0}
                colorScheme="green"
                boxSize="100%"
                onClick={handleTurnOver}
              >
                <GrPowerCycle size={iconSize} />
              </Button>
            </Tooltip>
          </Box>
          <Box boxSize={buttonSize}>
            {isOpen && (
              <Tooltip label="不正解">
                <Button
                  p={0}
                  colorScheme="red"
                  boxSize="100%"
                  rounded="full"
                  onClick={handleWrong}
                >
                  <MdClear size={iconSize} />
                </Button>
              </Tooltip>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};
