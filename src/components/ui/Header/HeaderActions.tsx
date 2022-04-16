import { SignInButton } from "@/components/model/user/SignInButton";
import { UserMenu } from "@/components/model/user/UserMenu";
import { useAuthState } from "@/hooks/useAuthState";
import { isLoading } from "@/utils/result";

type Props = {
  isSignInButtonHidden?: boolean;
  userIconSize: number;
};

export const HeaderActions: React.VFC<Props> = ({
  userIconSize,
  isSignInButtonHidden,
}) => {
  const { userResult } = useAuthState();

  if (isLoading(userResult)) {
    return null;
  } else if (userResult.data) {
    return <UserMenu boxSize={`${userIconSize}px`} user={userResult.data} />;
  } else if (!userResult.data && !isSignInButtonHidden) {
    return <SignInButton />;
  }

  return null;
};
