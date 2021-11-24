import { Input } from "@chakra-ui/react";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  defaultTagName?: string;
  onComplete: (tagName: string) => void;
};

export const EditableTagName: React.FC<Props> = ({
  defaultTagName = "",
  onComplete,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [tagName, setTagName] = useState(defaultTagName);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setTagName(value);
  };

  const handleInputBlur = () => {
    onComplete(tagName);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (key === "Enter") {
      onComplete(tagName);
    }
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
