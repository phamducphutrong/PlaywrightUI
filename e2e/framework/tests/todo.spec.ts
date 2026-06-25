import { test } from '../fixtures/test-fixtures'
import { sampleTodo, todoTexts } from '../data/todos'

test.describe('Todo List', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open()
  })

  test('thêm todo mới', async ({ todoPage }) => {
    await todoPage.addSampleTodo()
    await todoPage.expectTodoVisible(sampleTodo.text)
    await todoPage.expectSampleRemaining()
  })

  test('đánh dấu hoàn thành todo', async ({ todoPage }) => {
    await todoPage.toggleTodo(todoTexts.active)
    await todoPage.expectTodoCompleted(todoTexts.active)
  })

  test('xóa todo', async ({ todoPage }) => {
    await todoPage.deleteTodo(todoTexts.deletable)
    await todoPage.expectTodoHidden(todoTexts.deletable)
  })

  test('lọc todo đã hoàn thành', async ({ todoPage }) => {
    await todoPage.filterBy('Đã xong')
    await todoPage.expectOnlyCompletedVisible(todoTexts.completed, todoTexts.active)
  })
})
