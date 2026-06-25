import { test, expect } from '@playwright/test'

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buttons')
  })

  test('đếm số lần click', async ({ page }) => {
    const primaryBtn = page.getByTestId('btn-primary')

    await primaryBtn.click()
    await primaryBtn.click()
    await primaryBtn.click()

    await expect(page.getByTestId('click-count')).toHaveText('3')
  })

  test('reset counter', async ({ page }) => {
    await page.getByTestId('btn-primary').click()
    await page.getByTestId('btn-reset').click()

    await expect(page.getByTestId('click-count')).toHaveText('0')
  })

  test('nút disabled không click được', async ({ page }) => {
    await expect(page.getByTestId('btn-disabled')).toBeDisabled()
  })

  test('async action hoàn tất', async ({ page }) => {
    await page.getByTestId('btn-async').click()
    await expect(page.getByTestId('btn-async')).toHaveText('Đang xử lý...')
    await expect(page.getByTestId('last-action')).toHaveText('Xử lý hoàn tất!', { timeout: 5000 })
  })
})
