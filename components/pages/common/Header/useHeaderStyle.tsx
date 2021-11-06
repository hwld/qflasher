type HeaderStyle = {
  barHeight: number;
  progressHeight: number;
  logoWidth: number;
  accountIconSize: number;
};
export const useHeaderStyle = (size: "sm" | "md"): HeaderStyle => {
  let barHeight;
  let progressHeight;
  let logoWidth;
  let accountIconSize;

  switch (size) {
    case "sm": {
      barHeight = 40;
      progressHeight = 3;
      logoWidth = 150;
      accountIconSize = 30;
      break;
    }
    case "md": {
      barHeight = 60;
      progressHeight = 5;
      logoWidth = 200;
      accountIconSize = 40;
      break;
    }
  }

  return { barHeight, progressHeight, logoWidth, accountIconSize };
};
