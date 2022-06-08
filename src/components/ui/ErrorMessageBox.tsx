import { useAppRouter } from "@/hooks/useAppRouter";
import { routes } from "@/routes";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  Text,
  Wrap,
} from "@chakra-ui/react";

type Props = { header?: string; description?: string } & FlexProps;
export const ErrorMessageBox: React.FC<Props> = ({
  header = "エラー",
  description = "エラーが発生しました。",
  ...props
}) => {
  const router = useAppRouter();

  const handleBack = () => {
    router.push({ path: routes.rootPage });
  };

  const handleReload = () => {
    router.reload();
  };
  return (
    <Flex
      direction="column"
      justify="space-around"
      align="center"
      p={10}
      bgColor="gray.700"
      w={"95%"}
      maxW="800px"
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
      <Wrap mt={10} justify="center">
        <Button colorScheme="orange" onClick={handleReload}>
          もう一度読み込む
        </Button>
        <Button colorScheme="green" onClick={handleBack}>
          ホーム画面に戻る
        </Button>
      </Wrap>
    </Flex>
  );
};
