import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3012',
  },
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3012',
    reuseExistingServer: !process.env.CI,
  },
})
