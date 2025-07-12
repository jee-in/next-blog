import { expect } from "@playwright/test";
import { PAGE_URL } from "./constants";
import { test } from "./utils";

test("모든 태그 선택을 해제하면 모든 태그의 포스트 목록이 표시되어야 한다.", async ({
  page,
  gotoWithWait,
}) => {
  const defaultColor = "oklch(0.551 0.027 264.364)";
  const primaryColor = "oklch(0.623 0.214 259.815)";

  await gotoWithWait(`${PAGE_URL}posts/all`);
  const initialSnapshot = await page.locator(".post-list").innerHTML();

  const reactLabelBtn = page.getByRole("button", { name: "react" });
  await reactLabelBtn.click();
  await expect(reactLabelBtn).toHaveCSS("border-color", primaryColor);

  const blogLabelBtn = page.getByRole("button", { name: "blog" });
  await blogLabelBtn.click();
  await expect(blogLabelBtn).toHaveCSS("border-color", primaryColor);

  reactLabelBtn.click();
  await expect(reactLabelBtn).toHaveCSS("border-color", defaultColor);

  blogLabelBtn.click();
  await expect(blogLabelBtn).toHaveCSS("border-color", defaultColor);

  const postSnapshot = await page.locator(".post-list").innerHTML();
  expect(postSnapshot).toBe(initialSnapshot);
});
