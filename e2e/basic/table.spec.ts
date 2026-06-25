import { test, expect } from '@playwright/test'

test.describe('Bảng dữ liệu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/table')
  })

  test('hiển thị bảng với dữ liệu', async ({ page }) => {
    await expect(page.getByTestId('users-table')).toBeVisible()
    await expect(page.getByTestId('users-table').locator('tbody tr')).toHaveCount(5)
    await expect(page.getByTestId('table-count')).toContainText('12')
  })

  test('tìm kiếm theo tên', async ({ page }) => {
    await page.getByTestId('table-search').fill('Nguyễn')
    await expect(page.getByTestId('table-count')).toContainText('1')
    await expect(page.getByTestId('table-row-1')).toBeVisible()
  })

  test('phân trang', async ({ page }) => {
    await expect(page.getByTestId('page-info')).toHaveText('Trang 1 / 3')

    await page.getByTestId('next-page').click()
    await expect(page.getByTestId('page-info')).toHaveText('Trang 2 / 3')

    await page.getByTestId('prev-page').click()
    await expect(page.getByTestId('page-info')).toHaveText('Trang 1 / 3')
  })

  test('sắp xếp theo tên', async ({ page }) => {
    const firstRow = page.getByTestId('users-table').locator('tbody tr').first()
    await expect(firstRow).toContainText('Bùi Thị H')

    await page.getByTestId('sort-name').click()
    await expect(firstRow).toContainText('Vũ Thị F')
  })
})
