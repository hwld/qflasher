import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuArea";
import { Box, keyframes } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props<T extends SideMenuName> = {
  sideMenuWidth: string;
  selectedItem: SideMenuItem<T> | undefined;
};

export const FullWidthSideArea = <T extends SideMenuName>({
  selectedItem,
  sideMenuWidth,
}: Props<T>) => {
  const [animation, setAnimation] = useState("");
  const close = useMemo(() => {
    return keyframes`
      to { width: 0px; }
    `;
  }, []);
  const open = useMemo(() => {
    return keyframes`
      from { width: 0px; }
      to { width: calc(100vw - ${sideMenuWidth}); }
    `;
  }, [sideMenuWidth]);

  const [innerSelectedItem, setInnerSelectedItem] = useState(selectedItem);

  useEffect(() => {
    if (selectedItem) {
      setInnerSelectedItem(selectedItem);
    }
  }, [selectedItem]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (close.name === e.animationName) {
      setInnerSelectedItem(undefined);
    }
    setAnimation("");
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!!selectedItem) {
      setAnimation(`${open} cubic-bezier(0, 0, 0.2, 1) 150ms`);
    } else {
      setAnimation(`${close} cubic-bezier(0, 0, 0.2, 1) 150ms`);
    }
    // undefinedかそれ以外か
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!selectedItem]);

  return innerSelectedItem ? (
    <Box
      bgColor={"gray.700"}
      position="absolute"
      zIndex="modal"
      left={sideMenuWidth}
      w={`calc(100vw - ${sideMenuWidth})`}
      h="100%"
      overflow={"hidden"}
      wordBreak="keep-all"
      style={{ animationFillMode: "forwards" }}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
    >
      {innerSelectedItem.content}
    </Box>
  ) : null;
};
