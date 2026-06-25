import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/shared.css'

const VALID_USER = 'admin'
const VALID_PASS = 'password123'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (username === VALID_USER && password === VALID_PASS) {
        setLoggedIn(true)
        setLoading(false)
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu')
        setLoading(false)
      }
    }, 800)
  }

  if (loggedIn) {
    return (
      <div className="page" data-testid="user-session">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Đăng nhập thành công!</h1>
          <p>
            Xin chào, <strong>{username}</strong> 👋
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setLoggedIn(false)
                setUsername('')
                setPassword('')
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Đăng nhập</h1>
        <p>
          Thử đăng nhập với <code>admin</code> / <code>password123</code>
        </p>
      </header>

      <div className="card" style={{ maxWidth: 420 }}>
        <form onSubmit={handleSubmit} aria-label="Form đăng nhập" noValidate>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`input${error ? ' input-error' : ''}`}
              placeholder="Nhập username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`input${error ? ' input-error' : ''}`}
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="error-msg" role="alert">
              {error}
            </p>
          )}

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="checkbox-label">
              <input type="checkbox" name="remember" />
              Ghi nhớ đăng nhập
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
