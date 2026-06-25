import { test, expect } from '@playwright/test'

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modal')
  })

  test('mở và đóng modal — getByRole(dialog)', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở Modal' }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name: 'Thông tin chi tiết' })).toBeVisible()

    await page.getByRole('button', { name: 'Đóng modal' }).click()
    await expect(dialog).not.toBeVisible()
  })

  test('nhập text trong modal — getByLabel', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở Modal' }).click()

    // ② getByLabel trong dialog
    await page.getByLabel('Ghi chú').fill('Ghi chú test')
    await page.getByRole('button', { name: 'Lưu' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('confirm dialog — getByRole(alertdialog)', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở Confirm Dialog' }).click()

    const confirm = page.getByRole('alertdialog')
    await expect(confirm).toBeVisible()
    await expect(confirm.getByRole('heading', { name: 'Xác nhận xóa' })).toBeVisible()

    await confirm.getByRole('button', { name: 'Xóa' }).click()

    // ④ getByText kết quả
    await expect(page.getByText('Đã xóa thành công!')).toBeVisible()
  })

  test('confirm dialog — hủy', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở Confirm Dialog' }).click()
    await page.getByRole('alertdialog').getByRole('button', { name: 'Hủy' }).click()

    await expect(page.getByText('Đã hủy xóa')).toBeVisible()
  })
})
