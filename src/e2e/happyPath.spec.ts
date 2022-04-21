import { routes } from "@/routes";
import { expect, test } from "@playwright/test";

// test前と後でfirebaseの状態が変わってしまうことがある
// testの中で環境をクリーンにしようとしてるから、テストが途中で失敗したらデータが残っちゃう
// 別の環境でfirebaseとアプリを立ち上げてテストするほうが良さそうだけど、時間がかかりそうだからこれでいいかな・・・
test("happy path", async ({ page }) => {
  const appRoot = "http://localhost:3000";

  // サインイン
  await page.goto(`${appRoot}${routes.signInPage}`);
  const [signInPopup] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("[aria-label='google signin']").click(),
  ]);
  await signInPopup.waitForLoadState();
  await signInPopup.locator("text=add Add new account").click();
  await signInPopup
    .locator("button:has-text('Auto-generate user information')")
    .click();
  await Promise.all([
    signInPopup.waitForEvent("close"),
    signInPopup.locator("button:has-text('Sign in with Google.com')").click(),
  ]);

  // デッキの追加
  await page.waitForLoadState();
  await page.goto(`${appRoot}${routes.myDecksPage}`);
  await page.locator("[aria-label='go add deck']").click();
  await page.waitForLoadState();
  await page.locator("[placeholder='デッキ名']").fill("new deck");
  await page.locator("button:has-text('カードを追加')").click();
  await page.locator("[placeholder='質問']").fill("question");
  await page.locator("[placeholder='答え']").fill("answer");
  await page.locator("[aria-label='add deck']").click();
  const deck = page.locator("li:has-text('new deck')");
  await expect(deck).toBeVisible();

  // デッキの暗記
  await deck.locator("[aria-label='go play settings']").click();
  await expect(page).toHaveURL(new RegExp(`.*${routes.playSettingPage}.*`));
  await page.locator("[aria-label='play deck']").click();
  await expect(page).toHaveURL(new RegExp(`.*${routes.playDeckPage}.*`));

  // デッキの削除
  await page.goto(`${appRoot}${routes.myDecksPage}`);
  await deck.locator("[aria-label='delete deck']").click();
  await page.locator("[aria-label='continue']").click();
  await expect(deck).not.toBeVisible();

  // アカウントの削除
  await page.locator("[aria-label='user']").click();
  await page.locator("[aria-label='delete user']").click();
  await page.locator("[aria-label='continue']").click();

  await expect(page).toHaveURL(new RegExp(`.*${routes.signInPage}.*`));
});
