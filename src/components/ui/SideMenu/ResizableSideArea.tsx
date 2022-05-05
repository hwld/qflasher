import { ResizableBox } from "@/components/ui/ResizableBox";
import { useSideMenu } from "@/context/SideMenuContext";
import { useDebounce } from "@/hooks/useDebounce";
import { ReactNode, useCallback } from "react";

type Props = {
  initialWidth: number;
  onChangeWidht: (value: number) => void;
  children: ReactNode;
};

export const ResizableSideArea: React.VFC<Props> = ({
  initialWidth,
  onChangeWidht,
  children,
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

  return (
    <ResizableBox
      initialWidth={initialWidth}
      onChangeWidth={storeWidthWithDebounce}
      bgColor={"gray.700"}
      wordBreak="keep-all"
      overflow={"hidden"}
      style={{ animationFillMode: "forwards" }}
    >
      {children}
    </ResizableBox>
  );
};
