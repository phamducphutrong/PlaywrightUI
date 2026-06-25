import { test } from '../fixtures/test-fixtures'
import { tableData } from '../data/table'

test.describe('Bảng dữ liệu', () => {
  test.beforeEach(async ({ tablePage }) => {
    await tablePage.open()
  })

  test('hiển thị bảng với dữ liệu', async ({ tablePage }) => {
    await tablePage.expectTableLoaded()
  })

  test('tìm kiếm theo tên', async ({ tablePage }) => {
    await tablePage.search(tableData.searchTerm)
    await tablePage.expectSearchResult()
  })

  test('phân trang', async ({ tablePage }) => {
    await tablePage.expectPageInfo(1)
    await tablePage.goNextPage()
    await tablePage.expectPageInfo(2)
    await tablePage.goPrevPage()
    await tablePage.expectPageInfo(1)
  })

  test('sắp xếp theo tên', async ({ tablePage }) => {
    await tablePage.expectFirstRowContains(tableData.sortAscFirstName)
    await tablePage.sortByName()
    await tablePage.expectFirstRowContains(tableData.sortDescFirstName)
  })
})
