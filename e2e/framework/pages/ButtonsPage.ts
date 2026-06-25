import { expect, type Locator, type Page } from '@playwright/test'
import { messages } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class ButtonsPage extends BasePage {
  readonly primaryBtn: Locator
  readonly resetBtn: Locator
  readonly disabledBtn: Locator
  readonly asyncBtn: Locator
  readonly counterRegion: Locator
  readonly docsLink: Locator

  constructor(page: Page) {
    super(page)
    this.primaryBtn = page.getByRole('button', { name: 'Primary Button' })
    this.resetBtn = page.getByRole('button', { name: 'Reset' })
    this.disabledBtn = page.getByRole('button', { name: 'Disabled Button' })
    this.asyncBtn = page.getByRole('button', { name: 'Async Action' })
    this.counterRegion = page.getByRole('region', { name: 'Click Counter' })
    this.docsLink = page.getByTitle('Mở tài liệu Playwright trong tab mới')
  }

  async open() {
    await this.goto(routes.buttons)
  }

  async clickPrimary(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.primaryBtn.click()
    }
  }

  async reset() {
    await this.resetBtn.click()
  }

  async triggerAsyncAction() {
    await this.asyncBtn.click()
  }

  async expectClickCount(count: string) {
    await expect(this.counterRegion.getByText(count, { exact: true })).toBeVisible()
  }

  async expectDisabled() {
    await expect(this.disabledBtn).toBeDisabled()
  }

  async expectAsyncComplete() {
    await expect(this.page.getByRole('button', { name: 'Đang xử lý...' })).toBeVisible()
    await expect(this.page.getByText(messages.asyncComplete)).toBeVisible({ timeout: 5000 })
  }
}
