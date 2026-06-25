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

const alertConfig: Record<AlertType, { label: string; testId: string }> = {
  success: { label: 'Success Alert', testId: 'show-success' },
  warning: { label: 'Warning Alert', testId: 'show-warning' },
  error: { label: 'Error Alert', testId: 'show-error' },
  info: { label: 'Info Alert', testId: 'show-info' },
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
    <div className="page" data-testid="alerts-page">
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
              data-testid={alertConfig[type].testId}
            >
              {alertConfig[type].label}
            </button>
          ))}
        </div>

        {inlineAlert && (
          <div
            className={`inline-alert inline-alert-${inlineAlert}`}
            role="alert"
            data-testid={`inline-alert-${inlineAlert}`}
          >
            <span>{messages[inlineAlert]}</span>
            <button
              type="button"
              className="alert-dismiss"
              onClick={() => setInlineAlert(null)}
              data-testid="dismiss-inline-alert"
              aria-label="Đóng"
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
            data-testid="show-toast-success"
          >
            Hiện Toast Success
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addToast('info', 'Toast: Có tin nhắn mới')}
            data-testid="show-toast-info"
          >
            Hiện Toast Info
          </button>
        </div>
      </div>

      <div className="toast-container" data-testid="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            role="status"
            data-testid={`toast-${toast.id}`}
          >
            <span data-testid={`toast-message-${toast.id}`}>{toast.message}</span>
            <button
              type="button"
              className="alert-dismiss"
              onClick={() => removeToast(toast.id)}
              data-testid={`toast-close-${toast.id}`}
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
