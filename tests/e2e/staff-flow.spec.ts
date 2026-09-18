import { expect, test, type APIResponse } from "@playwright/test";

async function json<T>(response: APIResponse) {
  return (await response.json()) as T;
}

test("staff can review and atomically collect a sample gift", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", {
      configurable: true,
      value: () => true,
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async () => undefined,
    });
  });
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await expect(page).toHaveURL(/\/staff$/);
  await expect(page.getByText("Adil Lawal")).toBeVisible();
  await page.screenshot({
    path: "test-results/workspace-desktop.png",
    fullPage: true,
  });

  await page.getByRole("row", { name: /Adil Lawal/ }).click();
  await page.getByRole("button", { name: /share pass/i }).click();
  await expect(
    page.getByText("Share sheet closed. Mark shared only after you send it."),
  ).toBeVisible();
  await page.getByRole("button", { name: /mark as shared/i }).click();
  await expect(page.getByText("Pass shared").last()).toBeVisible();
  const list = await json<{ guests: Array<{ id: string; name: string }> }>(
    await page.request.get("/api/staff/tickets"),
  );
  const guest = list.guests.find((item) => item.name === "Adil Lawal");
  expect(guest).toBeTruthy();
  const pass = await json<{ token: string; passUrl: string }>(
    await page.request.get(`/api/staff/tickets/${guest!.id}/pass`),
  );
  const preview = page.waitForEvent("popup");
  await page.getByRole("button", { name: /preview guest pass/i }).click();
  const family = await preview;
  await expect(family).toHaveURL(/\/pass\/[A-Za-z0-9_-]+$/);
  await expect(family.getByText(/waiting at the gift table/i)).toBeVisible();
  await expect(family.getByText("Adil Lawal")).toHaveCount(0);
  await family.screenshot({
    path: "test-results/guest-pass.png",
    fullPage: true,
  });
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
  await page.getByRole("button", { name: "Select page" }).click();
  await expect(
    page.getByRole("button", { name: /share selected/i }),
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
  await expect(page.getByLabel(/how many passes/i)).toHaveValue("10");
  await page.getByLabel(/how many passes/i).fill("100");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(
    page.getByRole("heading", { name: /create 100 passes/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /go back/i }).click();
  await page.getByLabel(/how many passes/i).fill("45");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("45 passes created.")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /select a pass/i }),
  ).toBeVisible();
  await expect(page.getByText(/page 1 of 5/i)).toBeVisible();
  await page.getByPlaceholder(/search guest/i).fill("Guest 045");
  await expect(page.getByRole("row", { name: /Guest 045/ })).toBeVisible();

  await page.getByRole("button", { name: /create passes/i }).click();
  await page.getByLabel(/how many passes/i).fill("1");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("1 pass created.")).toBeVisible();
  await page.getByPlaceholder(/search guest/i).fill("Guest 046");
  await expect(page.getByRole("row", { name: /Guest 046/ })).toBeVisible();
});

test("copying a link does not spin share, and delete asks first", async ({
  context,
  page,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await page.getByRole("button", { name: /create passes/i }).click();
  await page.getByLabel(/how many passes/i).fill("1");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("1 pass created.")).toBeVisible();
  await page
    .getByRole("row", { name: /Guest 001/ })
    .first()
    .click();

  let releasePass: () => void = () => {};
  const held = new Promise<void>((resolve) => {
    releasePass = resolve;
  });
  await page.route("**/api/staff/tickets/*/pass", async (route) => {
    await held;
    await route.continue();
  });

  const copy = page.getByRole("button", { name: /copy pass link/i });
  const share = page.getByRole("button", { name: /share pass/i });
  const copying = copy.click();
  await expect(copy).toHaveAttribute("aria-busy", "true");
  await expect(share).not.toHaveAttribute("aria-busy", "true");
  await expect(share).toBeDisabled();
  releasePass();
  await copying;
  await expect(page.getByText(/pass link copied/i)).toBeVisible();
  await page.unroute("**/api/staff/tickets/*/pass");

  await page.getByRole("button", { name: /delete guest/i }).click();
  const dialog = page.getByRole("alertdialog");
  await expect(
    dialog.getByRole("heading", { name: /delete this pass/i }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Keep guest" }).click();
  await expect(dialog).toHaveCount(0);

  await page.getByRole("button", { name: /delete guest/i }).click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: /delete guest/i })
    .click();
  await expect(page.getByText(/guest 001 deleted/i)).toBeVisible();
});

test("bulk selection uses guided sharing", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", {
      configurable: true,
      value: () => true,
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async () => undefined,
    });
  });
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await page.getByRole("button", { name: /create passes/i }).click();
  await page.getByRole("button", { name: /use names/i }).click();
  await page
    .getByLabel(/one name per line/i)
    .fill("Bulk Queue Alpha\nBulk Queue Beta");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("2 passes created.")).toBeVisible();
  await page.getByPlaceholder(/search guest/i).fill("Bulk Queue");
  await page.getByLabel("Select Bulk Queue Alpha").first().check();
  await page.getByRole("button", { name: "Select all 2 matching" }).click();
  await expect(page.getByText("2 selected")).toBeVisible();
  const bulkPassRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/staff/tickets/bulk-pass"))
      bulkPassRequests.push(request.url());
  });
  await page.getByRole("button", { name: /share selected/i }).click();
  await expect(page.getByRole("heading", { name: /send one/i })).toBeVisible();
  expect(bulkPassRequests).toHaveLength(0);
  await page.getByRole("button", { name: /^share pass$/i }).click();
  await expect(
    page.getByText("Share sheet closed. Mark shared only after you send it."),
  ).toBeVisible();
  await page.getByRole("button", { name: /mark shared & next/i }).click();
  await expect(page.getByText(/marked as shared/i)).toBeVisible();
  await page.getByRole("button", { name: /^skip$/i }).click();
  await expect(
    page.getByText(/finished sharing selected passes/i).last(),
  ).toBeVisible();
});

test("selected passes can start a ZIP download", async ({ page }) => {
  await page.goto("/staff/login");
  await page.getByRole("button", { name: /enter the gift club/i }).click();
  await page.getByRole("button", { name: /create passes/i }).click();
  await page.getByRole("button", { name: /use names/i }).click();
  await page.getByLabel(/one name per line/i).fill("Bulk Export Guest");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /^create passes$/i })
    .click();
  await expect(page.getByText("1 pass created.")).toBeVisible();
  await page.getByPlaceholder(/search guest/i).fill("Bulk Export Guest");
  await page.getByLabel("Select Bulk Export Guest").first().check();
  await page.getByRole("button", { name: /more actions/i }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /download images as zip/i }).click();
  const zip = await download;
  expect(zip.suggestedFilename()).toMatch(
    /^party-gift-passes-\d{4}-\d{2}-\d{2}\.zip$/,
  );
});
