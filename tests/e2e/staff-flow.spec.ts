import { expect, test, type APIResponse } from "@playwright/test";

async function json<T>(response: APIResponse) {
  return (await response.json()) as T;
}

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

  await page.getByRole("row", { name: /Adil Lawal/ }).click();
  const list = await json<{ guests: Array<{ id: string; name: string }> }>(
    await page.request.get("/api/staff/tickets"),
  );
  const guest = list.guests.find((item) => item.name === "Adil Lawal");
  expect(guest).toBeTruthy();
  const pass = await json<{ token: string; passUrl: string }>(
    await page.request.get(`/api/staff/tickets/${guest!.id}/pass`),
  );
  const family = await page.context().newPage();
  await family.goto(`/pass/${pass.token}`);
  await expect(family.getByText(/waiting at the gift table/i)).toBeVisible();
  await expect(family.getByText("Adil Lawal")).toHaveCount(0);
  await family.close();

  const review = await page.context().newPage();
  await review.goto(`/redeem/${pass.token}`);
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
    page.getByRole("heading", { name: /Every guest/i }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/workspace-mobile.png",
    fullPage: true,
  });
  await page.getByRole("row", { name: /Zara Bello/ }).click();
  await expect(page.getByRole("heading", { name: "Zara Bello" })).toBeVisible();
});

test("admin can create and find numbered passes without names", async ({
  page,
}) => {
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await page.getByRole("button", { name: /create passes/i }).click();
  await page.getByLabel(/how many passes/i).fill("45");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("45 passes created.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Guest 001" })).toBeVisible();
  await expect(page.getByText(/page 1 of 5/i)).toBeVisible();
  await page.getByPlaceholder(/search guest/i).fill("Guest 045");
  await expect(page.getByRole("row", { name: /Guest 045/ })).toBeVisible();
});
