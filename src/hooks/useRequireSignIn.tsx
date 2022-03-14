import { UserResult } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

type UseRequireSignInArg = { userResult: UserResult };

export const useRequireSignIn = ({ userResult }: UseRequireSignInArg) => {
  const router = useRouter();

  useEffect(() => {
    if (userResult.status === "loading") {
      return;
    } else if (!userResult.data) {
      //ログインしていなければリダイレクト
      router.push(routes.notFoundPage);
    }
  }, [router, userResult.data, userResult.status]);
};
