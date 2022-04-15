import { Icon, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useMemo, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaUser, FaUserSecret } from "react-icons/fa";

type Props = { user: User };

export const UserIcon: React.FC<Props> = ({ user }) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  const icon = useMemo(() => {
    if (user.isAnonymous) {
      return <Icon as={FaUserSecret} boxSize="60%" fill="gray.700" />;
    } else if (!user.photoURL) {
      return <Icon as={FaUser} boxSize="60%" fill="gray.700" />;
    } else if (isError) {
      // Imageのfallbackに書くとローディングのときにも表示されてしまう。
      // エラー時にだけこちらのアイコンを表示したいため、別で用意する
      return <Icon as={BiErrorCircle} boxSize="70%" fill={"red.500"} />;
    } else {
      return (
        <Image
          boxSize={"100%"}
          src={user.photoURL}
          fallback={<></>}
          onError={handleError}
          alt={"userIcon"}
        />
      );
    }
  }, [isError, user.isAnonymous, user.photoURL]);

  return icon;
};
