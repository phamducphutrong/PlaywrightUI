import { test, expect } from '@playwright/test'

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modal')
  })

  test('mở và đóng modal', async ({ page }) => {
    await page.getByTestId('open-modal-btn').click()
    await expect(page.getByTestId('modal-dialog')).toBeVisible()
    await expect(page.getByTestId('modal-title')).toHaveText('Thông tin chi tiết')

    await page.getByTestId('modal-close-btn').click()
    await expect(page.getByTestId('modal-dialog')).not.toBeVisible()
  })

  test('nhập text trong modal', async ({ page }) => {
    await page.getByTestId('open-modal-btn').click()
    await page.getByTestId('modal-input').fill('Ghi chú test')
    await page.getByTestId('modal-save-btn').click()

    await expect(page.getByTestId('modal-dialog')).not.toBeVisible()
  })

  test('confirm dialog — xác nhận xóa', async ({ page }) => {
    await page.getByTestId('open-confirm-btn').click()
    await expect(page.getByTestId('confirm-dialog')).toBeVisible()

    await page.getByTestId('confirm-ok-btn').click()
    await expect(page.getByTestId('confirm-result')).toHaveText('Đã xóa thành công!')
  })

  test('confirm dialog — hủy', async ({ page }) => {
    await page.getByTestId('open-confirm-btn').click()
    await page.getByTestId('confirm-cancel-btn').click()

    await expect(page.getByTestId('confirm-result')).toHaveText('Đã hủy xóa')
  })
})
