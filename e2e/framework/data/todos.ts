export const sampleTodo = {
  text: 'Học viết test Playwright',
  remainingAfterAdd: '3',
} as const

export const initialTodos = {
  completedId: 1,
  activeId: 2,
  deletableId: 3,
} as const

export const todoTexts = {
  active: 'Viết test cho form login',
  deletable: 'Thực hành locator strategies',
  completed: 'Học Playwright cơ bản',
} as const
