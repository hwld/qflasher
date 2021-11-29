import { forwardRef } from "@chakra-ui/system";
import { CreatableSelect as CreatableSelectBase } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/src/types";
import React from "react";
import { GroupBase } from "react-select";
import { CreatableProps } from "react-select/creatable";

// chakra-react-selectの型が合っていなかったのでこれでやってみる
export const CreatableSelect = forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: ChakraSelectProps & CreatableProps<Option, IsMulti, Group>,
    ref: any
  ) => {
    return <CreatableSelectBase ref={ref} {...props} />;
  }
);
