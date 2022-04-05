import { AppLayout } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";

const Index: NextPageWithLayout = () => {
  const { userResult } = useAuthState();

  if (userResult.status === "loading") {
    return <AppLoading />;
  } else if (userResult.data) {
    return <Redirect href={routes.myDecksPage} />;
  } else {
    return <Redirect href={routes.publicDecksPage} />;
  }
};

Index.getLayout = AppLayout;

export default Index;
