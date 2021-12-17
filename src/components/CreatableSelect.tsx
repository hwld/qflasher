import { Box } from "@chakra-ui/react";
import {
  forwardRef,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/system";
import { CreatableSelect as CreatableSelectBase } from "chakra-react-select";
import React, { ReactElement, useRef, useState } from "react";
import { GroupBase, MenuProps } from "react-select";
import { CreatableProps } from "react-select/creatable";
import { useOutsideClick } from "../hooks/useOutsideClick";

// chakra-react-selectの型が合っていなかった。
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.tsx
// をほとんどコピペで持ってきた
// コンポーネントに as CreatableSelectをつけないとOptionがunknownと推論されてしまう。

type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group>
) => ReactElement;

export const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CreatableProps<Option, IsMulti, Group>,
    ref: any
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState<true | undefined>(undefined);

    const Menu = (props: MenuProps<Option, IsMulti, Group>) => {
      // chakra-react-selectが内部で使用する
      const menuStyles = useMultiStyleConfig("Menu", {});
      const ref = useRef<HTMLDivElement | null>(null);
      useOutsideClick({
        ref: ref,
        handler: () => setMenuIsOpen(undefined),
      });

      return (
        <Box
          position="absolute"
          w="100%"
          zIndex={1}
          {...props.innerProps}
          ref={ref}
        >
          <StylesProvider value={menuStyles}>{props.children}</StylesProvider>
        </Box>
      );
    };

    const customComponents = { ...props.components, Menu };

    const handleMenuOpen = () => setMenuIsOpen(true);

    return (
      <CreatableSelectBase
        ref={ref}
        menuIsOpen={menuIsOpen}
        closeMenuOnSelect={false}
        onMenuOpen={handleMenuOpen}
        onBlur={() => console.log("blur")}
        {...(props as any)}
        components={customComponents}
      />
    );
  }
) as CreatableSelect;
