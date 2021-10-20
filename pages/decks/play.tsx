import { Center, Heading } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AuthRequiredPage } from "../../components/AuthRequiredPage";
import { DeckPlayerPage } from "../../components/pages/DeckPlayerPage";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";

const Play: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;

  // 準備ができるまでロード状態にする
  useLoadingEffect(!router.isReady);

  // ルーターの準備ができるまで何も表示しない
  if (!router.isReady) {
    return <></>;
  }

  if (typeof id !== "string" || id === "") {
    return (
      <Center mt={10}>
        <Heading size="4xl">deckIdが無効です</Heading>
      </Center>
    );
  }

  const page = (userId: string) => (
    <DeckPlayerPage deckId={id} userId={userId} />
  );
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default Play;
