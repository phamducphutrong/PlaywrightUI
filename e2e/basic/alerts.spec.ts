import { test, expect } from '@playwright/test'

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts')
  })

  test('hiển thị inline success alert', async ({ page }) => {
    await page.getByTestId('show-success').click()
    await expect(page.getByTestId('inline-alert-success')).toBeVisible()
    await expect(page.getByTestId('inline-alert-success')).toContainText('thành công')
  })

  test('đóng inline alert', async ({ page }) => {
    await page.getByTestId('show-error').click()
    await expect(page.getByTestId('inline-alert-error')).toBeVisible()

    await page.getByTestId('dismiss-inline-alert').click()
    await expect(page.getByTestId('inline-alert-error')).not.toBeVisible()
  })

  test('hiển thị toast notification', async ({ page }) => {
    await page.getByTestId('show-toast-success').click()
    await expect(page.getByText('Toast: Lưu thành công!')).toBeVisible()
  })
})
