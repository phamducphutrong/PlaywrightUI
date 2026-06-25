import { expect, type Locator, type Page } from '@playwright/test'
import { messages, users } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitBtn: Locator
  readonly errorMsg: Locator
  readonly successTitle: Locator
  readonly welcomeMsg: Locator
  readonly logoutBtn: Locator
  readonly loginForm: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.getByTestId('username-input')
    this.passwordInput = page.getByTestId('password-input')
    this.submitBtn = page.getByTestId('login-submit')
    this.errorMsg = page.getByTestId('login-error')
    this.successTitle = page.getByTestId('login-success-title')
    this.welcomeMsg = page.getByTestId('login-welcome-msg')
    this.logoutBtn = page.getByTestId('logout-btn')
    this.loginForm = page.getByTestId('login-form')
  }

  async open() {
    await this.goto(routes.login)
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitBtn.click()
  }

  async loginAsValidUser() {
    await this.login(users.valid.username, users.valid.password)
  }

  async loginAsInvalidUser() {
    await this.login(users.invalid.username, users.invalid.password)
  }

  async logout() {
    await this.logoutBtn.click()
  }

  async expectLoginSuccess(username = users.valid.username) {
    await expect(this.successTitle).toBeVisible({ timeout: 5000 })
    await expect(this.welcomeMsg).toContainText(username)
  }

  async expectLoginError() {
    await expect(this.errorMsg).toBeVisible({ timeout: 5000 })
    await expect(this.errorMsg).toHaveText(messages.loginError)
  }

  async expectLoginFormVisible() {
    await expect(this.loginForm).toBeVisible()
  }
}
