import { test, expect } from '@playwright/test'

test.describe('Form Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forms')
  })

  test('điền và submit form', async ({ page }) => {
    await page.getByTestId('full-name-input').fill('Nguyễn Văn Test')
    await page.getByTestId('email-input').fill('test@example.com')
    await page.getByTestId('bio-textarea').fill('Tôi đang học Playwright')
    await page.getByTestId('country-select').selectOption('vn')
    await page.getByTestId('skill-javascript').check()
    await page.getByTestId('skill-playwright').check()
    await page.getByTestId('gender-nam').check()
    await page.getByTestId('plan-pro').check()

    await page.getByTestId('form-submit').click()

    await expect(page.getByTestId('form-success')).toBeVisible()
    await expect(page.getByTestId('form-success')).toContainText('Nguyễn Văn Test')
  })

  test('chọn quốc gia từ dropdown', async ({ page }) => {
    await page.getByLabel('Quốc gia').selectOption('jp')
    await expect(page.getByTestId('country-select')).toHaveValue('jp')
  })
})
