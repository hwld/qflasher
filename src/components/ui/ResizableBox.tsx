import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useEffect, useRef } from "react";

type Props = {
  initialWidth?: number;
  onChangeWidth: (w: number) => void;
  maxW?: string;
  minW?: string;
} & FlexProps;

export const ResizableBox: React.FC<Props> = ({
  children,
  initialWidth,
  onChangeWidth,
  maxW = 700,
  minW = 300,
  ...styles
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
        const newWidth = currentWidth.current + (e.clientX - startX.current);
        onChangeWidth(newWidth);
        if (handleRef.current) {
          handleRef.current.style.width = newWidth + "px";
        }
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
      w={initialWidth ? `${initialWidth}px` : "auto"}
      h="100%"
      minW={minW}
      maxW={maxW}
      position={"relative"}
      {...styles}
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
