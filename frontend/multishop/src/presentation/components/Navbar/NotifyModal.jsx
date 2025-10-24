import React from 'react'
import '../../styles/NotifyModal.scss'
const notifications = [
  {
    id: 1,
    invoiceNumber: 'INV-001',
    time: 'Hace 2 minutos'
  },
  {
    id: 2,
    invoiceNumber: 'INV-002',
    time: 'Hace 10 minutos'
  }
]

const NotifyModal = ({ onClose }) => {
  const handleCloseModal = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <span className='btn_referenceNotify'>▲</span>
      <div className="notifications-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notifications-header">
          <h3 className="notifications-title">Notificaciones</h3>
          <button className="modal-close" onClick={handleCloseModal}>
            ×
          </button>
        </div>

        <div className="notifications-content">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p className="notification-message">
                La factura <span className="invoice-number">{notification.invoiceNumber}</span> fue rechazada por la DIAN
              </p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotifyModal
