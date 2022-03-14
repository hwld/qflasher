import { DeckCreatorPage } from "@/components/pages/DeckCreatorPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useInitLoadingEffect } from "@/hooks/useInitLoadingEffect";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import type { NextPage } from "next";
import React from "react";

const Create: NextPage = () => {
  const { userResult } = useAuthState();
  useRequireSignIn({ userResult });

  useInitLoadingEffect();

  if (userResult.data) {
    return <DeckCreatorPage userId={userResult.data.uid} />;
  } else {
    return null;
  }
};

export default Create;
