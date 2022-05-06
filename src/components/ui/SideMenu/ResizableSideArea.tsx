import { ResizableBox } from "@/components/ui/ResizableBox";
import { SideMenuAnimationEvent } from "@/components/ui/SideMenu/SideMenu";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { keyframes } from "@emotion/react";
import { Eventmitter } from "eventmit";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {
  selected: boolean;
  initialWidth: number;
  onChangeWidht: (value: number) => void;
  children: ReactNode;
  animationEmitter: Eventmitter<SideMenuAnimationEvent>;
};

export const ResizableSideArea: React.VFC<Props> = ({
  selected,
  initialWidth,
  onChangeWidht,
  children,
  animationEmitter,
}) => {
  const { storeWidth } = useSideMenu();
  const handleChangeWidth = useCallback(
    (value: number) => {
      onChangeWidht(value);
      storeWidth(value);
    },
    [onChangeWidht, storeWidth]
  );
  const storeWidthWithDebounce = useDebounce(500, handleChangeWidth);

  const ref = useRef<HTMLDivElement | null>(null);
  const [animation, setAnimation] = useState("");
  const close = useMemo(() => {
    return keyframes`
      from { width: ${initialWidth}px; }
      to { width: 0px; }
    `;
  }, [initialWidth]);
  const open = useMemo(() => {
    return keyframes`
      from { width: 0px }
      to { width: ${initialWidth}px }
    `;
  }, [initialWidth]);
  const animationEvent = useRef<SideMenuAnimationEvent | null>(null);

  useEffect(() => {
    const handler = (e: SideMenuAnimationEvent) => {
      if (animationEvent.current) {
        return;
      }

      e.onBefore?.();
      if (e.animation === "close") {
        setAnimation(`${close} cubic-bezier(0, 0, 0.2, 1) 300ms`);
      } else if (e.animation === "open") {
        setAnimation(`${open} cubic-bezier(0, 0, 0.2, 1) 300ms`);
      }

      animationEvent.current = e;
    };

    animationEmitter.on(handler);
    return () => {
      animationEmitter.off(handler);
    };
  }, [animationEmitter, close, open]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (!ref.current) {
      return;
    }

    if (close.name === e.animationName) {
      ref.current.style.width = `0px`;
    } else if (open.name === e.animationName) {
      ref.current.style.width = `${initialWidth}px`;
    }

    if (animationEvent.current) {
      animationEvent.current.onAfter?.();
      animationEvent.current = null;
    }

    setAnimation("");
  };

  //　初回レンダリングで選択状態ではなければwidthを0にする
  useLayoutEffect(() => {
    if (ref.current && !selected) {
      ref.current.style.width = "0px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResizableBox
      ref={ref}
      initialWidth={initialWidth}
      onChangeWidth={storeWidthWithDebounce}
      bgColor={"gray.700"}
      wordBreak="keep-all"
      overflow={"hidden"}
      style={{ animationFillMode: "forwards" }}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </ResizableBox>
  );
};
