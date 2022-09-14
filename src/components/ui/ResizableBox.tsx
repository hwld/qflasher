import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import { useMergeRefs } from "@chakra-ui/react";
import React, { MouseEventHandler, useEffect, useRef } from "react";

type Props = {
  initialWidth?: number;
  onChangeWidth: (w: number) => void;
  // ドラッグで変更できる最小の幅と高さ
  maxW?: string;
  minW?: string;
} & FlexProps;

export const ResizableBox = React.forwardRef<HTMLDivElement, Props>(
  function Component(
    {
      children,
      initialWidth,
      onChangeWidth,
      maxW = 700,
      minW = 300,
      ...styles
    },
    ref
  ) {
    const innerRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs(innerRef, ref);

    const currentWidth = useRef(0);
    const isMouseDown = useRef(false);
    const startX = useRef(0);

    const handleMouseDown: MouseEventHandler = (e) => {
      e.preventDefault();
      isMouseDown.current = true;
      startX.current = e.clientX;
      currentWidth.current =
        innerRef.current?.getBoundingClientRect().width ?? 0;
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isMouseDown.current) {
          const newWidth = currentWidth.current + (e.clientX - startX.current);
          if (newWidth < minW || newWidth > maxW) {
            return;
          }
          onChangeWidth(newWidth);
          if (innerRef.current) {
            innerRef.current.style.width = newWidth + "px";
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
  }
);
