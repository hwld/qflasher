import { OperationButton } from "@/components/model/deck/DeckPlayer/OperationButton";
import { OperationButtonContainer } from "@/components/model/deck/DeckPlayer/OperationButtonContainer";
import { Play } from "@/components/model/deck/DeckPlayer/useDeckPlayer";
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
  currentPlay: Play;
  onClickRight: () => void;
  onClickWrong: () => void;
  onClickReplayAll: () => void;
  onClickReplayWrong: () => void;
  onClickTrunOver: () => void;
} & FlexProps;

export const OperationBar: React.FC<Props> = ({
  size,
  returnRoute,
  currentPlay: { cardStack, wrongCards },
  onClickRight,
  onClickWrong,
  onClickReplayAll,
  onClickReplayWrong,
  onClickTrunOver,
  ...styles
}) => {
  const isEnd = cardStack.length === 0;
  const wrongAnswerCount = wrongCards.length;

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
    setIsOpen(false);
    onClickRight();
  };

  const handleWrong = () => {
    setIsOpen(false);
    onClickWrong();
  };

  const handleReplayAll = () => {
    setIsOpen(false);
    onClickReplayAll();
  };

  const handleReplayWrong = () => {
    setIsOpen(false);
    onClickReplayWrong();
  };

  const handleTurnOver = () => {
    setIsOpen(true);
    onClickTrunOver();
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
