import test, { expect } from "@playwright/test";
import { PAGE_URL, GITHUB_USER, GITHUB_TOKEN, GITHUB_REPO } from "./constants";

test("클라이언트 페이지가 정상적으로 열린다.", async ({ request }) => {
  const response = await request.get(PAGE_URL);
  expect(response.status()).toBe(200);
});

test("API 서버가 정해진 엔드포인트에서 응답한다.", async ({ request }) => {
  const response = await request.get(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  expect(response.status()).toBe(200);
});
