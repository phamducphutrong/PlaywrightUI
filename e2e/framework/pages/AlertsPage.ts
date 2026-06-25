import { expect, type Locator, type Page } from '@playwright/test'
import { alerts } from '../data/alerts'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class AlertsPage extends BasePage {
  readonly showSuccessBtn: Locator
  readonly showErrorBtn: Locator
  readonly showToastSuccessBtn: Locator
  readonly dismissBtn: Locator

  constructor(page: Page) {
    super(page)
    this.showSuccessBtn = page.getByTestId('show-success')
    this.showErrorBtn = page.getByTestId('show-error')
    this.showToastSuccessBtn = page.getByTestId('show-toast-success')
    this.dismissBtn = page.getByTestId('dismiss-inline-alert')
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
    await this.dismissBtn.click()
  }

  async expectInlineSuccessVisible() {
    const alert = this.page.getByTestId('inline-alert-success')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText(alerts.inlineSuccessKeyword)
  }

  async expectInlineErrorVisible() {
    await expect(this.page.getByTestId('inline-alert-error')).toBeVisible()
  }

  async expectInlineErrorHidden() {
    await expect(this.page.getByTestId('inline-alert-error')).not.toBeVisible()
  }

  async expectToastVisible() {
    await expect(this.page.getByText(alerts.toastSuccess)).toBeVisible()
  }
}
