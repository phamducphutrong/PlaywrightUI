export const users = {
  valid: {
    username: 'admin',
    password: 'password123',
  },
  invalid: {
    username: 'admin',
    password: 'wrong',
  },
} as const

export const messages = {
  loginError: 'Sai tên đăng nhập hoặc mật khẩu',
  loginSuccess: 'Đăng nhập thành công!',
  confirmDeleted: 'Đã xóa thành công!',
  confirmCancelled: 'Đã hủy xóa',
  asyncComplete: 'Xử lý hoàn tất!',
} as const
