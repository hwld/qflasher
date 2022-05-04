import { DeckFormFields } from "@/components/model/deck/DeckForm/useDeckForm";
import { Box, Input as ChakraInput, InputProps, Text } from "@chakra-ui/react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from "react-hook-form";

type PropsWithoutInput = {
  control: Control<DeckFormFields>;
  // react-hook-formのFieldPathを使うとcards.${number}も受け入れるようになり、
  // オブジェクト形式のvalueがInputに渡ってしまう。
  name: `name` | `cards.${number}.question` | `cards.${number}.answer`;
  error?: FieldError;
} & {
  controllerProps?: Omit<ControllerProps, "render" | "control" | "name">;
};
type Props = PropsWithoutInput & Omit<InputProps, keyof PropsWithoutInput>;

export const DeckFormInput: React.FC<Props> = ({
  control,
  name,
  error,
  controllerProps,
  ...inputProps
}) => {
  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ChakraInput
            autoComplete="off"
            spellCheck={false}
            _placeholder={{ color: "whiteAlpha.600" }}
            isInvalid={!!error}
            {...inputProps}
            {...field}
          />
        )}
        {...controllerProps}
      />
      {error?.message && (
        <Text ml={3} my={2} color="red">
          ※{error?.message}
        </Text>
      )}
    </Box>
  );
};
