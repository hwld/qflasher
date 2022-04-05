import { AppLayout } from "@/components/ui/AppLayout";
import { ErrorMessageBox } from "@/components/ui/ErrorMessageBox";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

export const NotFoundPage: NextPageWithLayout = () => {
  return (
    <ErrorMessageBox
      mt={10}
      mx={"auto"}
      header="404 Page Not Found"
      description="ページが存在しません。"
    />
  );
};

NotFoundPage.getLayout = AppLayout;

export default NotFoundPage;
