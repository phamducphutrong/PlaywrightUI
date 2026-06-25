import { useState, useCallback } from 'react'
import '../styles/shared.css'
import './AlertsPage.css'

type AlertType = 'success' | 'warning' | 'error' | 'info'

interface Toast {
  id: number
  type: AlertType
  message: string
}

let toastId = 0

const alertConfig: Record<AlertType, { label: string }> = {
  success: { label: 'Success Alert' },
  warning: { label: 'Warning Alert' },
  error: { label: 'Error Alert' },
  info: { label: 'Info Alert' },
}

export default function AlertsPage() {
  const [inlineAlert, setInlineAlert] = useState<AlertType | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: AlertType, message: string) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const messages: Record<AlertType, string> = {
    success: 'Thao tác hoàn tất thành công!',
    warning: 'Cảnh báo: Dung lượng sắp đầy.',
    error: 'Lỗi: Không thể kết nối server.',
    info: 'Thông tin: Phiên bản mới đã có sẵn.',
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Alerts & Toast</h1>
        <p>Luyện assert thông báo, chờ toast xuất hiện và biến mất</p>
      </header>

      <div className="card">
        <div className="card-title">Inline Alerts</div>
        <div className="row">
          {(Object.keys(alertConfig) as AlertType[]).map((type) => (
            <button
              key={type}
              type="button"
              className={`btn btn-sm alert-btn alert-btn-${type}`}
              onClick={() => setInlineAlert(type)}
            >
              {alertConfig[type].label}
            </button>
          ))}
        </div>

        {inlineAlert && (
          <div className={`inline-alert inline-alert-${inlineAlert}`} role="alert">
            <span>{messages[inlineAlert]}</span>
            <button
              type="button"
              className="alert-dismiss"
              onClick={() => setInlineAlert(null)}
              aria-label="Đóng thông báo"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Toast Notifications</div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToast('success', 'Toast: Lưu thành công!')}
          >
            Hiện Toast Success
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addToast('info', 'Toast: Có tin nhắn mới')}
          >
            Hiện Toast Info
          </button>
        </div>
      </div>

      <div className="toast-container" aria-live="polite" aria-label="Thông báo toast">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            role="status"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              className="alert-dismiss"
              onClick={() => removeToast(toast.id)}
              aria-label="Đóng toast"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
