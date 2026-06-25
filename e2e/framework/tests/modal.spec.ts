import { test } from '../fixtures/test-fixtures'

test.describe('Modal', () => {
  test.beforeEach(async ({ modalPage }) => {
    await modalPage.open()
  })

  test('mở và đóng modal', async ({ modalPage }) => {
    await modalPage.openModal()
    await modalPage.expectModalVisible()
    await modalPage.closeModal()
    await modalPage.expectModalHidden()
  })

  test('nhập text trong modal', async ({ modalPage }) => {
    await modalPage.openModal()
    await modalPage.fillModalNote()
    await modalPage.expectModalHidden()
  })

  test('confirm dialog — xác nhận xóa', async ({ modalPage }) => {
    await modalPage.openConfirm()
    await modalPage.expectConfirmVisible()
    await modalPage.confirmDelete()
    await modalPage.expectConfirmDeleted()
  })

  test('confirm dialog — hủy', async ({ modalPage }) => {
    await modalPage.openConfirm()
    await modalPage.cancelConfirm()
    await modalPage.expectConfirmCancelled()
  })
})
