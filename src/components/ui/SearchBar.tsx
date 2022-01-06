import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  text: string;
  onChange: (value: string) => void;
};
type SearchBarProps = Props & Omit<InputGroupProps, keyof Props>;

export const SearchBar: React.FC<SearchBarProps> = ({
  text,
  onChange,
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChange(value);
  };

  return (
    <InputGroup {...props}>
      <InputLeftElement>
        <FaSearch />
      </InputLeftElement>
      <Input
        placeholder="Search..."
        rounded={"md"}
        bgColor={"gray.700"}
        value={text}
        onChange={handleChange}
      />
    </InputGroup>
  );
};
