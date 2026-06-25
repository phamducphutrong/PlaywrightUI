import { expect, type Locator, type Page } from '@playwright/test'
import { messages } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class ButtonsPage extends BasePage {
  readonly primaryBtn: Locator
  readonly resetBtn: Locator
  readonly disabledBtn: Locator
  readonly asyncBtn: Locator
  readonly clickCount: Locator
  readonly lastAction: Locator

  constructor(page: Page) {
    super(page)
    this.primaryBtn = page.getByTestId('btn-primary')
    this.resetBtn = page.getByTestId('btn-reset')
    this.disabledBtn = page.getByTestId('btn-disabled')
    this.asyncBtn = page.getByTestId('btn-async')
    this.clickCount = page.getByTestId('click-count')
    this.lastAction = page.getByTestId('last-action')
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
    await expect(this.clickCount).toHaveText(count)
  }

  async expectDisabled() {
    await expect(this.disabledBtn).toBeDisabled()
  }

  async expectAsyncComplete() {
    await expect(this.asyncBtn).toHaveText('Đang xử lý...')
    await expect(this.lastAction).toHaveText(messages.asyncComplete, { timeout: 5000 })
  }
}
