import { Box, Flex } from "@chakra-ui/layout";
import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useEffect, useRef } from "react";

type Props = { width: number; setWidth: (w: number) => void };

export const SideArea: React.FC<Props> = ({ children, width, setWidth }) => {
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
        setWidth(currentWidth.current + (e.clientX - startX.current));
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
    <Flex position="relative" boxShadow="xl" bgColor="gray.700">
      <Box ref={handleRef} minW="300px" maxW="700px" h="100%" w={`${width}px`}>
        {children}
      </Box>
      <Box
        position="absolute"
        right={0}
        bgColor="transparent"
        w="5px"
        h="100%"
        cursor="ew-resize"
        onMouseDown={handleMouseDown}
      />
    </Flex>
  );
};
