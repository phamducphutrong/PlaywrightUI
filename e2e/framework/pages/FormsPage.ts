import { expect, type Locator, type Page } from '@playwright/test'
import { registrationForm, countries } from '../data/forms'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class FormsPage extends BasePage {
  readonly fullNameInput: Locator
  readonly emailInput: Locator
  readonly bioTextarea: Locator
  readonly countrySelect: Locator
  readonly submitBtn: Locator
  readonly successMsg: Locator

  constructor(page: Page) {
    super(page)
    this.fullNameInput = page.getByTestId('full-name-input')
    this.emailInput = page.getByTestId('email-input')
    this.bioTextarea = page.getByTestId('bio-textarea')
    this.countrySelect = page.getByTestId('country-select')
    this.submitBtn = page.getByTestId('form-submit')
    this.successMsg = page.getByTestId('form-success')
  }

  async open() {
    await this.goto(routes.forms)
  }

  async fillRegistrationForm(data = registrationForm) {
    await this.fullNameInput.fill(data.fullName)
    await this.emailInput.fill(data.email)
    await this.bioTextarea.fill(data.bio)
    await this.countrySelect.selectOption(data.country)

    for (const skill of data.skills) {
      await this.page.getByTestId(`skill-${skill}`).check()
    }

    await this.page.getByTestId(`gender-${data.gender}`).check()
    await this.page.getByTestId(`plan-${data.plan}`).check()
  }

  async submit() {
    await this.submitBtn.click()
  }

  async selectCountry(value: string) {
    await this.page.getByLabel('Quốc gia').selectOption(value)
  }

  async expectSubmitSuccess(name = registrationForm.fullName) {
    await expect(this.successMsg).toBeVisible()
    await expect(this.successMsg).toContainText(name)
  }

  async expectCountrySelected(value = countries.japan) {
    await expect(this.countrySelect).toHaveValue(value)
  }
}
