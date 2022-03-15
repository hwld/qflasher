import { DeckCreatorPage } from "@/components/pages/DeckCreatorPage";
import { useAuthState } from "@/hooks/useAuthState";
import { useRequireSignIn } from "@/hooks/useRequireSignIn";
import type { NextPage } from "next";
import React from "react";

const Create: NextPage = () => {
  const { userResult } = useAuthState();
  useRequireSignIn({ userResult });

  if (userResult.data) {
    return <DeckCreatorPage userId={userResult.data.uid} />;
  } else {
    return null;
  }
};

export default Create;
