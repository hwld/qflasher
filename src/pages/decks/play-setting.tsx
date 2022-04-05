import { PlaySettingPage } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { AppLayout } from "@/components/ui/AppLayout";
import { AppLoading } from "@/components/ui/AppLoading";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { NextPageWithLayout } from "@/pages/_app";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";

const PlaySetting: NextPageWithLayout = () => {
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

  if (loading) {
    return <AppLoading />;
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

PlaySetting.getLayout = AppLayout;

export default PlaySetting;
