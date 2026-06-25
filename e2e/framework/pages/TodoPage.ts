import { expect, type Locator, type Page } from '@playwright/test'
import { initialTodos } from '../data/todos'
import { routes } from '../data/routes'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly input: Locator
  readonly addBtn: Locator
  readonly todoList: Locator
  readonly remaining: Locator

  constructor(page: Page) {
    super(page)
    this.input = page.getByTestId('todo-input')
    this.addBtn = page.getByTestId('todo-add-btn')
    this.todoList = page.getByTestId('todo-list')
    this.remaining = page.getByTestId('todo-remaining')
  }

  async open() {
    await this.goto(routes.todo)
  }

  async addTodo(text: string) {
    await this.input.fill(text)
    await this.addBtn.click()
  }

  async toggleTodo(id: number) {
    await this.page.getByTestId(`todo-check-${id}`).check()
  }

  async deleteTodo(id: number) {
    await this.page.getByTestId(`todo-delete-${id}`).click()
  }

  async filterBy(status: 'all' | 'active' | 'done') {
    await this.page.getByTestId(`filter-${status}`).click()
  }

  todoItem(id: number) {
    return this.page.getByTestId(`todo-item-${id}`)
  }

  todoText(id: number) {
    return this.page.getByTestId(`todo-text-${id}`)
  }

  async expectTodoVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }

  async expectRemaining(count: string) {
    await expect(this.remaining).toContainText(count)
  }

  async expectTodoCompleted(id: number) {
    await expect(this.todoText(id)).toHaveCSS('text-decoration', /line-through/)
  }

  async expectTodoHidden(id: number) {
    await expect(this.todoItem(id)).not.toBeVisible()
  }

  async expectOnlyCompletedVisible() {
    await expect(this.todoItem(initialTodos.completedId)).toBeVisible()
    await expect(this.todoItem(initialTodos.activeId)).not.toBeVisible()
  }
}
