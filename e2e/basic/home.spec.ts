import { test, expect } from '@playwright/test'

test.describe('Trang chủ', () => {
  test('hiển thị tiêu đề, logo và navigation — getByRole, getByAltText', async ({ page }) => {
    await page.goto('/')

    // ① getByRole — tiêu chuẩn vàng
    await expect(
      page.getByRole('heading', { name: 'Playwright UI Practice Lab', level: 1 })
    ).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Menu chính' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Menu chính' }).getByRole('link', { name: 'Đăng nhập' })
    ).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Menu chính' }).getByRole('link', { name: 'Form' })
    ).toBeVisible()

    // ⑤ getByAltText — hình ảnh
    await expect(page.getByAltText('Logo Playwright')).toBeVisible()
  })

  test('điều hướng đến Login — getByRole(link)', async ({ page }) => {
    await page.goto('/')

    // ① getByRole — click card link (tên accessible gồm cả mô tả)
    await page.getByRole('link', { name: 'Đăng nhập Form login' }).click()

    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('form', { name: 'Form đăng nhập' })).toBeVisible()
  })

  test('tooltip brand icon — getByTitle', async ({ page }) => {
    await page.goto('/')

    // ⑥ getByTitle — tooltip
    await expect(page.getByTitle('Playwright UI Practice Lab')).toBeVisible()
  })
})
