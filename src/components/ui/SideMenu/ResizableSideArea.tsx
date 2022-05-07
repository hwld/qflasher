import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { ResizableBox } from "@/components/ui/ResizableBox";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuArea";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { keyframes } from "@emotion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  // areaをcloseするときには、selectedItemがundefinedになっても
  // アニメーションのためにselectedItemを使用するため、内部で別に状態を持たせる
  const [innerSelectedItem, setInnerSelectedItem] = useState(selectedItem);
  useEffect(() => {
    // selectedItemがundefindになるとアニメーションが実行され、
    // そのアニメーションが完了した時点で内部の状態をundefinedに変更するため、ここでは変更しない
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

  const [animation, setAnimation] = useState("");
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
    <ResizableBox
      initialWidth={width}
      onChangeWidth={storeWidthWithDebounce}
      bgColor={"gray.700"}
      wordBreak="keep-all"
      overflow={"hidden"}
      style={{ animationFillMode: "forwards" }}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
    >
      {innerSelectedItem.content}
    </ResizableBox>
  ) : null;
};
