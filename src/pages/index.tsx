import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { routes } from "@/routes";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();
  const { userResult } = useAuthState();
  useLoadingEffect(userResult.status === "loading");

  useEffect(() => {
    if (userResult.status === "loading") {
      return;
    }
    if (userResult.data) {
      // ログインしている場合
      router.replace(routes.myDecksPage);
    } else {
      // ログインしていない場合
      router.replace(routes.publicDecksPage);
    }
  }, [router, userResult.data, userResult.status]);

  return <Box />;
};

export default Index;
