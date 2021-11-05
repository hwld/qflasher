import { Box } from "@chakra-ui/layout";
import { PageTitle } from "./PageTitle";

type Props = { title: string };

export const PageTemplate: React.FC<Props> = ({ title, children }) => {
  return (
    <Box>
      <PageTitle my={{ base: 3, md: 5 }} mx="auto">
        {title}
      </PageTitle>
      {children}
    </Box>
  );
};
