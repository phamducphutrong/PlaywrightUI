import { test, expect } from '@playwright/test'

test.describe('Đăng nhập', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('đăng nhập thành công với credentials đúng', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('login-submit').click()

    await expect(page.getByTestId('login-success-title')).toBeVisible({ timeout: 5000 })
    await expect(page.getByTestId('login-welcome-msg')).toContainText('admin')
  })

  test('hiển thị lỗi khi sai mật khẩu', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('wrong')
    await page.getByTestId('login-submit').click()

    await expect(page.getByTestId('login-error')).toBeVisible({ timeout: 5000 })
    await expect(page.getByTestId('login-error')).toHaveText('Sai tên đăng nhập hoặc mật khẩu')
  })

  test('đăng xuất sau khi đăng nhập', async ({ page }) => {
    await page.getByTestId('username-input').fill('admin')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('login-submit').click()

    await expect(page.getByTestId('logout-btn')).toBeVisible({ timeout: 5000 })
    await page.getByTestId('logout-btn').click()

    await expect(page.getByTestId('login-form')).toBeVisible()
  })
})
