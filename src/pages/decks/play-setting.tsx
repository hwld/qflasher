import { PlaySettingPage } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { Redirect } from "@/components/ui/Redirect";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";

const PlaySetting: NextPage = () => {
  const router = useAppRouter();
  const deckId = router.query.id;
  const { userResult } = useAuthState();

  const loading = !router.isReady || userResult.status === "loading";

  useLoadingEffect(loading);
  useSignInButton();

  if (loading) {
    return null;
  } else if (!isDeckId(deckId)) {
    return <Redirect href={routes.rootPage} />;
  } else {
    return (
      <PlaySettingPage
        deckId={deckId}
        userId={userResult.data?.uid ?? undefined}
      />
    );
  }
};

export default PlaySetting;
