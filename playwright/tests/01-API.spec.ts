import { expect } from "@playwright/test";
import { test } from "./utils";
import { PAGE_URL } from "./constants";

test("API 응답이 지연되면 로딩 컴포넌트가 표시되어야 한다.", async ({ page, gotoWithWait }) => {
  const delay = 5000;

  await page.route(`http://localhost:3000/api/github/issues`, async (route) => {
    await new Promise((res) => setTimeout(res, delay));
    route.continue();
  });

  await gotoWithWait(`${PAGE_URL}posts/all`);
  await expect(page.locator(".loading")).toBeVisible();
});
