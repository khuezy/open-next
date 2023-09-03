// NOTE: loading.tsx is currently broken on open-next
//  This works locally but not on deployed apps

import { wait } from "@open-next/utils";
import { expect, test } from "@playwright/test";

// NOTE: We don't await page load b/c we want to see the Loading page
test.only("Server Side Render", async ({ page }) => {
  await page.goto("/");
  await page.locator("[href='/ssr']").click();
  await page.waitForURL("/ssr");
  let el = page.getByText("Time:").first();
  await expect(el).toBeVisible();
  let time = await el.textContent();

  await page.reload();

  el = page.getByText("Time:");
  let newTime = await el.textContent();
  await expect(el).toBeVisible();

  for (let i = 0; i < 5; i++) {
    await page.reload();
    el = page.getByText("Time:");
    newTime = await el.textContent();
    await expect(el).toBeVisible();
    await expect(time).not.toEqual(newTime);
    time = newTime;
    await wait(250);
  }
});
