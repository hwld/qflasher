import { SideMenuAnimationEvent } from "@/components/ui/SideMenu/SideMenu";
import { Box, keyframes } from "@chakra-ui/react";
import { Eventmitter } from "eventmit";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  selected: boolean;
  sideMenuWidth: string;
  children: ReactNode;
  animationEmitter: Eventmitter<SideMenuAnimationEvent>;
};

export const FullWidthSideArea: React.VFC<Props> = ({
  selected,
  sideMenuWidth,
  children,
  animationEmitter,
}) => {
  const [animation, setAnimation] = useState("");
  const close = useMemo(() => {
    return keyframes`
      to { width: 0px; }
    `;
  }, []);
  const open = useMemo(() => {
    return keyframes`
      to { width: calc(100vw - ${sideMenuWidth}); }
    `;
  }, [sideMenuWidth]);

  const ref = useRef<HTMLDivElement | null>(null);
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
      ref.current.style.width = `calc(100vw - ${sideMenuWidth})`;
    }

    if (animationEvent.current) {
      animationEvent.current.onAfter?.();
      animationEvent.current = null;
    }

    setAnimation("");
  };

  //　初回レンダリングで選択状態ではなければwidthを0にする
  useEffect(() => {
    if (ref.current && !selected) {
      ref.current.style.width = "0px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      ref={ref}
      bgColor={"gray.700"}
      position="absolute"
      zIndex="modal"
      left={sideMenuWidth}
      w={`calc(100vw - ${sideMenuWidth})`}
      animation={animation}
      onAnimationEnd={handleAnimationEnd}
      h="100%"
      overflow={"hidden"}
      wordBreak="keep-all"
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </Box>
  );
};
