import { test, expect } from '@playwright/test'

test.describe('Trang chủ', () => {
  test('hiển thị tiêu đề và navigation', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('home-title')).toHaveText('Playwright UI Practice Lab')
    await expect(page.getByTestId('sidebar')).toBeVisible()
    await expect(page.getByTestId('nav-login')).toBeVisible()
    await expect(page.getByTestId('nav-forms')).toBeVisible()
  })

  test('điều hướng đến trang Login', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('card-login').click()

    await expect(page).toHaveURL('/login')
    await expect(page.getByTestId('login-form')).toBeVisible()
  })
})
