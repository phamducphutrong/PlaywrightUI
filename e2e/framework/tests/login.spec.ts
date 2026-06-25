import { test } from '../fixtures/test-fixtures'

test.describe('Đăng nhập', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open()
  })

  test('đăng nhập thành công — getByLabel', async ({ loginPage }) => {
    await loginPage.loginAsValidUser()
    await loginPage.expectLoginSuccess()
  })

  test('đăng nhập bằng placeholder — getByPlaceholder', async ({ loginPage }) => {
    await loginPage.loginWithPlaceholder('admin', 'password123')
    await loginPage.expectLoginSuccess()
  })

  test('hiển thị lỗi khi sai mật khẩu — getByRole(alert)', async ({ loginPage }) => {
    await loginPage.loginAsInvalidUser()
    await loginPage.expectLoginError()
  })

  test('phiên đăng nhập — getByTestId', async ({ loginPage }) => {
    await loginPage.loginAsValidUser()
    await loginPage.expectSessionByTestId()
    await loginPage.logout()
    await loginPage.expectLoginFormVisible()
  })
})
