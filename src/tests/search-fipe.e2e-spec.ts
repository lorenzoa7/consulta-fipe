import { expect, test } from '@playwright/test'

test('search for fipe value', async ({ page }) => {
  await page.goto('/consultar-valor')

  await page.getByText('Carros', { exact: true }).click()

  await page.getByText('Motos', { exact: true }).click()

  await expect(page.getByText('Selecione a marca')).toBeVisible()

  await page.getByText('Selecione a marca', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await expect(page.getByText('Selecione o modelo')).toBeVisible()

  await page.getByText('Selecione o modelo', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await expect(page.getByText('Selecione o ano')).toBeVisible()

  await page.getByText('Selecione o ano', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await page.getByRole('button', { name: 'Consultar' }).click()

  await expect(page.getByText('Salvar')).toBeVisible()
})

test('save and remove fipe information', async ({ page }) => {
  await page.goto('/consultar-valor')

  await expect(page.getByText('Selecione a marca')).toBeVisible()

  await page.getByText('Selecione a marca', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await expect(page.getByText('Selecione o modelo')).toBeVisible()

  await page.getByText('Selecione o modelo', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await expect(page.getByText('Selecione o ano')).toBeVisible()

  await page.getByText('Selecione o ano', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await page.getByRole('button', { name: 'Consultar' }).click()

  await expect(page.getByText('Salvar')).toBeVisible()

  await page.getByText('Salvar', { exact: true }).click()

  await expect(page.getByText('Remover')).toBeVisible()

  await page.getByText('Remover', { exact: true }).click()

  await expect(page.getByText('Nenhum item salvo')).toBeVisible()
})

test('click on previous combobox', async ({ page }) => {
  await page.goto('/consultar-valor')

  await expect(page.getByText('Selecione a marca')).toBeVisible()

  await page.getByText('Selecione a marca', { exact: true }).click()

  await page.click('div[cmdk-list-sizer] > div:first-child')

  await expect(page.getByText('Selecione o modelo')).toBeVisible()

  await page.getByRole('combobox').first().click()

  await expect(page.getByText('Motos')).toBeVisible()

  await page.getByText('Motos', { exact: true }).click()

  await expect(page.getByText('Selecione a marca')).toBeVisible()
})

test('navigate to settings page', async ({ page }) => {
  await page.goto('/consultar-valor')

  await expect(page.getByText('Configurações')).toBeVisible()

  await page.getByText('Configurações', { exact: true }).click()

  await page.waitForEvent('framenavigated')

  await expect(page.getByText('Tema', { exact: true })).toBeVisible()
})
