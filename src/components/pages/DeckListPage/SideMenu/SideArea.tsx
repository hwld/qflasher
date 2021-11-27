import { Box, Flex } from "@chakra-ui/layout";
import { MouseEventHandler } from "hoist-non-react-statics/node_modules/@types/react";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export const SideArea: React.FC<Props> = ({ children }) => {
  const [w, setW] = useState(300);
  const handleRef = useRef<HTMLDivElement>(null);

  const currentWidth = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);

  const handleMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    isDown.current = true;
    startX.current = e.clientX;
    currentWidth.current =
      handleRef.current?.getBoundingClientRect().width ?? 0;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDown.current) {
        setW(currentWidth.current + (e.clientX - startX.current));
      }
    };
    const handleMouseUp = () => {
      isDown.current = false;
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
    <Flex position="relative" boxShadow="xl">
      <Box
        ref={handleRef}
        minW="300px"
        maxW="700px"
        w={`${w}px`}
        h="100%"
        bgColor="gray.700"
      >
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