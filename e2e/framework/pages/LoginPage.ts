import { expect, type Locator, type Page } from '@playwright/test'
import { messages, users } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitBtn: Locator
  readonly loginForm: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.getByLabel('Tên đăng nhập')
    this.passwordInput = page.getByLabel('Mật khẩu')
    this.submitBtn = page.getByRole('button', { name: 'Đăng nhập' })
    this.loginForm = page.getByRole('form', { name: 'Form đăng nhập' })
  }

  async open() {
    await this.goto(routes.login)
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitBtn.click()
  }

  async loginWithPlaceholder(username: string, password: string) {
    await this.page.getByPlaceholder('Nhập username').fill(username)
    await this.page.getByPlaceholder('Nhập password').fill(password)
    await this.submitBtn.click()
  }

  async loginAsValidUser() {
    await this.login(users.valid.username, users.valid.password)
  }

  async loginAsInvalidUser() {
    await this.login(users.invalid.username, users.invalid.password)
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Đăng xuất' }).click()
  }

  async expectLoginSuccess(username = users.valid.username) {
    await expect(
      this.page.getByRole('heading', { name: 'Đăng nhập thành công!' })
    ).toBeVisible({ timeout: 5000 })
    await expect(this.page.getByText(new RegExp(`Xin chào.*${username}`))).toBeVisible()
  }

  async expectLoginError() {
    await expect(this.page.getByRole('alert')).toBeVisible({ timeout: 5000 })
    await expect(this.page.getByRole('alert')).toHaveText(messages.loginError)
  }

  async expectLoginFormVisible() {
    await expect(this.loginForm).toBeVisible()
  }

  async expectSessionByTestId() {
    await expect(this.page.getByTestId('user-session')).toBeVisible({ timeout: 5000 })
  }
}
