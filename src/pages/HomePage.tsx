import { Link } from 'react-router-dom'
import '../styles/shared.css'
import './HomePage.css'

const sections = [
  {
    to: '/login',
    title: 'Đăng nhập',
    desc: 'Form login, validation, redirect sau khi đăng nhập thành công',
    tag: 'getByRole, getByLabel',
  },
  {
    to: '/forms',
    title: 'Form Controls',
    desc: 'Input, textarea, select, checkbox, radio, date picker',
    tag: 'getByLabel, getByPlaceholder',
  },
  {
    to: '/buttons',
    title: 'Buttons',
    desc: 'Click, double-click, disabled state, đếm số lần click',
    tag: 'getByRole(button)',
  },
  {
    to: '/todo',
    title: 'Todo List',
    desc: 'Thêm, xóa, đánh dấu hoàn thành — bài tập CRUD cơ bản',
    tag: 'getByPlaceholder, getByText',
  },
  {
    to: '/table',
    title: 'Bảng dữ liệu',
    desc: 'Tìm kiếm, sắp xếp, phân trang',
    tag: 'getByRole(table), CSS',
  },
  {
    to: '/modal',
    title: 'Modal & Dialog',
    desc: 'Mở/đóng modal, confirm dialog, overlay click',
    tag: 'getByRole(dialog)',
  },
  {
    to: '/alerts',
    title: 'Alerts & Toast',
    desc: 'Thông báo success, warning, error',
    tag: 'getByText, getByRole(alert)',
  },
]

export default function HomePage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Playwright UI Practice Lab</h1>
        <p>
          Ứng dụng React để luyện các chiến lược locator Playwright theo thứ tự ưu tiên:
          role → label → placeholder → text → alt → title → testid → CSS → XPath.
        </p>
        <img
          src="/playwright-logo.svg"
          alt="Logo Playwright"
          className="home-logo"
          width={48}
          height={48}
        />
      </header>

      <div className="home-grid">
        {sections.map((section) => (
          <Link key={section.to} to={section.to} className="home-card">
            <h2>{section.title}</h2>
            <p>{section.desc}</p>
            <span className="home-card-tag">{section.tag}</span>
          </Link>
        ))}
      </div>

      <div className="card home-tip">
        <div className="card-title">Thứ tự ưu tiên locator</div>
        <ol className="locator-priority-list">
          <li><code>getByRole()</code> — tiêu chuẩn vàng</li>
          <li><code>getByLabel()</code> — form có label</li>
          <li><code>getByPlaceholder()</code> — khi không có label</li>
          <li><code>getByText()</code> — theo văn bản hiển thị</li>
          <li><code>getByAltText()</code> — hình ảnh</li>
          <li><code>getByTitle()</code> — tooltip</li>
          <li><code>getByTestId()</code> — khi dev bổ sung data-testid</li>
          <li>CSS Selector — phương án dự phòng</li>
          <li>XPath — phương án cuối cùng</li>
        </ol>
      </div>
    </div>
  )
}
