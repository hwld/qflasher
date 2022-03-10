import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Box, useMergeRefs } from "@chakra-ui/react";
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
import { CreatableProps as InnerCreatableProps } from "react-select/creatable";
import Select from "react-select/src/Select";

type CreatableProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = InnerCreatableProps<Option, IsMulti, Group> & {
  onNextFocus?: () => void;
  onPrevFocus?: () => void;
} & RefAttributes<Select<Option, IsMulti, Group>>;

type CreatableRef<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> =
  | ((instance: Select<Option, IsMulti, Group> | null) => void)
  | MutableRefObject<Select<Option, IsMulti, Group> | null>
  | null;

// chakra-react-selectの型が合っていなかったので
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.tsx
// をコピペで持ってきた
// コンポーネントに as CreatableSelectをつけないとOptionがunknownと推論されてしまう。
type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group>
) => ReactElement;

const Menu: React.FC<MenuProps & { onCloseMenu: () => void }> = ({
  onCloseMenu,
  children,
  innerRef,
  innerProps,
}) => {
  // chakra-react-selectが内部で使用する
  const menuStyles = useMultiStyleConfig("Menu", {});
  const ref = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(ref, innerRef);

  useOutsideClick({
    enabled: ref.current !== null,
    ref: ref,
    handler: onCloseMenu,
    useCapture: false,
  });

  return (
    <Box
      ref={mergedRef}
      position="absolute"
      w="100%"
      zIndex={1}
      mt={1}
      overflow="hidden"
      {...innerProps}
    >
      <StylesProvider value={menuStyles}>{children}</StylesProvider>
    </Box>
  );
};

export const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CreatableProps<Option, IsMulti, Group>,
    ref: CreatableRef<Option, IsMulti, Group>
  ) => {
    const { onNextFocus, onPrevFocus, ...other } = props;
    const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(
      undefined
    );

    const openMenu = () => {
      setMenuIsOpen(true);
    };

    const closeMenu = useCallback(() => {
      setMenuIsOpen(undefined);
    }, []);

    // Selectのkeydownをhookするためにキャプチャフェーズでハンドリングする
    const handleKeyDownCapture = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        event.preventDefault();
        setMenuIsOpen(undefined);

        if (!event.shiftKey) {
          onNextFocus?.();
        } else if (event.shiftKey) {
          onPrevFocus?.();
        }
      }
    };

    const CustomMenu = useCallback(
      (props: MenuProps) => {
        return <Menu {...props} onCloseMenu={closeMenu} />;
      },
      [closeMenu]
    );

    const customComponents = {
      ...other.components,
      Menu: CustomMenu,
    };

    return (
      <Box onKeyDownCapture={handleKeyDownCapture}>
        <CreatableSelectBase
          // menuIsOpenがundefinedでもmenuが表示されることがあってよくわからない
          menuIsOpen={menuIsOpen}
          {...(other as any)}
          ref={ref}
          onMenuOpen={openMenu}
          onMenuClose={closeMenu}
          onFocus={openMenu}
          components={customComponents}
        />
      </Box>
    );
  }
) as CreatableSelect;
