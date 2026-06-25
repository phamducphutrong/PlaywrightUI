import { test, expect } from '@playwright/test'

test.describe('Bảng dữ liệu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/table')
  })

  test('hiển thị bảng — getByRole(table)', async ({ page }) => {
    // ① getByRole table
    const table = page.getByRole('table', { name: 'Danh sách người dùng' })
    await expect(table).toBeVisible()
    await expect(table.getByRole('row')).toHaveCount(6) // 1 header + 5 data rows

    // ⑧ CSS Selector — dự phòng cho phần tử không có role rõ ràng
    await expect(page.locator('.table-count')).toContainText('12')
  })

  test('tìm kiếm — getByPlaceholder + getByRole(cell)', async ({ page }) => {
    await page.getByPlaceholder('Tìm theo tên, email, role...').fill('Nguyễn')

    await expect(page.locator('.table-count')).toContainText('1')
    await expect(page.getByRole('cell', { name: 'Nguyễn Văn A' })).toBeVisible()
  })

  test('phân trang — getByRole(navigation)', async ({ page }) => {
    const pagination = page.getByRole('navigation', { name: 'Phân trang bảng' })

    await expect(pagination).toContainText('Trang 1 / 3')
    await pagination.getByRole('button', { name: 'Sau →' }).click()
    await expect(pagination).toContainText('Trang 2 / 3')
    await pagination.getByRole('button', { name: '← Trước' }).click()
    await expect(pagination).toContainText('Trang 1 / 3')
  })

  test('sắp xếp theo tên — getByRole(button)', async ({ page }) => {
    const table = page.getByRole('table', { name: 'Danh sách người dùng' })
    const firstDataRow = table.getByRole('row').nth(1)

    await expect(firstDataRow).toContainText('Bùi Thị H')

    await page.getByRole('button', { name: 'Sắp xếp theo tên' }).click()
    await expect(firstDataRow).toContainText('Vũ Thị F')
  })

  test('đọc ô đầu tiên — XPath (phương án cuối)', async ({ page }) => {
    // ⑨ XPath — chỉ dùng khi các cách trên không khả thi
    const firstNameCell = page.locator(
      'xpath=//table[@aria-label="Danh sách người dùng"]//tbody/tr[1]/td[2]'
    )
    await expect(firstNameCell).toHaveText('Bùi Thị H')
  })
})
