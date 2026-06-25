import { test } from '../fixtures/test-fixtures'

test.describe('Buttons', () => {
  test.beforeEach(async ({ buttonsPage }) => {
    await buttonsPage.open()
  })

  test('đếm số lần click', async ({ buttonsPage }) => {
    await buttonsPage.clickPrimary(3)
    await buttonsPage.expectClickCount('3')
  })

  test('reset counter', async ({ buttonsPage }) => {
    await buttonsPage.clickPrimary(1)
    await buttonsPage.reset()
    await buttonsPage.expectClickCount('0')
  })

  test('nút disabled không click được', async ({ buttonsPage }) => {
    await buttonsPage.expectDisabled()
  })

  test('async action hoàn tất', async ({ buttonsPage }) => {
    await buttonsPage.triggerAsyncAction()
    await buttonsPage.expectAsyncComplete()
  })
})
