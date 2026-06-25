import type { Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly sidebar: Locator
  readonly mainContent: Locator

  constructor(page: Page) {
    this.page = page
    this.sidebar = page.getByTestId('sidebar')
    this.mainContent = page.getByTestId('main-content')
  }

  async goto(path: string) {
    await this.page.goto(path)
  }

  navLink(testId: string) {
    return this.page.getByTestId(testId)
  }
}
