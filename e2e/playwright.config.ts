import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

enum APPS {
  ANGULAR_JS = "angularjs",
  ANGULAR = "angular",
  VUE_JS = "vuejs",
  REACT = "react",
}

const appCommand = () => {
  switch (process.env.RUNAPP) {
    case APPS.ANGULAR_JS:
      return "pnpm -w run angularjsapp";
    case APPS.ANGULAR:
      return "pnpm -w run angularapp";
    case APPS.VUE_JS:
      return "pnpm -w run vueapp";
    case APPS.REACT:
      return "pnpm -w run reactapp";
    default:
      console.error(
        "RUNAPP environment variable must have a valid value. \n\nValid values are :\n"
      );
      // eslint-disable-next-line no-restricted-syntax
      for (let item in APPS) {
        console.error(APPS[item]);
      }
      console.error("\n");
      return process.exit(1);
  }
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: appCommand(),
    port: 5173,
  },
};

export default config;
