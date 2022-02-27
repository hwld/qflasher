import { Image, ImageProps } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = ImageProps;

export const AppLogo: React.FC<Props> = ({ ...styles }) => {
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);

  const handleLoad = () => {
    setIsLoadingFinished(true);
  };

  return (
    <Image
      alt="logo"
      // 読込中に一瞬だけ代替テキストや画像破損のアイコンが表示されてしまうので
      // 読み込みが完了、または読み込みエラーが発生するまでは要素を表示しない
      opacity={isLoadingFinished ? 1 : 0}
      src="/logo.svg"
      onLoad={handleLoad}
      onError={handleLoad}
      {...styles}
    />
  );
};
