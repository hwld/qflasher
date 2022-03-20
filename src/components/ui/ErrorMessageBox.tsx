import { routes } from "@/routes";
import { Box, Button, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = { header: string; description: string } & FlexProps;
export const ErrorMessageBox: React.FC<Props> = ({
  header = "エラー",
  description = "エラーが発生しました。",
  ...props
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(routes.rootPage);
  };

  return (
    <Flex
      direction="column"
      justify="space-around"
      align="center"
      p={10}
      bgColor="gray.700"
      w="800px"
      rounded="lg"
      {...props}
    >
      <Box>
        <Heading as="h1" textAlign={"center"} size={"3xl"}>
          {header}
        </Heading>
        <Text mt={3} textAlign={"center"} fontSize={"xl"}>
          {description}
        </Text>
      </Box>
      <Button mt={10} colorScheme="green" onClick={handleBack}>
        ホーム画面に戻る
      </Button>
    </Flex>
  );
};
