import { SettingForm } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { Box, Checkbox, CheckboxProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type Props = {
  name: keyof SettingForm;
  setting: SettingForm[keyof SettingForm];
  checkBoxSize: CheckboxProps["size"];
  onChange: (name: keyof SettingForm, value: boolean) => void;
};

export const SettingFormElement: React.VFC<Props> = ({
  name,
  setting,
  checkBoxSize,
  onChange,
}) => {
  const handleChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(name, checked);
  };

  return (
    <Box p={{ base: 3, md: 5 }} bgColor="gray.700" w="100%" rounded="md">
      <Checkbox
        size={checkBoxSize}
        colorScheme="green"
        isChecked={setting.value}
        onChange={handleChange}
      >
        {setting.text}
      </Checkbox>
    </Box>
  );
};
