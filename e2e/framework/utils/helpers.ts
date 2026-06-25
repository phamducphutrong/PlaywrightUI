import type { Page } from '@playwright/test'

/** Chờ phản hồi async (vd: login, async button) */
export async function waitForAsync(ms = 800): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

/** Lấy text của phần tử đầu tiên trong bảng */
export async function getFirstTableRowText(page: Page, tableTestId: string): Promise<string> {
  const row = page.getByTestId(tableTestId).locator('tbody tr').first()
  return (await row.textContent()) ?? ''
}
