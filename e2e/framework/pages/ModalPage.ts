import { expect, type Locator, type Page } from '@playwright/test'
import { alerts } from '../data/alerts'
import { messages } from '../data/users'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class ModalPage extends BasePage {
  readonly openModalBtn: Locator
  readonly openConfirmBtn: Locator
  readonly modalDialog: Locator
  readonly modalTitle: Locator
  readonly modalCloseBtn: Locator
  readonly modalInput: Locator
  readonly modalSaveBtn: Locator
  readonly confirmDialog: Locator
  readonly confirmOkBtn: Locator
  readonly confirmCancelBtn: Locator
  readonly confirmResult: Locator

  constructor(page: Page) {
    super(page)
    this.openModalBtn = page.getByTestId('open-modal-btn')
    this.openConfirmBtn = page.getByTestId('open-confirm-btn')
    this.modalDialog = page.getByTestId('modal-dialog')
    this.modalTitle = page.getByTestId('modal-title')
    this.modalCloseBtn = page.getByTestId('modal-close-btn')
    this.modalInput = page.getByTestId('modal-input')
    this.modalSaveBtn = page.getByTestId('modal-save-btn')
    this.confirmDialog = page.getByTestId('confirm-dialog')
    this.confirmOkBtn = page.getByTestId('confirm-ok-btn')
    this.confirmCancelBtn = page.getByTestId('confirm-cancel-btn')
    this.confirmResult = page.getByTestId('confirm-result')
  }

  async open() {
    await this.goto(routes.modal)
  }

  async openModal() {
    await this.openModalBtn.click()
  }

  async closeModal() {
    await this.modalCloseBtn.click()
  }

  async openConfirm() {
    await this.openConfirmBtn.click()
  }

  async confirmDelete() {
    await this.confirmOkBtn.click()
  }

  async cancelConfirm() {
    await this.confirmCancelBtn.click()
  }

  async fillModalNote(note = alerts.modalNote) {
    await this.modalInput.fill(note)
    await this.modalSaveBtn.click()
  }

  async expectModalVisible() {
    await expect(this.modalDialog).toBeVisible()
    await expect(this.modalTitle).toHaveText('Thông tin chi tiết')
  }

  async expectModalHidden() {
    await expect(this.modalDialog).not.toBeVisible()
  }

  async expectConfirmVisible() {
    await expect(this.confirmDialog).toBeVisible()
  }

  async expectConfirmDeleted() {
    await expect(this.confirmResult).toHaveText(messages.confirmDeleted)
  }

  async expectConfirmCancelled() {
    await expect(this.confirmResult).toHaveText(messages.confirmCancelled)
  }
}
