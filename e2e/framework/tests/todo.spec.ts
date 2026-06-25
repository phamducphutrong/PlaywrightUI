import { test } from '../fixtures/test-fixtures'
import { sampleTodo, initialTodos } from '../data/todos'

test.describe('Todo List', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open()
  })

  test('thêm todo mới', async ({ todoPage }) => {
    await todoPage.addTodo(sampleTodo.text)
    await todoPage.expectTodoVisible(sampleTodo.text)
    await todoPage.expectRemaining(sampleTodo.remainingAfterAdd)
  })

  test('đánh dấu hoàn thành todo', async ({ todoPage }) => {
    await todoPage.toggleTodo(initialTodos.activeId)
    await todoPage.expectTodoCompleted(initialTodos.activeId)
  })

  test('xóa todo', async ({ todoPage }) => {
    await todoPage.deleteTodo(initialTodos.deletableId)
    await todoPage.expectTodoHidden(initialTodos.deletableId)
  })

  test('lọc todo đã hoàn thành', async ({ todoPage }) => {
    await todoPage.filterBy('done')
    await todoPage.expectOnlyCompletedVisible()
  })
})
