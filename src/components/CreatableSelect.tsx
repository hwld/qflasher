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
import { useOutsideClick } from "../hooks/useOutsideClick";

// chakra-react-selectの型が合っていなかった。
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.tsx
// をコピペで持ってきた
// コンポーネントに as CreatableSelectをつけないとOptionがunknownと推論されてしまう。

type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const Menu: React.FC<MenuProps & { onCloseMenu: () => void }> = (props) => {
  // chakra-react-selectが内部で使用する
  const menuStyles = useMultiStyleConfig("Menu", {});
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: ref,
    handler: props.onCloseMenu,
  });

  return (
    <Box
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
    props: CreatableProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState<true | undefined>(undefined);

    const CustomMenu = useCallback((props: MenuProps) => {
      const closeMenu = () => {
        setMenuIsOpen(undefined);
      };
      return <Menu {...props} onCloseMenu={closeMenu} />;
    }, []);

    const customComponents = { ...props.components, Menu: CustomMenu };

    const openMenu = () => setMenuIsOpen(true);

    return (
      <CreatableSelectBase
        menuIsOpen={menuIsOpen}
        closeMenuOnSelect={false}
        {...(props as any)}
        ref={ref}
        onMenuOpen={openMenu}
        onFocus={openMenu}
        // onBlur={openMenu}
        components={customComponents}
      />
    );
  }
) as CreatableSelect;
