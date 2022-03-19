import { UserResult } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type UseRequireSignInArg = { userResult: UserResult };

export const useRequireSignIn = ({ userResult }: UseRequireSignInArg) => {
  const router = useRouter();

  // リダイレクト処理
  useEffect(() => {
    if (userResult.status === "loading") {
      return;
    } else if (!userResult.data) {
      //ログインしていなければリダイレクト
      router.push(routes.signInPage);
    }
  }, [router, userResult.data, userResult.status]);
};