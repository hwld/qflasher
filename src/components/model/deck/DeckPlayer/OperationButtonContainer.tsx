import { As, Box, ButtonProps, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

type OperationButton = {
  label: string;
  icon: As;
  onClick: ButtonProps["onClick"];
  colorScheme: ButtonProps["colorScheme"];
};
type Props = {
  buttonSize: ButtonProps["size"];
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};
export const OperationButtonContainer: React.VFC<Props> = ({
  buttonSize,
  left,
  center,
  right,
}) => {
  return (
    <HStack spacing={3}>
      <Box boxSize={buttonSize}>{left}</Box>
      <Box boxSize={buttonSize}>{center}</Box>
      <Box boxSize={buttonSize}>{right}</Box>
    </HStack>
  );
};
