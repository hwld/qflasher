import {
  Button,
  Icon,
  Image,
  MenuButton,
  MenuButtonProps,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { forwardRef, useState } from "react";
import { FaUserSecret } from "react-icons/fa";

type Props = { user: User } & MenuButtonProps;

export const AccountMenuButton = forwardRef<HTMLButtonElement, Props>(
  function Component({ user, ...styles }, ref) {
    const [iconUrl, setIconUrl] = useState(user.photoURL);
    const [alt, setAlt] = useState("icon");

    const handleError = () => {
      setIconUrl("");
      setAlt("");
    };

    return (
      <MenuButton
        ref={ref}
        sx={{
          "& > span": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        as={Button}
        color="gray.700"
        rounded="full"
        bgColor="gray.200"
        overflow={"hidden"}
        _hover={{ bgColor: "gray.300" }}
        _active={{ bgColor: "gray.400" }}
        minW="none"
        p={0}
        {...styles}
      >
        {iconUrl ? (
          <Image
            boxSize={"100%"}
            src={iconUrl}
            alt={alt}
            onError={handleError}
          />
        ) : (
          <Icon as={FaUserSecret} boxSize="60%" fill="gray.700" />
        )}
      </MenuButton>
    );
  }
);
