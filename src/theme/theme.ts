import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Noto Sans JP, sans-serif",
    body: "Noto Sans JP, sans-serif",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      // focus-visibleパッケージを入れて、chakra-uiのクリック時のフォーカスリングを消そうとすると、
      // focusがあたってる要素に強制的にbox-shadow:noneが与えられ、box-shadowの設定がリセットされてしまう。
      // menuなどのコンポーネントは、フォーカスがあたってる状態でbox-shadowが設定されているため、その設定が上書きされる。
      // なので、以下の一時的な回避策を使う。
      // https://github.com/chakra-ui/chakra-ui/issues/4276#issuecomment-1096055757

      // https://github.com/chakra-ui/chakra-ui/blame/790d2417a3f5d59e2d69229a027af671c2dc0cbc/packages/css-reset/src/css-reset.tsx#L274
      // に書いてあるとおり、現時点での最新のcss-resetでは、not([data-focus-visible-disabled])というものが追加されており、
      // data-focus-visible-disabledを渡すことによってこれをなくすことができるかもしれないが、そのバージョンはReact18を前提とするので、
      // ひとまずは以下のコードで我慢する。
      ".chakra-menu__menu-list:focus:not([data-focus-visible-added])": {
        boxShadow: "var(--chakra-shadows-dark-lg)",
      },
    },
  },
  colors: {
    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
  },
});
