import { AppTemplate } from "@/components/ui/AppTemplate";
import { ReactNode } from "react";

export const AppLayout = (page: ReactNode) => {
  return <AppTemplate>{page}</AppTemplate>;
};

/**
 * ヘッダーにサインインボタンを表示しないレイアウト
 * サインインページは、メインの画面にサインインボタンがあるのでこれを使用する。
 * 
 * 他にも、認証が必須のページでは、ログアウト後すぐにサインインページにリダイレクトするので
 * サインインボタンを表示してしまうとちらつきが出てしまうのでこれを使用する。
 */
export const AppLayoutWithOutSignInButton = (page: ReactNode) => {
  return <AppTemplate isSignInButtonHidden={true}>{page}</AppTemplate>;
};
