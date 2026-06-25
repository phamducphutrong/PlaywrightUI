import { test, expect } from '@playwright/test'

test.describe('Todo List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo')
  })

  test('thêm todo — getByPlaceholder + getByRole', async ({ page }) => {
    // ③ getByPlaceholder
    await page.getByPlaceholder('Thêm công việc mới...').fill('Học viết test Playwright')

    // ① getByRole button
    await page.getByRole('button', { name: 'Thêm' }).click()

    // ④ getByText
    await expect(page.getByText('Học viết test Playwright')).toBeVisible()
    await expect(page.getByText(/Còn lại:.*3/)).toBeVisible()
  })

  test('đánh dấu hoàn thành — getByRole(checkbox)', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Viết test cho form login' }).check()

    await expect(page.getByText('Viết test cho form login')).toHaveCSS(
      'text-decoration',
      /line-through/
    )
  })

  test('xóa todo — getByRole button có aria-label', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Xóa công việc: Thực hành locator strategies' })
      .click()

    await expect(page.getByText('Thực hành locator strategies')).not.toBeVisible()
  })

  test('lọc todo đã hoàn thành — getByRole', async ({ page }) => {
    await page.getByRole('button', { name: 'Đã xong' }).click()

    await expect(page.getByText('Học Playwright cơ bản')).toBeVisible()
    await expect(page.getByText('Viết test cho form login')).not.toBeVisible()
  })
})
