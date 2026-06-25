import { useState } from 'react'
import '../styles/shared.css'
import './ModalPage.css'

export default function ModalPage() {
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmResult, setConfirmResult] = useState('')

  return (
    <div className="page">
      <header className="page-header">
        <h1>Modal & Dialog</h1>
        <p>Luyện tương tác với popup, overlay và confirm dialog</p>
      </header>

      <div className="card">
        <div className="card-title">Các loại dialog</div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Mở Modal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowConfirm(true)}
          >
            Mở Confirm Dialog
          </button>
        </div>

        {confirmResult && (
          <p className="success-msg" role="status" style={{ marginTop: '1rem' }}>
            {confirmResult}
          </p>
        )}
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">Thông tin chi tiết</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Đóng modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                Đây là nội dung modal. Bạn có thể đóng bằng nút X, nút Hủy, hoặc
                click vào overlay phía sau.
              </p>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="modal-input">Ghi chú</label>
                <input
                  id="modal-input"
                  type="text"
                  className="input"
                  placeholder="Nhập ghi chú..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal-overlay">
          <div
            className="modal-content modal-sm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <div className="modal-header">
              <h2 id="confirm-title">Xác nhận xóa</h2>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa mục này? Hành động không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setShowConfirm(false)
                  setConfirmResult('Đã hủy xóa')
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setShowConfirm(false)
                  setConfirmResult('Đã xóa thành công!')
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
