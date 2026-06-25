import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { FormsPage } from '../pages/FormsPage'
import { ButtonsPage } from '../pages/ButtonsPage'
import { TodoPage } from '../pages/TodoPage'
import { TablePage } from '../pages/TablePage'
import { ModalPage } from '../pages/ModalPage'
import { AlertsPage } from '../pages/AlertsPage'

type AppFixtures = {
  homePage: HomePage
  loginPage: LoginPage
  formsPage: FormsPage
  buttonsPage: ButtonsPage
  todoPage: TodoPage
  tablePage: TablePage
  modalPage: ModalPage
  alertsPage: AlertsPage
}

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page))
  },
  buttonsPage: async ({ page }, use) => {
    await use(new ButtonsPage(page))
  },
  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page))
  },
  tablePage: async ({ page }, use) => {
    await use(new TablePage(page))
  },
  modalPage: async ({ page }, use) => {
    await use(new ModalPage(page))
  },
  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page))
  },
})

export { expect } from '@playwright/test'
