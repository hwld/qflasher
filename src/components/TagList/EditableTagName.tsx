import { Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export type EditableTagNameProps = {
  defaultTagName?: string;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    tagName: string
  ) => void;
  onBlur: (tagName: string) => void;
};

export const EditableTagName: React.FC<EditableTagNameProps> = ({
  defaultTagName = "",
  onKeyDown,
  onBlur,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [tagName, setTagName] = useState(defaultTagName);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setTagName(value);
  };

  const handleInputBlur = () => {
    onBlur(tagName);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    onKeyDown(event, tagName);
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Input
      ref={ref}
      p={0}
      h="30px"
      fontSize="sm"
      fontWeight="bold"
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      value={tagName}
    />
  );
};
