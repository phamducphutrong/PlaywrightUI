import { test, expect } from '@playwright/test'

test.describe('Form Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forms')
  })

  test('điền và submit form — getByLabel + getByRole', async ({ page }) => {
    // ② getByLabel
    await page.getByLabel('Họ và tên').fill('Nguyễn Văn Test')
    await page.getByLabel('Email').fill('test@example.com')

    // ③ getByPlaceholder — textarea không cần label riêng nếu đã có, nhưng có placeholder
    await page.getByPlaceholder('Viết vài dòng về bản thân...').fill('Tôi đang học Playwright')

    await page.getByLabel('Quốc gia').selectOption('vn')

    // ① getByRole — checkbox & radio
    await page.getByRole('checkbox', { name: 'JavaScript' }).check()
    await page.getByRole('checkbox', { name: 'Playwright' }).check()
    await page.getByRole('radio', { name: 'Nam' }).check()
    await page.getByRole('radio', { name: 'Pro' }).check()

    await page.getByRole('button', { name: 'Gửi form' }).click()

    // ① getByRole status
    await expect(page.getByRole('status')).toBeVisible()
    await expect(page.getByRole('status')).toContainText('Nguyễn Văn Test')
  })

  test('chọn quốc gia — getByLabel', async ({ page }) => {
    await page.getByLabel('Quốc gia').selectOption('jp')
    await expect(page.getByLabel('Quốc gia')).toHaveValue('jp')
  })
})
