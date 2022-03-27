import { PlaySettingPage } from "@/components/pages/PlaySettingPage/PlaySettingPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useSignInButton } from "@/hooks/useSignInButton";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import { useRouter } from "next/router";

const PlaySetting: NextPage = () => {
  const router = useRouter();
  const deckId = router.query.id;
  const { userResult } = useAuthState();

  const loading = !router.isReady || userResult.status === "loading";

  useLoadingEffect(loading);
  useSignInButton();

  if (loading) {
    return null;
  } else if (!isDeckId(deckId)) {
    router.replace(routes.rootPage);
    return null;
  } else {
    return (
      <PlaySettingPage
        deckId={deckId}
        userId={userResult.data?.uid && undefined}
      />
    );
  }
};

export default PlaySetting;
