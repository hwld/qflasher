import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { routes } from "@/routes";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { userResult } = useAuthState();
  const router = useRouter();

  useLoadingEffect(userResult.status === "loading");

  useEffect(() => {
    if (userResult.status === "loading") {
      return;
    }
    if (userResult.data) {
      // ログインしている場合
      router.push(routes.myDecksPage);
    } else {
      // ログインしていない場合
      router.push(routes.notFoundPage);
    }
  }, [router, userResult.data, userResult.status]);

  return <div></div>;
};

export default Index;
