import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { useInitLoadingEffect } from "@/hooks/useInitLoadingEffect";
import React from "react";

export const NotFoundPage: React.FC = () => {
  useInitLoadingEffect();

  return (
    <ErrorMessageBox
      mt={10}
      mx={"auto"}
      header="404 Page Not Found"
      description="ページが存在しません。"
    />
  );
};

export default NotFoundPage;
