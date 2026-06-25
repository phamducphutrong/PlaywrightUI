import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/login', label: 'Đăng nhập' },
  { to: '/forms', label: 'Form' },
  { to: '/buttons', label: 'Buttons' },
  { to: '/todo', label: 'Todo List' },
  { to: '/table', label: 'Bảng dữ liệu' },
  { to: '/modal', label: 'Modal' },
  { to: '/alerts', label: 'Alerts' },
]

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar" role="complementary" aria-label="Thanh điều hướng">
        <div className="sidebar-brand">
          <div className="brand-icon" title="Playwright UI Practice Lab">
            PW
          </div>
          <div>
            <div className="brand-title">Playwright UI</div>
            <div className="brand-sub">Practice Lab</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Menu chính">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="version">v1.0 — Playwright Basics</span>
        </div>
      </aside>

      <main className="main-content" role="main">
        <Outlet />
      </main>
    </div>
  )
}
