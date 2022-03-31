import { PlaySettingPage } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";

const PlaySetting: NextPage = () => {
  const router = useAppRouter({
    currentPage: routes.playSettingPage,
    validateQuery: (query) => {
      return isDeckId(query.id);
    },
  });
  const queryResult = router.query;
  const { userResult } = useAuthState();

  const loading =
    queryResult.status === "loading" || userResult.status === "loading";

  useSignInButton();

  if (loading) {
    return <AppLoading isLoading={true} />;
  } else if (queryResult.status === "error") {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <PlaySettingPage
        deckId={queryResult.data.id}
        userId={userResult.data?.uid ?? undefined}
      />
    );
  }
};

export default PlaySetting;
