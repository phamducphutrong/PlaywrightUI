import { expect, type Locator, type Page } from '@playwright/test'
import { alerts } from '../data/alerts'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class AlertsPage extends BasePage {
  readonly showSuccessBtn: Locator
  readonly showErrorBtn: Locator
  readonly showToastSuccessBtn: Locator

  constructor(page: Page) {
    super(page)
    this.showSuccessBtn = page.getByRole('button', { name: 'Success Alert' })
    this.showErrorBtn = page.getByRole('button', { name: 'Error Alert' })
    this.showToastSuccessBtn = page.getByRole('button', { name: 'Hiện Toast Success' })
  }

  async open() {
    await this.goto(routes.alerts)
  }

  async showInlineSuccess() {
    await this.showSuccessBtn.click()
  }

  async showInlineError() {
    await this.showErrorBtn.click()
  }

  async showToastSuccess() {
    await this.showToastSuccessBtn.click()
  }

  async dismissInlineAlert() {
    await this.page.getByRole('button', { name: 'Đóng thông báo' }).click()
  }

  async expectInlineSuccessVisible() {
    const alert = this.page.getByRole('alert')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText(alerts.inlineSuccessKeyword)
  }

  async expectInlineErrorVisible() {
    await expect(this.page.getByRole('alert')).toBeVisible()
  }

  async expectInlineErrorHidden() {
    await expect(this.page.getByRole('alert')).not.toBeVisible()
  }

  async expectToastVisible() {
    await expect(this.page.getByText(alerts.toastSuccess)).toBeVisible()
  }
}
