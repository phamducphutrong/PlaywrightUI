import type { Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly mainContent: Locator
  readonly mainNav: Locator

  constructor(page: Page) {
    this.page = page
    this.mainContent = page.getByRole('main')
    this.mainNav = page.getByRole('navigation', { name: 'Menu chính' })
  }

  async goto(path: string) {
    await this.page.goto(path)
  }

  navLink(name: string) {
    return this.mainNav.getByRole('link', { name })
  }
}
