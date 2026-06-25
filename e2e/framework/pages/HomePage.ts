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
    await this.page.getByTestId('card-login').click()
  }

  async expectLoaded() {
    await expect(this.page.getByTestId('home-title')).toHaveText('Playwright UI Practice Lab')
    await expect(this.sidebar).toBeVisible()
    await expect(this.navLink('nav-login')).toBeVisible()
    await expect(this.navLink('nav-forms')).toBeVisible()
  }

  async expectNavigatedToLogin() {
    await expect(this.page).toHaveURL(routes.login)
    await expect(this.page.getByTestId('login-form')).toBeVisible()
  }
}
