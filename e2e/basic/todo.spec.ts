import { test, expect } from '@playwright/test'

test.describe('Todo List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo')
  })

  test('thêm todo mới', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Học viết test Playwright')
    await page.getByTestId('todo-add-btn').click()

    await expect(page.getByText('Học viết test Playwright')).toBeVisible()
    await expect(page.getByTestId('todo-remaining')).toContainText('3')
  })

  test('đánh dấu hoàn thành todo', async ({ page }) => {
    await page.getByTestId('todo-check-2').check()
    await expect(page.getByTestId('todo-text-2')).toHaveCSS('text-decoration', /line-through/)
  })

  test('xóa todo', async ({ page }) => {
    await page.getByTestId('todo-delete-3').click()
    await expect(page.getByTestId('todo-item-3')).not.toBeVisible()
  })

  test('lọc todo đã hoàn thành', async ({ page }) => {
    await page.getByTestId('filter-done').click()
    await expect(page.getByTestId('todo-item-1')).toBeVisible()
    await expect(page.getByTestId('todo-item-2')).not.toBeVisible()
  })
})
