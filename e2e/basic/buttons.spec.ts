import { test, expect } from '@playwright/test'

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buttons')
  })

  test('đếm số lần click — getByRole(button) + getByRole(region)', async ({ page }) => {
    const counterRegion = page.getByRole('region', { name: 'Click Counter' })
    const primaryBtn = page.getByRole('button', { name: 'Primary Button' })

    await primaryBtn.click()
    await primaryBtn.click()
    await primaryBtn.click()

    // ④ getByText trong region
    await expect(counterRegion.getByText('3', { exact: true })).toBeVisible()
  })

  test('reset counter — getByRole', async ({ page }) => {
    await page.getByRole('button', { name: 'Primary Button' }).click()
    await page.getByRole('button', { name: 'Reset' }).click()

    await expect(
      page.getByRole('region', { name: 'Click Counter' }).getByText('0', { exact: true })
    ).toBeVisible()
  })

  test('nút disabled — getByRole', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Disabled Button' })).toBeDisabled()
  })

  test('async action — getByRole + getByText', async ({ page }) => {
    await page.getByRole('button', { name: 'Async Action' }).click()
    await expect(page.getByRole('button', { name: 'Đang xử lý...' })).toBeVisible()
    await expect(page.getByText('Xử lý hoàn tất!')).toBeVisible({ timeout: 5000 })
  })

  test('external link — getByTitle', async ({ page }) => {
    // ⑥ getByTitle — link có tooltip
    const docsLink = page.getByTitle('Mở tài liệu Playwright trong tab mới')
    await expect(docsLink).toBeVisible()
    await expect(docsLink).toHaveAttribute('href', 'https://playwright.dev')
  })
})
