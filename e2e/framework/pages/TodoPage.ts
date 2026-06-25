import { expect, type Locator, type Page } from '@playwright/test'
import { sampleTodo } from '../data/todos'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly input: Locator
  readonly addBtn: Locator
  readonly todoList: Locator

  constructor(page: Page) {
    super(page)
    this.input = page.getByPlaceholder('Thêm công việc mới...')
    this.addBtn = page.getByRole('button', { name: 'Thêm' })
    this.todoList = page.getByRole('list', { name: 'Danh sách công việc' })
  }

  async open() {
    await this.goto(routes.todo)
  }

  async addTodo(text: string) {
    await this.input.fill(text)
    await this.addBtn.click()
  }

  async toggleTodo(text: string) {
    await this.page.getByRole('checkbox', { name: text }).check()
  }

  async deleteTodo(text: string) {
    await this.page.getByRole('button', { name: `Xóa công việc: ${text}` }).click()
  }

  async filterBy(label: 'Tất cả' | 'Chưa xong' | 'Đã xong') {
    await this.page.getByRole('button', { name: label }).click()
  }

  async expectTodoVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }

  async expectRemaining(count: string) {
    await expect(this.page.getByText(new RegExp(`Còn lại:.*${count}`))).toBeVisible()
  }

  async expectTodoCompleted(text: string) {
    await expect(this.page.getByText(text)).toHaveCSS('text-decoration', /line-through/)
  }

  async expectTodoHidden(text: string) {
    await expect(this.page.getByText(text)).not.toBeVisible()
  }

  async expectOnlyCompletedVisible(completedText: string, hiddenText: string) {
    await expect(this.page.getByText(completedText)).toBeVisible()
    await expect(this.page.getByText(hiddenText)).not.toBeVisible()
  }

  async addSampleTodo() {
    await this.addTodo(sampleTodo.text)
  }

  async expectSampleRemaining() {
    await this.expectRemaining(sampleTodo.remainingAfterAdd)
  }
}
