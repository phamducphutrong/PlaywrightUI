import { test, expect } from '@playwright/test'

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts')
  })

  test('inline success — getByRole(button) + getByRole(alert)', async ({ page }) => {
    await page.getByRole('button', { name: 'Success Alert' }).click()

    const alert = page.getByRole('alert')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('thành công')
  })

  test('đóng inline alert — getByRole', async ({ page }) => {
    await page.getByRole('button', { name: 'Error Alert' }).click()
    await expect(page.getByRole('alert')).toBeVisible()

    await page.getByRole('button', { name: 'Đóng thông báo' }).click()
    await expect(page.getByRole('alert')).not.toBeVisible()
  })

  test('toast notification — getByText', async ({ page }) => {
    await page.getByRole('button', { name: 'Hiện Toast Success' }).click()

    // ④ getByText — toast message
    await expect(page.getByText('Toast: Lưu thành công!')).toBeVisible()
  })
})
