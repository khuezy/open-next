// NOTE: loading.tsx is currently broken on open - next
//  This works locally but not on deployed apps

import { wait } from "@open-next/utils";
import { expect, test } from "@playwright/test";

// NOTE: We don't await page load b/c we want to see the Loading page
test.only("Server Side Render and loading.tsx", async ({ page }) => {
  await page.goto("/");
  await page.locator('[href="/ssr"]').click();
  await page.waitForURL("/ssr");

  // let loading = page.getByText("Loading...");
  // await expect(loading).toBeVisible();

  let el = page.getByText("Time:");
  await expect(el).toBeVisible();
  const time = await el.textContent();

  page.reload();
  // loading = page.getByText("Loading...");
  // await expect(loading).toBeVisible();

  el = page.getByText("Time:");
  let newTime = await el.textContent();
  await expect(el).toBeVisible();
  await expect(time).not.toEqual(newTime);

  await wait(5000);
  page.reload();
  // loading = page.getByText("Loading...");
  // await expect(loading).toBeVisible();

  el = page.getByText("Time:");
  newTime = await el.textContent();
  await expect(el).toBeVisible();
  await expect(time).not.toEqual(newTime);
});
