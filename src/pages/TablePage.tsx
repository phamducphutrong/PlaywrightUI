import { useState, useMemo } from 'react'
import '../styles/shared.css'
import './TablePage.css'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
}

const allUsers: User[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Phạm Thị D', email: 'd@example.com', role: 'Editor', status: 'pending' },
  { id: 5, name: 'Hoàng Văn E', email: 'e@example.com', role: 'Viewer', status: 'active' },
  { id: 6, name: 'Vũ Thị F', email: 'f@example.com', role: 'Admin', status: 'inactive' },
  { id: 7, name: 'Đặng Văn G', email: 'g@example.com', role: 'Editor', status: 'active' },
  { id: 8, name: 'Bùi Thị H', email: 'h@example.com', role: 'Viewer', status: 'pending' },
  { id: 9, name: 'Dương Văn I', email: 'i@example.com', role: 'Admin', status: 'active' },
  { id: 10, name: 'Mai Thị K', email: 'k@example.com', role: 'Editor', status: 'inactive' },
  { id: 11, name: 'Lý Văn L', email: 'l@example.com', role: 'Viewer', status: 'active' },
  { id: 12, name: 'Hồ Thị M', email: 'm@example.com', role: 'Admin', status: 'pending' },
]

const PAGE_SIZE = 5

type SortKey = 'name' | 'email' | 'role'
type SortDir = 'asc' | 'desc'

const statusBadge: Record<User['status'], string> = {
  active: 'badge-success',
  inactive: 'badge-danger',
  pending: 'badge-warning',
}

const statusLabel: Record<User['status'], string> = {
  active: 'Hoạt động',
  inactive: 'Ngừng',
  pending: 'Chờ duyệt',
}

export default function TablePage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allUsers
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const av = a[sortKey].toLowerCase()
        const bv = b[sortKey].toLowerCase()
        const cmp = av.localeCompare(bv, 'vi')
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="page" data-testid="table-page">
      <header className="page-header">
        <h1>Bảng dữ liệu</h1>
        <p>Tìm kiếm, sắp xếp cột và phân trang</p>
      </header>

      <div className="card">
        <div className="table-toolbar">
          <input
            type="search"
            className="input table-search"
            placeholder="Tìm theo tên, email, role..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            data-testid="table-search"
          />
          <span className="table-count" data-testid="table-count">
            {filtered.length} kết quả
          </span>
        </div>

        <div className="table-wrapper">
          <table className="data-table" data-testid="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort('name')}
                    data-testid="sort-name"
                  >
                    Tên{sortIndicator('name')}
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort('email')}
                    data-testid="sort-email"
                  >
                    Email{sortIndicator('email')}
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort('role')}
                    data-testid="sort-role"
                  >
                    Role{sortIndicator('role')}
                  </button>
                </th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr data-testid="table-empty">
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              ) : (
                paged.map((user) => (
                  <tr key={user.id} data-testid={`table-row-${user.id}`}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className={`badge ${statusBadge[user.status]}`}
                        data-testid={`status-${user.id}`}
                      >
                        {statusLabel[user.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination" data-testid="pagination">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            data-testid="prev-page"
          >
            ← Trước
          </button>
          <span data-testid="page-info">
            Trang {page} / {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            data-testid="next-page"
          >
            Sau →
          </button>
        </div>
      </div>
    </div>
  )
}
