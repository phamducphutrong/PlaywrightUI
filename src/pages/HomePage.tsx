import { Link } from 'react-router-dom'
import '../styles/shared.css'
import './HomePage.css'

const sections = [
  {
    to: '/login',
    title: 'Đăng nhập',
    desc: 'Form login, validation, redirect sau khi đăng nhập thành công',
    testId: 'card-login',
    tag: 'getByRole, fill, click',
  },
  {
    to: '/forms',
    title: 'Form Controls',
    desc: 'Input, textarea, select, checkbox, radio, date picker',
    testId: 'card-forms',
    tag: 'getByLabel, selectOption',
  },
  {
    to: '/buttons',
    title: 'Buttons',
    desc: 'Click, double-click, disabled state, đếm số lần click',
    testId: 'card-buttons',
    tag: 'getByRole(button), click',
  },
  {
    to: '/todo',
    title: 'Todo List',
    desc: 'Thêm, xóa, đánh dấu hoàn thành — bài tập CRUD cơ bản',
    testId: 'card-todo',
    tag: 'locator, filter, expect',
  },
  {
    to: '/table',
    title: 'Bảng dữ liệu',
    desc: 'Tìm kiếm, sắp xếp, phân trang',
    testId: 'card-table',
    tag: 'getByRole(row), sort',
  },
  {
    to: '/modal',
    title: 'Modal & Dialog',
    desc: 'Mở/đóng modal, confirm dialog, overlay click',
    testId: 'card-modal',
    tag: 'getByRole(dialog)',
  },
  {
    to: '/alerts',
    title: 'Alerts & Toast',
    desc: 'Thông báo success, warning, error',
    testId: 'card-alerts',
    tag: 'getByText, waitFor',
  },
]

export default function HomePage() {
  return (
    <div className="page" data-testid="home-page">
      <header className="page-header">
        <h1 data-testid="home-title">Playwright UI Practice Lab</h1>
        <p>
          Ứng dụng React dùng để luyện viết test Playwright. Mỗi trang có các UI
          element cơ bản với <code>data-testid</code> để dễ locate.
        </p>
      </header>

      <div className="home-grid">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="home-card"
            data-testid={section.testId}
          >
            <h2>{section.title}</h2>
            <p>{section.desc}</p>
            <span className="home-card-tag">{section.tag}</span>
          </Link>
        ))}
      </div>

      <div className="card home-tip" data-testid="home-tip">
        <div className="card-title">Gợi ý cho học viên</div>
        <p>
          Dùng <code>page.getByTestId('...')</code> hoặc{' '}
          <code>{`page.getByRole('button', { name: '...' })`}</code> để
          tương tác với các element. Ưu tiên role và label trước, testid khi cần.
        </p>
      </div>
    </div>
  )
}
