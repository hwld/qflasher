import { SideMenuName } from "@/components/pages/DeckListPage/DeckListPage";
import { SideMenuItem } from "@/components/ui/SideMenu/SideMenuArea";
import { AppKeyframes } from "@/types";
import {
  LayoutProps,
  TransitionProps,
  TypographyProps,
} from "@chakra-ui/react";
import {
  AnimationEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type UseSideMenuAnimationParam<T extends SideMenuName> = {
  open: AppKeyframes;
  close: AppKeyframes;
  selectedItem: SideMenuItem<T> | undefined;
};
type ReturnedProps = {
  wordBreak: TypographyProps["wordBreak"];
  overflow: LayoutProps["overflow"];
  style: React.CSSProperties;
  animation: TransitionProps["animation"];
  onAnimationEnd: AnimationEventHandler;
};
type UseSideMenuAnimationResult = {
  props: ReturnedProps;
} & { item: { isOpen: false } | { isOpen: true; content: ReactNode } };

export const useSideMenuAnimation = <T extends SideMenuName>({
  open,
  close,
  selectedItem,
}: UseSideMenuAnimationParam<T>): UseSideMenuAnimationResult => {
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

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (close.name === e.animationName) {
        setInnerSelectedItem(undefined);
      }
      setAnimation("");
    },
    [close.name]
  );

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

  const props = useMemo((): ReturnedProps => {
    return {
      wordBreak: "keep-all",
      overflow: "hidden",
      style: { animationFillMode: "forwards" },
      animation,
      onAnimationEnd: handleAnimationEnd,
    };
  }, [animation, handleAnimationEnd]);

  if (innerSelectedItem) {
    return {
      item: { isOpen: true, content: innerSelectedItem.content },
      props,
    };
  } else {
    return { item: { isOpen: false }, props };
  }
};
