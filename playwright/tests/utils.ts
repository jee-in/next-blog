import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";

async function gotoWithWait(page: Page, url: string, ms = 3000) {
  await page.goto(url);
  await page.waitForTimeout(ms);
}

interface Fixtures {
  gotoWithWait: (url: string, ms?: number) => Promise<void>;
}

export const test = base.extend<Fixtures>({
  gotoWithWait: async ({ page }, use) => {
    //eslint-disable-next-line react-hooks/rules-of-hooks
    await use((url: string, ms?: number) => gotoWithWait(page, url, ms));
  },
});

export const buildUrl = (
  baseUrl: string,
  query: Record<string, string | number | (string | number)[]>
): string => {
  const url = new URL(baseUrl);

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, String(v)));
    } else {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};
