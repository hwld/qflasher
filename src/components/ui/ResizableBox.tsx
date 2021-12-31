import { Box, Flex } from "@chakra-ui/layout";
import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useEffect, useRef } from "react";

type Props = {
  width: number;
  onChangeWidth: (w: number) => void;
  maxW?: string;
  minW?: string;
};

export const ResizableBox: React.FC<Props> = ({
  children,
  width,
  onChangeWidth,
  maxW = 700,
  minW = 300,
}) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const currentWidth = useRef(0);
  const isMouseDown = useRef(false);
  const startX = useRef(0);

  const handleMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    isMouseDown.current = true;
    startX.current = e.clientX;
    currentWidth.current =
      handleRef.current?.getBoundingClientRect().width ?? 0;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown.current) {
        console.log(onChangeWidth);
        onChangeWidth(currentWidth.current + (e.clientX - startX.current));
      }
    };
    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseUp", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      ref={handleRef}
      w={`${width}px`}
      h="100%"
      minW={minW}
      maxW={maxW}
      bgColor={"gray.700"}
      position={"relative"}
    >
      <Box flexGrow={1}>{children}</Box>
      <Box
        position={"absolute"}
        w={"5px"}
        h={"100%"}
        top={0}
        right={0}
        cursor={"ew-resize"}
        onMouseDown={handleMouseDown}
      />
    </Flex>
  );
};
