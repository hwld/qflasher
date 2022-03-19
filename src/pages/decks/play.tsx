import { DeckPlayerPage } from "@/components/pages/DeckPlayerPage";
import { useHeaderState } from "@/context/HeaderContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { routes } from "@/routes";
import { isDeckId } from "@/utils/isDeckId";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

const Play: NextPage = () => {
  const { userResult } = useAuthState();
  const { setShowSignInButton } = useHeaderState();

  const router = useRouter();
  const id = router.query.id;

  useLoadingEffect(!router.isReady);

  useEffect(() => {
    setShowSignInButton(true);
    return () => {
      setShowSignInButton(false);
    };
  }, [setShowSignInButton]);

  if (!router.isReady) {
    return null;
  } else if (!isDeckId(id)) {
    router.push(routes.rootPage);
    return null;
  } else {
    return (
      <DeckPlayerPage deckId={id} userId={userResult.data?.uid ?? undefined} />
    );
  }
};

export default Play;
