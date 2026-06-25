import { test, expect } from '@playwright/test'

test.describe('Đăng nhập', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('đăng nhập thành công — getByLabel + getByRole', async ({ page }) => {
    // ② getByLabel — form có label
    await page.getByLabel('Tên đăng nhập').fill('admin')
    await page.getByLabel('Mật khẩu').fill('password123')

    // ① getByRole — nút submit
    await page.getByRole('button', { name: 'Đăng nhập' }).click()

    await expect(
      page.getByRole('heading', { name: 'Đăng nhập thành công!' })
    ).toBeVisible({ timeout: 5000 })

    // ④ getByText — nội dung chào mừng
    await expect(page.getByText(/Xin chào.*admin/)).toBeVisible()
  })

  test('đăng nhập bằng placeholder — getByPlaceholder', async ({ page }) => {
    // ③ getByPlaceholder — khi muốn locate theo placeholder
    await page.getByPlaceholder('Nhập username').fill('admin')
    await page.getByPlaceholder('Nhập password').fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()

    await expect(page.getByRole('heading', { name: 'Đăng nhập thành công!' })).toBeVisible({
      timeout: 5000,
    })
  })

  test('hiển thị lỗi — getByRole(alert)', async ({ page }) => {
    await page.getByLabel('Tên đăng nhập').fill('admin')
    await page.getByLabel('Mật khẩu').fill('wrong')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()

    // ① getByRole alert
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('alert')).toHaveText('Sai tên đăng nhập hoặc mật khẩu')
  })

  test('phiên đăng nhập — getByTestId (ưu tiên thấp hơn)', async ({ page }) => {
    await page.getByLabel('Tên đăng nhập').fill('admin')
    await page.getByLabel('Mật khẩu').fill('password123')
    await page.getByRole('button', { name: 'Đăng nhập' }).click()

    // ⑦ getByTestId — chỉ dùng khi dev bổ sung data-testid
    await expect(page.getByTestId('user-session')).toBeVisible({ timeout: 5000 })

    await page.getByRole('button', { name: 'Đăng xuất' }).click()
    await expect(page.getByRole('form', { name: 'Form đăng nhập' })).toBeVisible()
  })
})
