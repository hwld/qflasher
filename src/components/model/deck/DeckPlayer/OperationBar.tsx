import { OperationButton } from "@/components/model/deck/DeckPlayer/OperationButton";
import { OperationButtonContainer } from "@/components/model/deck/DeckPlayer/OperationButtonContainer";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Route } from "@/routes";
import { BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  MdArrowBack,
  MdClear,
  MdLoop,
  MdPanoramaFishEye,
  MdReplay,
} from "react-icons/md";

type Props = {
  size: "md" | "sm";
  returnRoute: Route;
  isEnd: boolean;
  wrongAnswerCount: number;
  onTurnOver: () => void;
  onRight: () => void;
  onWrong: () => void;
  onReplayAll: () => void;
  onReplayWrong: () => void;
} & FlexProps;

export const OperationBar: React.FC<Props> = ({
  size,
  returnRoute,
  isEnd,
  wrongAnswerCount,
  onTurnOver,
  onRight,
  onWrong,
  onReplayAll,
  onReplayWrong,
  ...styles
}) => {
  const router = useAppRouter();
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = "50%";
  let buttonSize: BoxProps["boxSize"];
  let barHeight: BoxProps["height"];
  switch (size) {
    case "sm": {
      buttonSize = "50px";
      barHeight = "70px";
      break;
    }
    case "md": {
      buttonSize = "70px";
      barHeight = "90px";
      break;
    }
  }

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
    router.push({ path: returnRoute });
  };

  return (
    <Flex align="center" justify={"center"} h={barHeight} {...styles}>
      {isEnd ? (
        <OperationButtonContainer
          buttonSize={buttonSize}
          left={
            <OperationButton
              label="一覧へ移動する"
              icon={MdArrowBack}
              iconSize={iconSize}
              onClick={handleBack}
              colorScheme="orange"
            />
          }
          center={
            <OperationButton
              label="すべての問題を再暗記"
              icon={MdReplay}
              iconSize={iconSize}
              onClick={handleReplayAll}
              colorScheme="green"
            />
          }
          right={
            wrongAnswerCount >= 1 && (
              <OperationButton
                label="間違えた問題を再暗記"
                icon={MdReplay}
                iconSize={iconSize}
                onClick={handleReplayWrong}
                colorScheme="red"
              />
            )
          }
        />
      ) : (
        <OperationButtonContainer
          buttonSize={buttonSize}
          left={
            isOpen && (
              <OperationButton
                label="正解"
                icon={MdPanoramaFishEye}
                iconSize={iconSize}
                onClick={handleRight}
                colorScheme="blue"
                rounded={"full"}
              />
            )
          }
          center={
            <OperationButton
              label="裏返す"
              icon={MdLoop}
              iconSize={iconSize}
              onClick={handleTurnOver}
              colorScheme="green"
            />
          }
          right={
            isOpen && (
              <OperationButton
                label="不正解"
                icon={MdClear}
                iconSize={iconSize}
                onClick={handleWrong}
                colorScheme="red"
                rounded={"full"}
              />
            )
          }
        />
      )}
    </Flex>
  );
};
