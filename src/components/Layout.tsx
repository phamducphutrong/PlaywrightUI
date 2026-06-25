import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Trang chủ', testId: 'nav-home' },
  { to: '/login', label: 'Đăng nhập', testId: 'nav-login' },
  { to: '/forms', label: 'Form', testId: 'nav-forms' },
  { to: '/buttons', label: 'Buttons', testId: 'nav-buttons' },
  { to: '/todo', label: 'Todo List', testId: 'nav-todo' },
  { to: '/table', label: 'Bảng dữ liệu', testId: 'nav-table' },
  { to: '/modal', label: 'Modal', testId: 'nav-modal' },
  { to: '/alerts', label: 'Alerts', testId: 'nav-alerts' },
]

export default function Layout() {
  return (
    <div className="layout" data-testid="app-layout">
      <aside className="sidebar" data-testid="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">PW</div>
          <div>
            <div className="brand-title">Playwright UI</div>
            <div className="brand-sub">Practice Lab</div>
          </div>
        </div>

        <nav className="sidebar-nav" data-testid="main-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link-active' : ''}`
              }
              data-testid={item.testId}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="version">v1.0 — Playwright Basics</span>
        </div>
      </aside>

      <main className="main-content" data-testid="main-content">
        <Outlet />
      </main>
    </div>
  )
}
