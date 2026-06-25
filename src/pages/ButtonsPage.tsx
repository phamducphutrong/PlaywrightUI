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
    <div className="page">
      <header className="page-header">
        <h1>Buttons</h1>
        <p>Luyện click, double-click, disabled state và chờ async action</p>
      </header>

      <div className="card" role="region" aria-labelledby="click-counter-title">
        <div className="card-title" id="click-counter-title">Click Counter</div>
        <p>
          Số lần click: <strong>{clickCount}</strong>
        </p>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setClickCount((c) => c + 1)
              setLastAction('Đã click nút Primary')
            }}
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
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card" role="region" aria-labelledby="dblclick-title">
        <div className="card-title" id="dblclick-title">Double Click</div>
        <p>
          Số lần double-click: <strong>{dblClickCount}</strong>
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onDoubleClick={() => {
            setDblClickCount((c) => c + 1)
            setLastAction('Đã double-click!')
          }}
        >
          Double-click tôi
        </button>
      </div>

      <div className="card" role="region" aria-labelledby="disabled-title">
        <div className="card-title" id="disabled-title">Disabled & Loading</div>
        <div className="row">
          <button type="button" className="btn btn-primary" disabled>
            Disabled Button
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={loading}
            onClick={handleAsyncClick}
          >
            {loading ? 'Đang xử lý...' : 'Async Action'}
          </button>
        </div>
      </div>

      <div className="card" role="region" aria-labelledby="link-title">
        <div className="card-title" id="link-title">Link Button</div>
        <a
          href="https://playwright.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          title="Mở tài liệu Playwright trong tab mới"
        >
          Mở Playwright Docs ↗
        </a>
      </div>

      <div className="card" role="region" aria-labelledby="result-title">
        <div className="card-title" id="result-title">Kết quả</div>
        <p aria-live="polite">{lastAction}</p>
      </div>
    </div>
  )
}
