import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Header } from "../../components/Header";

const DeckPlayPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return (
    <Box h="100vh" variant="line">
      <Header />
    </Box>
  );
};

export default DeckPlayPage;
