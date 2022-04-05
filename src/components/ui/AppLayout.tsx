import { AppTemplate } from "@/components/ui/AppTemplate";
import { ReactNode } from "react";

// すべてのLayoutのルートをAppTemplateにし、ページのgetLayoutに代入することで、
// ページをまたいでもAppTemplateコンポーネントがアンマウントされないため、チラつきが生じない。
// これは、_app.tsxでComponent.getLayout()のように使用すると、Layoutの
// ルートをみてアンマウントするか、再レンダリングするかを判定するからだと思う。
// JSXはReact.createElement(Component, ...)のように変換され、
// ReactはcreateElementの第一引数が等価か判定して、異なっていれば以前のコンポーネントをアンマウントし、
// 新しいコンポーネントをマウントするんだと思う。
// Component.getLayout()のように使用することで、React.createElement(AppTemplate, ...)となり、
// AppTemplateは常に同じ関数なのでアンマウントではなく再レンダリングされることになる。

// Layoutの中でhookを使うと期待通りの挙動にならない。
// これは、Component.getLayout()と呼び出すことで、hookがLayoutではなく呼び出し元である_app.tsxのMyAppコンポーネントに
// 紐づいているんだとおもう。
// そのため、それぞれのLayoutで異なる数のhooksを使うとエラーメッセージが表示される。

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
