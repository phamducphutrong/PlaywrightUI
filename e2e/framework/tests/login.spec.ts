import { test } from '../fixtures/test-fixtures'

test.describe('Đăng nhập', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open()
  })

  test('đăng nhập thành công với credentials đúng', async ({ loginPage }) => {
    await loginPage.loginAsValidUser()
    await loginPage.expectLoginSuccess()
  })

  test('hiển thị lỗi khi sai mật khẩu', async ({ loginPage }) => {
    await loginPage.loginAsInvalidUser()
    await loginPage.expectLoginError()
  })

  test('đăng xuất sau khi đăng nhập', async ({ loginPage }) => {
    await loginPage.loginAsValidUser()
    await loginPage.expectLoginSuccess()
    await loginPage.logout()
    await loginPage.expectLoginFormVisible()
  })
})
