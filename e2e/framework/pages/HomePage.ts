import { expect, type Page } from '@playwright/test'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async open() {
    await this.goto(routes.home)
  }

  async openLoginCard() {
    await this.page.getByRole('link', { name: 'Đăng nhập Form login' }).click()
  }

  async expectLoaded() {
    await expect(
      this.page.getByRole('heading', { name: 'Playwright UI Practice Lab', level: 1 })
    ).toBeVisible()
    await expect(this.mainNav).toBeVisible()
    await expect(this.navLink('Đăng nhập')).toBeVisible()
    await expect(this.navLink('Form')).toBeVisible()
    await expect(this.page.getByAltText('Logo Playwright')).toBeVisible()
  }

  async expectNavigatedToLogin() {
    await expect(this.page).toHaveURL(routes.login)
    await expect(this.page.getByRole('form', { name: 'Form đăng nhập' })).toBeVisible()
  }
}
