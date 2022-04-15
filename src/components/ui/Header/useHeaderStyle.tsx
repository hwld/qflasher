type HeaderStyle = {
  barHeight: number;
  progressHeight: number;
  logoWidth: number;
  userIconSize: number;
};
export const useHeaderStyle = (size: "sm" | "md"): HeaderStyle => {
  let barHeight;
  let progressHeight;
  let logoWidth;
  let userIconSize;

  switch (size) {
    case "sm": {
      barHeight = 40;
      progressHeight = 3;
      logoWidth = 150;
      userIconSize = 30;
      break;
    }
    case "md": {
      barHeight = 60;
      progressHeight = 5;
      logoWidth = 250;
      userIconSize = 40;
      break;
    }
  }

  return {
    barHeight,
    progressHeight,
    logoWidth,
    userIconSize,
  };
};
