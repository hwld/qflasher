import { ResizableBox } from "@/components/ui/ResizableBox";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ReactNode } from "react";

type Props = {
  initialWidth: number;
  children: ReactNode;
};

export const ResizableSideArea: React.VFC<Props> = ({
  initialWidth,

  children,
}) => {
  const { storeWidth } = useSideMenu();
  const storeWidthWithDebounce = useDebounce(500, storeWidth);

  return (
    <ResizableBox
      initialWidth={initialWidth}
      onChangeWidth={storeWidthWithDebounce}
      bgColor={"gray.700"}
      animation={`${close} 1000ms`}
      wordBreak="keep-all"
      overflow={"hidden"}
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </ResizableBox>
  );
};
