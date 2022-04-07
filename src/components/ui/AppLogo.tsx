import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

type Width = string | number;
type BreakpointWidth = Record<string, Width>;

export const AppLogo: React.VFC<{
  width?: Width | BreakpointWidth;
}> = ({ width = "100%" }) => {
  const appLogoWidth = useAppLogoWidth(width);
  const [ids] = useState([...new Array(7)].map((_) => uuid()));

  return (
    <svg
      width={appLogoWidth}
      viewBox="0 0 287.469 55.841"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      role={"img"}
      aria-label="App Logo"
    >
      <defs>
        <linearGradient id={ids[0]}>
          <stop stopColor="#616161" stopOpacity={1} offset={0} />
          <stop stopColor="#4d4d4d" stopOpacity={1} offset={1} />
        </linearGradient>
        <linearGradient id={ids[1]}>
          <stop stopColor="#90ff90" stopOpacity={1} offset={0} />
          <stop stopColor="#87de87" stopOpacity={1} offset={1} />
        </linearGradient>
        <linearGradient
          xlinkHref={`#${ids[1]}`}
          id={ids[2]}
          x1={422.152}
          y1={463.175}
          x2={599.599}
          y2={461.744}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.26458 0 0 .26458 -240.242 -76.749)"
        />
        <linearGradient
          xlinkHref={`#${ids[1]}`}
          id={ids[3]}
          gradientUnits="userSpaceOnUse"
          x1={422.152}
          y1={463.175}
          x2={599.599}
          y2={461.744}
          gradientTransform="matrix(.61578 0 0 .61578 -204.177 -108.184)"
        />
        <linearGradient
          xlinkHref={`#${ids[0]}`}
          id={ids[4]}
          x1={107.025}
          y1={131.509}
          x2={186.284}
          y2={131.257}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1.91498 0 0 2.32734 -147.802 -108.184)"
        />
        <linearGradient
          xlinkHref={`#${ids[1]}`}
          id={ids[5]}
          x1={77.82}
          y1={186.16}
          x2={93.526}
          y2={185.268}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(2.32734 0 0 2.32734 -183.517 -235.075)"
        />
        <linearGradient
          xlinkHref={`#${ids[1]}`}
          id={ids[6]}
          x1={-200.376}
          y1={-71.602}
          x2={-207.173}
          y2={-70.168}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-1.6065 -1.68395 1.71586 -1.57237 -183.517 -235.075)"
        />
      </defs>
      <g display={"inline"}>
        <path
          color="#000"
          fill={`url(#${ids[5]})`}
          strokeWidth={0.0644089}
          strokeDasharray="0,.708498"
          d="M35.016 158.518c-20.61 0-39.365 18.754-39.365 39.365 0 20.61 18.754 39.365 39.365 39.364 20.61 0 39.365-18.754 39.365-39.364 0-20.611-18.754-39.365-39.365-39.365z"
          transform="matrix(.47992 0 0 .47992 3.336 -65.912)"
        />
        <path
          color="#000"
          fill="#616161"
          strokeWidth={0.0644089}
          strokeDasharray="0,.708498"
          d="M62.04 197.882a27.023 27.023 0 0 1-27.023 27.023 27.023 27.023 0 0 1-27.023-27.023 27.023 27.023 0 0 1 27.023-27.023 27.023 27.023 0 0 1 27.024 27.023Z"
          transform="matrix(.47992 0 0 .47992 3.336 -65.912)"
        />
        <path
          color="#000"
          fill={`url(#${ids[6]})`}
          strokeWidth={0.0631404}
          strokeDasharray="0,.694543"
          d="m-.964 236.96-5.063-5.307a3.289 3.289 0 0 1 .159-4.725l22.406-20.532a3.452 3.452 0 0 1 4.82.162l5.064 5.307a3.289 3.289 0 0 1-.159 4.725L3.857 237.122a3.452 3.452 0 0 1-4.82-.161z"
          transform="matrix(.47992 0 0 .47992 3.336 -65.912)"
        />
        <path
          color="#000"
          fill={`url(#${ids[4]})`}
          strokeWidth={0.0774698}
          strokeDasharray="0,.852168"
          d="M48.534 137.338H197.24c7.814 0 14.104 7.645 14.104 17.141v82.07c0 9.497-6.29 17.142-14.104 17.142H48.534c-7.814 0-14.104-7.645-14.104-17.141v-82.071c0-9.496 6.29-17.141 14.104-17.141z"
          transform="matrix(.47992 0 0 .47992 3.336 -65.912)"
        />
        <path
          color="#000"
          fill={`url(#${ids[3]})`}
          strokeWidth={0.0814622}
          strokeDasharray="0,.896082"
          d="M63.998 164.673c-6.509 0-11.749 5.24-11.749 11.749s5.24 11.749 11.75 11.749h121.604c6.509 0 11.749-5.24 11.749-11.749 0-6.51-5.24-11.75-11.75-11.75zm0 38.184a11.724 11.724 0 0 0-11.749 11.75c0 6.51 5.24 11.75 11.75 11.75h90.468c6.509 0 11.75-5.24 11.75-11.75 0-6.509-5.241-11.75-11.75-11.75z"
          transform="matrix(.47992 0 0 .47992 3.336 -65.912)"
        />
        <g
          aria-label="Qflasher"
          fontSize="21.5161px"
          fontFamily="'Franklin Gothic Heavy'"
          strokeWidth={0.0537901}
        >
          <path
            color="#000"
            fill="#fff"
            d="M65.647 144.079q-.736.147-1.45.147-3.1 0-4.98-2.049-1.88-2.049-1.88-5.305 0-3.247 1.817-5.337 1.828-2.091 5.064-2.091 2.994 0 4.875 1.975 1.89 1.975 1.89 5.274 0 4.003-2.573 6.104.21.62 1.334.62.504 0 1.187-.137v3.247q-1.166.115-1.828.115-1.176 0-2.1-.494-.915-.483-1.356-2.07zm-1.492-3.11q1.114 0 1.597-.967.494-.977.494-3.561 0-3.74-2.007-3.74-2.164 0-2.164 4.265 0 4.003 2.08 4.003zM77.214 136.042v7.963h-3.95v-7.963h-1.597v-2.721h1.597q0-1.324.115-1.955.116-.64.578-1.218.462-.589 1.24-.893.777-.315 2.09-.315 1.408 0 2.7.22v2.742q-.998-.136-1.491-.136-.494 0-.904.2-.41.199-.41.976v.379h2.732v2.72zM85.261 129.665v14.34h-4.128v-14.34zM98.236 144.005h-3.992q-.147-.683-.147-1.492-1.135 1.713-3.436 1.713-1.89 0-2.836-.967-.935-.966-.935-2.217 0-1.691 1.534-2.731 1.544-1.05 5.463-1.26v-.242q0-.704-.326-.935-.315-.232-.935-.232-1.45 0-1.618 1.167l-3.824-.358q.82-3.351 5.579-3.351 1.292 0 2.374.263 1.082.252 1.712.798.63.546.84 1.156.221.61.221 2.343v4.265q0 1.219.326 2.08zm-4.35-5q-2.678.283-2.678 1.712 0 .966 1.06.966.673 0 1.146-.399.473-.4.473-1.765zM99.14 140.98l3.309-.452q.284 1.155 2.248 1.155 1.629 0 1.629-.63 0-.273-.315-.42-.316-.158-1.492-.315-3.257-.452-4.066-1.408-.81-.967-.81-2.143 0-1.64 1.367-2.648 1.365-1.019 3.582-1.019 3.887 0 4.959 2.805l-3.173.599q-.441-.946-1.86-.946-.672 0-1.008.19-.326.178-.326.357 0 .525 1.009.64 2.626.295 3.561.6.936.304 1.597 1.113.662.809.662 1.954 0 1.755-1.47 2.784-1.46 1.03-4.035 1.03-4.339 0-5.368-3.247zM121.98 144.005h-4.182v-6.43q0-.882-.2-1.208-.189-.336-.745-.336-.431 0-.757.263-.315.252-.368.525-.052.273-.052 1.145v6.041h-4.192v-14.34h4.192v4.916q1.135-1.481 2.963-1.481.924 0 1.618.326.703.315 1.082.82.378.503.504.976.137.473.137 1.828zM131.256 140.17l3.908.263q-.346 1.576-1.775 2.69-1.418 1.103-3.845 1.103-2.7 0-4.308-1.555-1.607-1.566-1.607-3.877 0-2.395 1.586-4.045 1.587-1.649 4.234-1.649 2.564 0 4.14 1.555 1.586 1.555 1.586 4.234 0 .22-.01.61h-7.155q.02 1.008.357 1.501.336.484 1.282.484 1.366 0 1.607-1.314zm-.273-2.773q-.01-1.082-.441-1.45-.42-.378-1.05-.378-1.493 0-1.493 1.828zM140.827 144.005h-4.013v-10.684h3.488v2.206q.599-2.406 2.784-2.406.22 0 .61.042v3.73q-.442-.105-.789-.105-2.08 0-2.08 2.321z"
            transform="matrix(2.01678 0 0 2.01678 -2.332 -249.973)"
          />
        </g>
      </g>
    </svg>
  );
};

// widthがbreakpointWidthだった場合はuseBreakpointValueを使用して画面幅に応じた幅を取得する
const useAppLogoWidth = (width: Width | BreakpointWidth): Width | undefined => {
  const isBreakpointWidth =
    typeof width !== "string" && typeof width !== "number";

  let breakpointValue: BreakpointWidth = {};

  if (isBreakpointWidth) {
    breakpointValue = width;
  }
  const breakpointWidth = useBreakpointValue(breakpointValue);

  return isBreakpointWidth ? breakpointWidth : width;
};
