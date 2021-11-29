import { forwardRef } from "@chakra-ui/system";
import { CreatableSelect as CreatableSelectBase } from "chakra-react-select";
import React, { ReactElement } from "react";
import { GroupBase } from "react-select";
import { CreatableProps } from "react-select/creatable";

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
    return <CreatableSelectBase ref={ref} {...(props as any)} />;
  }
) as CreatableSelect;
