import { SignInButton } from "@/components/model/user/SignInButton";
import { UserMenu } from "@/components/model/user/UserMenu";
import { useHeaderContext } from "@/components/ui/Header/Header";
import { useAuthState } from "@/hooks/useAuthState";
import { isLoading } from "@/utils/result";

export const HeaderActions: React.VFC = () => {
  const { userResult } = useAuthState();
  const { userIconSize, isSignInButtonHidden } = useHeaderContext();

  if (isLoading(userResult)) {
    return null;
  } else if (userResult.data) {
    return <UserMenu boxSize={`${userIconSize}px`} user={userResult.data} />;
  } else if (!userResult.data && !isSignInButtonHidden) {
    return <SignInButton />;
  }

  return null;
};
