import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { ResizableBox } from "@/components/ui/ResizableBox";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuArea";
import { useSideMenuAnimation } from "@/components/ui/SideMenu/useSideMenuAnimation";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { keyframes } from "@emotion/react";
import React, { useCallback, useMemo, useState } from "react";

type Props<T extends SideMenuName> = {
  selectedItem: SideMenuItem<T> | undefined;
  defaultWidth: number;
};

export const ResizableSideArea = <T extends SideMenuName>({
  selectedItem,
  defaultWidth,
}: Props<T>) => {
  const [width, setWidth] = useState(defaultWidth);
  const { storeWidth } = useSideMenu();
  const handleChangeWidth = useCallback(
    (value: number) => {
      setWidth(value);
      storeWidth(value);
    },
    [storeWidth]
  );
  const storeWidthWithDebounce = useDebounce(500, handleChangeWidth);

  const close = useMemo(() => {
    return keyframes`
      from { width: ${width}px; }
      to { width: 0px; }
    `;
  }, [width]);
  const open = useMemo(() => {
    return keyframes`
      from { width: 0px }
      to { width: ${width}px }
    `;
  }, [width]);

  const { props, item } = useSideMenuAnimation({
    open,
    close,
    selectedItem,
  });

  return item.isOpen ? (
    <ResizableBox
      initialWidth={width}
      onChangeWidth={storeWidthWithDebounce}
      bgColor={"gray.700"}
      {...props}
    >
      {item.content}
    </ResizableBox>
  ) : null;
};
