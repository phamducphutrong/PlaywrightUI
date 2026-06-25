import { expect, type Locator, type Page } from '@playwright/test'
import { alerts } from '../data/alerts'
import { messages } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class ModalPage extends BasePage {
  readonly openModalBtn: Locator
  readonly openConfirmBtn: Locator
  readonly modalDialog: Locator
  readonly modalInput: Locator
  readonly confirmDialog: Locator

  constructor(page: Page) {
    super(page)
    this.openModalBtn = page.getByRole('button', { name: 'Mở Modal' })
    this.openConfirmBtn = page.getByRole('button', { name: 'Mở Confirm Dialog' })
    this.modalDialog = page.getByRole('dialog')
    this.modalInput = page.getByLabel('Ghi chú')
    this.confirmDialog = page.getByRole('alertdialog')
  }

  async open() {
    await this.goto(routes.modal)
  }

  async openModal() {
    await this.openModalBtn.click()
  }

  async closeModal() {
    await this.page.getByRole('button', { name: 'Đóng modal' }).click()
  }

  async openConfirm() {
    await this.openConfirmBtn.click()
  }

  async confirmDelete() {
    await this.confirmDialog.getByRole('button', { name: 'Xóa' }).click()
  }

  async cancelConfirm() {
    await this.confirmDialog.getByRole('button', { name: 'Hủy' }).click()
  }

  async fillModalNote(note = alerts.modalNote) {
    await this.modalInput.fill(note)
    await this.modalDialog.getByRole('button', { name: 'Lưu' }).click()
  }

  async expectModalVisible() {
    await expect(this.modalDialog).toBeVisible()
    await expect(
      this.modalDialog.getByRole('heading', { name: 'Thông tin chi tiết' })
    ).toBeVisible()
  }

  async expectModalHidden() {
    await expect(this.modalDialog).not.toBeVisible()
  }

  async expectConfirmVisible() {
    await expect(this.confirmDialog).toBeVisible()
    await expect(
      this.confirmDialog.getByRole('heading', { name: 'Xác nhận xóa' })
    ).toBeVisible()
  }

  async expectConfirmDeleted() {
    await expect(this.page.getByText(messages.confirmDeleted)).toBeVisible()
  }

  async expectConfirmCancelled() {
    await expect(this.page.getByText(messages.confirmCancelled)).toBeVisible()
  }
}
