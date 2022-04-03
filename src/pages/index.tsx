import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { routes } from "@/routes";
import { NextPage } from "next";

const Index: NextPage = () => {
  const { userResult } = useAuthState();

  if (userResult.status === "loading") {
    return <AppLoading />;
  } else if (userResult.data) {
    return <Redirect href={routes.myDecksPage} />;
  } else {
    return <Redirect href={routes.publicDecksPage} />;
  }
};

export default Index;
