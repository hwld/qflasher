import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import React from "react";

export const NotFoundPage: React.FC = () => {
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
