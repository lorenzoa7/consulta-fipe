import { expect, test } from '@playwright/test'

test('change to dark theme', async ({ page }) => {
  await page.goto('/configuracoes')

  await expect(page.getByText('Escuro')).toBeVisible()

  await page.getByText('Escuro', { exact: true }).click()
  await page.getByText('Atualizar preferências', { exact: true }).click()

  const html = page.locator('html')

  await expect(html).toHaveClass(/dark/)
  await expect(html).toHaveAttribute('style', /color-scheme: dark;/)
})

test('change to light theme', async ({ page }) => {
  await page.goto('/configuracoes')

  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark')
  })

  await page.reload()

  await page.getByText('Claro', { exact: true }).click()

  await page.getByText('Atualizar preferências', { exact: true }).click()

  const html = page.locator('html')

  await expect(html).toHaveClass(/light/)
  await expect(html).toHaveAttribute('style', /color-scheme: light;/)
})
