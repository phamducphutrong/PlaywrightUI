import { test } from '../fixtures/test-fixtures'

test.describe('Alerts', () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.open()
  })

  test('hiển thị inline success alert', async ({ alertsPage }) => {
    await alertsPage.showInlineSuccess()
    await alertsPage.expectInlineSuccessVisible()
  })

  test('đóng inline alert', async ({ alertsPage }) => {
    await alertsPage.showInlineError()
    await alertsPage.expectInlineErrorVisible()
    await alertsPage.dismissInlineAlert()
    await alertsPage.expectInlineErrorHidden()
  })

  test('hiển thị toast notification', async ({ alertsPage }) => {
    await alertsPage.showToastSuccess()
    await alertsPage.expectToastVisible()
  })
})
