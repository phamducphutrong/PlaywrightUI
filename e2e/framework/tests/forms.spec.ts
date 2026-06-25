import { test } from '../fixtures/test-fixtures'
import { countries } from '../data/forms'

test.describe('Form Controls', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.open()
  })

  test('điền và submit form', async ({ formsPage }) => {
    await formsPage.fillRegistrationForm()
    await formsPage.submit()
    await formsPage.expectSubmitSuccess()
  })

  test('chọn quốc gia từ dropdown', async ({ formsPage }) => {
    await formsPage.selectCountry(countries.japan)
    await formsPage.expectCountrySelected()
  })
})
