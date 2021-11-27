import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";

export const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Box>
      <Flex
        direction="column"
        justify="space-around"
        align="center"
        mx="auto"
        mt={10}
        bgColor="gray.700"
        w="800px"
        h="25%"
        rounded="lg"
      >
        <Heading>404 Page Not Found</Heading>
        <Button colorScheme="green" onClick={handleBack}>
          ホーム画面に戻る
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
