import React from "react";
import { ErrorMessageBox } from "../components/ui/ErrorMessageBox";

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
