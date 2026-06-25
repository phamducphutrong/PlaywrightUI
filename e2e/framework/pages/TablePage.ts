import { expect, type Locator, type Page } from '@playwright/test'
import { tableData } from '../data/table'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class TablePage extends BasePage {
  readonly table: Locator
  readonly searchInput: Locator
  readonly countLabel: Locator
  readonly pagination: Locator
  readonly sortNameBtn: Locator

  constructor(page: Page) {
    super(page)
    this.table = page.getByRole('table', { name: 'Danh sách người dùng' })
    this.searchInput = page.getByPlaceholder('Tìm theo tên, email, role...')
    this.countLabel = page.locator('.table-count')
    this.pagination = page.getByRole('navigation', { name: 'Phân trang bảng' })
    this.sortNameBtn = page.getByRole('button', { name: 'Sắp xếp theo tên' })
  }

  async open() {
    await this.goto(routes.table)
  }

  async search(term: string) {
    await this.searchInput.fill(term)
  }

  async sortByName() {
    await this.sortNameBtn.click()
  }

  async goNextPage() {
    await this.pagination.getByRole('button', { name: 'Sau →' }).click()
  }

  async goPrevPage() {
    await this.pagination.getByRole('button', { name: '← Trước' }).click()
  }

  firstDataRow() {
    return this.table.getByRole('row').nth(1)
  }

  async expectTableLoaded() {
    await expect(this.table).toBeVisible()
    await expect(this.table.getByRole('row')).toHaveCount(tableData.pageSize + 1)
    await expect(this.countLabel).toContainText(String(tableData.totalUsers))
  }

  async expectSearchResult() {
    await expect(this.countLabel).toContainText(String(tableData.searchResultCount))
    await expect(
      this.page.getByRole('cell', { name: 'Nguyễn Văn A' })
    ).toBeVisible()
  }

  async expectPageInfo(page: number) {
    await expect(this.pagination).toContainText(`Trang ${page} / ${tableData.totalPages}`)
  }

  async expectFirstRowContains(name: string) {
    await expect(this.firstDataRow()).toContainText(name)
  }

  async expectFirstNameByXPath(name: string) {
    const cell = this.page.locator(
      'xpath=//table[@aria-label="Danh sách người dùng"]//tbody/tr[1]/td[2]'
    )
    await expect(cell).toHaveText(name)
  }
}
