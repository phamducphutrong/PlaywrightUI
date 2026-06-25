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

  constructor(page: Page) {
    super(page)
    this.fullNameInput = page.getByLabel('Họ và tên')
    this.emailInput = page.getByLabel('Email')
    this.bioTextarea = page.getByPlaceholder('Viết vài dòng về bản thân...')
    this.countrySelect = page.getByLabel('Quốc gia')
    this.submitBtn = page.getByRole('button', { name: 'Gửi form' })
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
      const label = skill.charAt(0).toUpperCase() + skill.slice(1)
      await this.page.getByRole('checkbox', { name: label }).check()
    }

    const genderLabel = data.gender === 'nam' ? 'Nam' : data.gender
    await this.page.getByRole('radio', { name: genderLabel }).check()

    const planLabel = data.plan === 'pro' ? 'Pro' : data.plan === 'free' ? 'Miễn phí' : 'Enterprise'
    await this.page.getByRole('radio', { name: planLabel }).check()
  }

  async submit() {
    await this.submitBtn.click()
  }

  async selectCountry(value: string) {
    await this.countrySelect.selectOption(value)
  }

  async expectSubmitSuccess(name = registrationForm.fullName) {
    await expect(this.page.getByRole('status')).toBeVisible()
    await expect(this.page.getByRole('status')).toContainText(name)
  }

  async expectCountrySelected(value = countries.japan) {
    await expect(this.countrySelect).toHaveValue(value)
  }
}
