import { expect, test } from "@playwright/test";

test("staff can review and atomically collect a sample gift", async ({
  page,
}) => {
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await expect(page).toHaveURL(/\/staff$/);
  await expect(page.getByText("Adil Lawal")).toBeVisible();
  await page.screenshot({
    path: "test-results/workspace-desktop.png",
    fullPage: true,
  });

  await page.getByRole("button", { name: /Adil Lawal/ }).click();
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: /open staff scan review/i }).click();
  const review = await popupPromise;
  await expect(
    review.getByRole("heading", { name: /Adil Lawal/i }),
  ).toBeVisible();
  await review.getByRole("button", { name: /confirm gift collected/i }).click();
  await expect(
    review.getByText(/hand over one gift to Adil Lawal/i),
  ).toBeVisible();
  await review.reload();
  await expect(review.getByText(/already collected/i)).toBeVisible();
});

test("the guest list works at a 390px mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await expect(
    page.getByRole("heading", { name: /Every name/i }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/workspace-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Zara Bello/ }).click();
  await expect(page.getByRole("heading", { name: "Zara Bello" })).toBeVisible();
});
