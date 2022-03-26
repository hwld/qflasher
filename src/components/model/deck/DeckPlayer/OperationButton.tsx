import { As, Button, ButtonProps, Icon, Tooltip } from "@chakra-ui/react";

type Props = {
  label: string;
  colorScheme: ButtonProps["colorScheme"];
  onClick: ButtonProps["onClick"];
  icon: As;
  iconSize: string;
  rounded?: ButtonProps["rounded"];
};

export const OperationButton: React.VFC<Props> = ({
  label,
  colorScheme,
  onClick,
  icon,
  iconSize,
  rounded,
}) => {
  return (
    <Tooltip label={label}>
      <Button
        p={0}
        colorScheme={colorScheme}
        boxSize="100%"
        rounded={rounded}
        onClick={onClick}
      >
        <Icon as={icon} boxSize={iconSize} />
      </Button>
    </Tooltip>
  );
};
