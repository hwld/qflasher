export type DeckItemStyle = ReturnType<typeof useDeckItemStyle>;

export const useDeckItemStyle = () => {
  const ringWidth = 25;
  const cardWidth = 275;
  const width = ringWidth + cardWidth;
  const height = 145;
  const nameFontSize = "md";
  const metaFontSize = "sm";
  const playButtonSize = "45px";

  return {
    ringWidth,
    cardWidth,
    width,
    height,
    nameFontSize,
    metaFontSize,
    playButtonSize,
  };
};
