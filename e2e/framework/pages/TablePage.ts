import { expect, type Locator, type Page } from '@playwright/test'
import { tableData } from '../data/table'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class TablePage extends BasePage {
  readonly table: Locator
  readonly searchInput: Locator
  readonly countLabel: Locator
  readonly pageInfo: Locator
  readonly prevPageBtn: Locator
  readonly nextPageBtn: Locator
  readonly sortNameBtn: Locator

  constructor(page: Page) {
    super(page)
    this.table = page.getByTestId('users-table')
    this.searchInput = page.getByTestId('table-search')
    this.countLabel = page.getByTestId('table-count')
    this.pageInfo = page.getByTestId('page-info')
    this.prevPageBtn = page.getByTestId('prev-page')
    this.nextPageBtn = page.getByTestId('next-page')
    this.sortNameBtn = page.getByTestId('sort-name')
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
    await this.nextPageBtn.click()
  }

  async goPrevPage() {
    await this.prevPageBtn.click()
  }

  firstRow() {
    return this.table.locator('tbody tr').first()
  }

  tableRow(id: number) {
    return this.page.getByTestId(`table-row-${id}`)
  }

  async expectTableLoaded() {
    await expect(this.table).toBeVisible()
    await expect(this.table.locator('tbody tr')).toHaveCount(tableData.pageSize)
    await expect(this.countLabel).toContainText(String(tableData.totalUsers))
  }

  async expectSearchResult() {
    await expect(this.countLabel).toContainText(String(tableData.searchResultCount))
    await expect(this.tableRow(tableData.searchResultId)).toBeVisible()
  }

  async expectPageInfo(page: number) {
    await expect(this.pageInfo).toHaveText(`Trang ${page} / ${tableData.totalPages}`)
  }

  async expectFirstRowContains(name: string) {
    await expect(this.firstRow()).toContainText(name)
  }
}
