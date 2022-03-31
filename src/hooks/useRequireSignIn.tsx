import { useAppRouter } from "@/hooks/useAppRouter";
import { UserResult } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { useEffect } from "react";

type UseRequireSignInArg = { userResult: UserResult };

export const useRequireSignIn = ({ userResult }: UseRequireSignInArg) => {
  const router = useAppRouter();

  // リダイレクト処理
  useEffect(() => {
    if (userResult.status === "loading") {
      return;
    } else if (!userResult.data) {
      //ログインしていなければリダイレクト
      router.replace(routes.signInPage);
    }
  }, [router, userResult.data, userResult.status]);
};
