import { test } from '../fixtures/test-fixtures'

test.describe('Trang chủ', () => {
  test('hiển thị tiêu đề và navigation', async ({ homePage }) => {
    await homePage.open()
    await homePage.expectLoaded()
  })

  test('điều hướng đến trang Login', async ({ homePage }) => {
    await homePage.open()
    await homePage.openLoginCard()
    await homePage.expectNavigatedToLogin()
  })
})
