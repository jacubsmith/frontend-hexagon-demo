import { test, expect } from "@playwright/test";

test("should register a new account, like, post a message and disconnect", async ({
  page,
}) => {
  // register
  await page.goto("http://localhost:5173");
  await expect(page).toHaveURL("http://localhost:5173/#/signin");
  await page.locator("text=Register now").click();
  await expect(page).toHaveURL("http://localhost:5173/#/signup");
  await page.locator("#username").click();
  await page.locator("#username").fill("e2e-user");
  await page.locator("#password").click();
  await page.locator("#password").fill("test1234");
  await page.locator('button:has-text("Register")').click();
  await expect(page).toHaveURL("http://localhost:5173/#/signin");

  // login
  await page.locator("#username").click();
  await page.locator("#username").fill("e2e-user");
  await page.locator("#password").click();
  await page.locator("#password").fill("test1234");
  await page.locator("text=Login").click();
  await expect(page).toHaveURL("http://localhost:5173/#/home");

  // create a tweet
  await page.locator("#message").click();
  await page.locator("#message").fill("hello world !");
  await page.locator("text=Honk 🚀").click();
  const newTweet = await page.locator(
    "tweet-card:first-of-type .tweet-card__like-button"
  );
  await expect(newTweet).toHaveText("0 ❤️");

  // like a tweet
  const likes = await page.locator(":nth-of-type(3) .tweet-card__like-button");
  await expect(likes).toHaveText("3 ❤️");
  await likes.click();
  await expect(likes).toHaveText("4 ❤️");

  // logout
  await page.locator("text=Logout").click();
  await expect(page).toHaveURL("http://localhost:5173/#/signin");
});
