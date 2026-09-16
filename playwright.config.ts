import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: {
    command:
      "PARTY_DEMO=1 DEMO_DATA_DIR=memory:// APP_URL=http://127.0.0.1:3100 NEXT_DIST_DIR=.next-e2e pnpm exec next dev -p 3100 -H 127.0.0.1",
    url: "http://127.0.0.1:3100/staff/login",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
