import { Box } from "@chakra-ui/react";
import {
  forwardRef,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/system";
import { CreatableSelect as CreatableSelectBase } from "chakra-react-select";
import React, {
  MutableRefObject,
  ReactElement,
  RefAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import { GroupBase, MenuProps } from "react-select";
import { CreatableProps } from "react-select/creatable";
import Select from "react-select/src/Select";
import { useOutsideClick } from "../../hooks/useOutsideClick";

// chakra-react-selectの型が合っていなかったので
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.tsx
// をコピペで持ってきた
// コンポーネントに as CreatableSelectをつけないとOptionがunknownと推論されてしまう。

type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> & {
    onNextFocus?: () => void;
    onPrevFocus?: () => void;
  } & RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const Menu: React.FC<MenuProps & { onCloseMenu: () => void }> = (props) => {
  // chakra-react-selectが内部で使用する
  const menuStyles = useMultiStyleConfig("Menu", {});
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    enabled: ref.current !== null,
    ref: ref,
    handler: props.onCloseMenu,
  });

  return (
    <Box
      ref={ref}
      position="absolute"
      w="100%"
      zIndex={1}
      mt={1}
      overflow="hidden"
      {...props.innerProps}
    >
      <StylesProvider value={menuStyles}>{props.children}</StylesProvider>
    </Box>
  );
};

export const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    {
      onNextFocus,
      onPrevFocus,
      ...props
    }: CreatableProps<Option, IsMulti, Group> & {
      onNextFocus?: () => void;
      onPrevFocus?: () => void;
    },
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(
      undefined
    );
    const enteredForFocus = useRef<boolean>(false);

    const CustomMenu = useCallback((props: MenuProps) => {
      const closeMenu = () => {
        setMenuIsOpen(undefined);
      };
      return <Menu {...props} onCloseMenu={closeMenu} />;
    }, []);

    const customComponents = {
      ...props.components,
      Menu: CustomMenu,
    };

    const openMenu = () => setMenuIsOpen(true);

    // Selectのkeydownをhookするためにキャプチャフェーズでハンドリングする
    const handleKeyDownCapture = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        event.preventDefault();
        setMenuIsOpen(undefined);
        enteredForFocus.current = true;

        if (!event.shiftKey) {
          onNextFocus?.();
        } else if (event.shiftKey) {
          onPrevFocus?.();
        }
      }
    };

    const handleMenuOpen = () => {
      openMenu();
    };

    const handleFocus = () => {
      openMenu();
    };

    const handleBlur = () => {
      // フォーカス移動のためにキーが押されたあとにblurが発生したらmenuを閉じる
      if (enteredForFocus.current) {
        setMenuIsOpen(undefined);
      } else {
        openMenu();
      }
      enteredForFocus.current = false;
    };

    return (
      <Box onKeyDownCapture={handleKeyDownCapture}>
        <CreatableSelectBase
          // menuIsOpenがundefinedでもmenuが表示されることがあってよくわからない
          menuIsOpen={menuIsOpen}
          {...(props as any)}
          ref={ref}
          onMenuOpen={handleMenuOpen}
          onFocus={handleFocus}
          onBlur={handleBlur}
          components={customComponents}
        />
      </Box>
    );
  }
) as CreatableSelect;
