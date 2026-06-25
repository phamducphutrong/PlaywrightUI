import { useState } from 'react'
import '../styles/shared.css'

export default function ButtonsPage() {
  const [clickCount, setClickCount] = useState(0)
  const [dblClickCount, setDblClickCount] = useState(0)
  const [lastAction, setLastAction] = useState('Chưa có hành động')
  const [loading, setLoading] = useState(false)

  const handleAsyncClick = () => {
    setLoading(true)
    setLastAction('Đang xử lý...')
    setTimeout(() => {
      setLoading(false)
      setLastAction('Xử lý hoàn tất!')
    }, 1500)
  }

  return (
    <div className="page" data-testid="buttons-page">
      <header className="page-header">
        <h1>Buttons</h1>
        <p>Luyện click, double-click, disabled state và chờ async action</p>
      </header>

      <div className="card">
        <div className="card-title">Click Counter</div>
        <p>
          Số lần click: <strong data-testid="click-count">{clickCount}</strong>
        </p>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setClickCount((c) => c + 1)
              setLastAction('Đã click nút Primary')
            }}
            data-testid="btn-primary"
          >
            Primary Button
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setClickCount((c) => c + 1)
              setLastAction('Đã click nút Secondary')
            }}
            data-testid="btn-secondary"
          >
            Secondary
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setClickCount(0)
              setLastAction('Đã reset counter')
            }}
            data-testid="btn-reset"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Double Click</div>
        <p>
          Số lần double-click:{' '}
          <strong data-testid="dblclick-count">{dblClickCount}</strong>
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onDoubleClick={() => {
            setDblClickCount((c) => c + 1)
            setLastAction('Đã double-click!')
          }}
          data-testid="btn-dblclick"
        >
          Double-click tôi
        </button>
      </div>

      <div className="card">
        <div className="card-title">Disabled & Loading</div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            disabled
            data-testid="btn-disabled"
          >
            Disabled Button
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={loading}
            onClick={handleAsyncClick}
            data-testid="btn-async"
          >
            {loading ? 'Đang xử lý...' : 'Async Action'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Link Button</div>
        <a
          href="https://playwright.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          data-testid="btn-external-link"
        >
          Mở Playwright Docs ↗
        </a>
      </div>

      <div className="card" data-testid="last-action-card">
        <div className="card-title">Kết quả</div>
        <p data-testid="last-action">{lastAction}</p>
      </div>
    </div>
  )
}
